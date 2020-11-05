import React, {
  useCallback,
  useMemo
} from 'react';
import { widgets } from '../widgets';
import { useGlobalProps, useStore } from '../hooks';
import { getParentProps } from '../utils/schema';
import { isLooselyNumber, isCssLength } from '../utils/common';
import { getWidgetName } from '../mapping';
import 'antd-mobile/dist/antd-mobile.css';

const RenderField = ({
  $id,
  item,
  labelClass,
  contentClass,
  isComplex,
  children,
}) => {
  const { onItemChange } = useStore();
  const { schema, data } = item;
  const {
    displayType,
    showDescIcon,
    showValidate,
    Widgets,
    isPc,
    mapping,
    disabled,
    readOnly
  } = useGlobalProps();
  const { type, title, description, required } = schema;
  const _widgets = useMemo(() => {
    const widgetType = isPc ? 'pc' : 'mobile';

    return {
      ...widgets[widgetType],
      ...Widgets
    };
  }, [isPc]);

  let labelStyle = { width: 120 };
  if (isComplex || displayType === 'column') {
    labelStyle = { flexGrow: 1 };
  }

  const onChange = useCallback(value => {
    onItemChange($id, {
      ...item,
      data: value
    });
  }, [item, onItemChange]);

  const Widget = useMemo(() => {
    // TODO 是否要强制加上x-component
    let widgetName = getWidgetName(schema, mapping);
    // 如果不存在，比如有外部的自定义组件名称，使用默认展示组件
    if (!(widgetName && _widgets[widgetName])) {
      widgetName = getWidgetName(schema, mapping, false);
    }

    return  _widgets[widgetName];
  }, [schema['x-component'], _widgets]);

  // TODO: useMemo
  const usefulWidgetProps = {
    disabled: schema['disabled'] || disabled,
    readOnly: schema['readOnly'] || readOnly,
    visible: schema['visible'],
    options: schema['x-component-props'],
  };

  if (!Widget) {
    return children;
  }

  if (!isPc) {
    return (
      <Widget
        value={data}
        onChange={onChange}
        schema={schema}
        {...usefulWidgetProps}
        children={children}
      />
    );
  }

  return (
    <>
      {schema.title ? (
        <div className={labelClass} style={labelStyle}>
          <label
            className={`fr-label-title ${
              displayType === 'column' ? 'no-colon' : ''
            }`} // boolean不带冒号
            title={title}
          >
            {required && <span className="fr-label-required"> *</span>}
            <span
              className={`${isComplex ? 'b' : ''} ${
                displayType === 'column' ? 'flex-none' : ''
              }`}
            >
              {title}
            </span>
            {description &&
              (showDescIcon ? (
                <span className="fr-tooltip-toggle" aria-label={description}>
                  <i className="fr-tooltip-icon" />
                  <div className="fr-tooltip-container">
                    <i className="fr-tooltip-triangle" />
                    {description}
                  </div>
                </span>
              ) : (
                <span className="fr-desc ml2">(&nbsp;{description}&nbsp;)</span>
              ))}
            {/* {displayType !== 'row' && showValidate && (
              <span className="fr-validate">validation</span>
            )} */}
          </label>
        </div>
      ) : null}
      <div className={contentClass}>
        <Widget
          value={data}
          onChange={onChange}
          schema={schema}
          {...usefulWidgetProps}
          children={children}
        />
      </div>
    </>
  );
};

export default RenderField;
