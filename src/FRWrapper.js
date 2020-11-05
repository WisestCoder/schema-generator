import React, {
  useRef,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import cn from 'classnames';
import { useSet } from './hooks';
import Frame from 'react-frame-component'
import { iframeSrcDoc } from './utils/iframe';

import IconFont from './components/IconFont';
import Left from './Left';
import Right from './Right';
import {
  flattenSchema,
  idToSchema,
  dataToFlatten,
  flattenToData,
} from './utils/schema';
import { getSaveNumber, looseJsonParse } from './utils/common';
import { Ctx, PropsCtx, InnerCtx } from './context';
import FR from './FR';
import FrameBindingContext from './FR/FrameBindingContext';
import { Modal, Input, message, Tooltip } from 'antd';
import { Button } from 'antd';

// import 'tachyons';
import './FRWrapper.css';

const { TextArea } = Input;

function Wrapper(
  {
    simple = true,
    schema,
    formData,
    onChange,
    onSchemaChange,
    className = '',
    title = <h3>表单设计器</h3>,
    actions = [],
    onSave = () => {},
    ...globalProps
  },
  ref,
) {
  const {
    preview,
    isPc,
    setState,
    mapping,
    selected,
    hovering,
    ...rest
  } = globalProps;
  const flatten = useMemo(() => flattenSchema(schema || {}), [schema]);
  const flattenWithData = useMemo(() => dataToFlatten(flatten, formData), [flatten, formData]);

  const onFlattenChange = useCallback(newFlatten => {
    const newSchema = idToSchema(newFlatten);
    const newData = flattenToData(newFlatten);
    // 判断只有schema变化时才调用，一般需求的用户不需要
    if (onSchemaChange) {
      onSchemaChange(newSchema);
    }
    onChange(newData);
  }, [onSchemaChange, onChange]);

  const onItemChange = useCallback((key, value) => {
    flattenWithData[key] = value;
    onFlattenChange(flattenWithData);
  }, [onFlattenChange, flattenWithData]);

  const onEmpty = () => {
    setState({
      schema: {
        type: 'object',
        properties: {},
      },
      formData: {},
      selected: undefined,
    });
  };

  useImperativeHandle(ref, () => ({
    getValue: () => {
      return idToSchema(flattenWithData, '#', true);
    },
    getSelectedItem: () => {
      return flatten[selected];
    }
  }));

  // TODO: flatten是频繁在变的，应该和其他两个函数分开
  const store = {
    flatten: flattenWithData,
    onFlattenChange,
    onItemChange,
    ...globalProps,
  };

  if (simple) {
    return (
      <Ctx.Provider value={setState}>
        <PropsCtx.Provider value={globalProps}>
          <InnerCtx.Provider value={store}>
            <FR preview={true} isPc={isPc} />
          </InnerCtx.Provider>
        </PropsCtx.Provider>
      </Ctx.Provider>
    );
  }

  const renderIframe = () => {
    return (
      <div className={cn('iframe-container', { mobile: !isPc })}>
        <Frame
          id="dnd-iframe"
          srcDoc={iframeSrcDoc}
          onLoad={() => {
            const iframe = document.querySelector('#dnd-iframe');
            const head = document.head.cloneNode(true);
            const contentDocument = iframe.contentDocument;
            contentDocument.head.remove();
            contentDocument.documentElement.insertBefore(head, contentDocument.body);
            // TODO 需要处理样式延迟加载问题
            // iframe.style.display = 'block';
          }}
        >
          <FrameBindingContext>
            <Ctx.Provider value={setState}>
              <PropsCtx.Provider value={globalProps}>
                <InnerCtx.Provider value={store}>
                  <FR preview={preview} isPc={isPc} />
                </InnerCtx.Provider>
              </PropsCtx.Provider>
            </Ctx.Provider>
          </FrameBindingContext>
        </Frame>
        <Tooltip placement="top" title={`切换至${isPc ? 'H5' : 'PC'}模式`}>
          <IconFont
            type={ isPc ? 'icon-diannao1' : 'icon-shouji1'}
            className="pointer v-mid pc"
            onClick={() => {
              setState({ isPc: !isPc });
            }}
          />
        </Tooltip>
      </div>
    );
  }

  const renderTitle = () => {
    return (
      <div className="fr-container-header-title">{title}</div>
    );
  }

  const renderButtonGroup = () => {
    return (
      <div className="fr-container-header-action">
        {
          actions.map((item, index) => {
            const { onClick = () => {}, label, ...otherProps } = item;
            return (
              <Button
                key={index}
                {...otherProps}
                type="link"
                onClick={item.onClick}
              >
                {label}
              </Button>
            );
          })
        }
        <Button
          key="preview"
          type="link"
          onClick={() => {
            setState({ preview: !preview, selected: '#' });
          }}
        >
          {preview ? '开始编辑' : '开始预览'}
        </Button>
        <Button
          key="empty"
          type="link"
          onClick={onEmpty}
        >
          清空
        </Button>
        <Button
          key="save"
          type="link"
          onClick={() => {
            onSave(idToSchema(flattenWithData, '#', true));
          }}
        >
          保存
        </Button>
      </div>
    );
  }

  return (
    <Ctx.Provider value={setState}>
      <PropsCtx.Provider value={globalProps}>
        <InnerCtx.Provider value={store}>
          <div className={cn('fr-container', { [className]: !!className })}>
            <div className="fr-container-header pv2 ph3">
              {renderTitle()}
              {renderButtonGroup()}
            </div>
            <div className="fr-container-content">
              <Left isPc={isPc} />
              <div className={cn('mid-layout', { preview })}>
                {renderIframe()}
              </div>
              <Right globalProps={rest} />
            </div>
          </div>
        </InnerCtx.Provider>
      </PropsCtx.Provider>
    </Ctx.Provider>
  );
}

const FRWrapper = forwardRef(Wrapper);

FRWrapper.defaultProps = {
};

export default FRWrapper;
