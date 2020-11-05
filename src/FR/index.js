import React from 'react';
import { useGlobalProps, useStore } from '../hooks';
import RenderChildren from './RenderChildren';
import RenderField from './RenderField';
import Wrapper from './Wrapper';

const FR = ({ id = '#', preview = false, isPc = true }) => {
  const { flatten } = useStore();
  const { displayType, column } = useGlobalProps();
  const item = flatten[id];
  if (!item) return null;

  const { schema } = item;
  const isObj = schema.type === 'object';
  const isList = schema.type === 'array' && schema.enum === undefined;
  const isComplex = isObj || isList;
  let containerClass = `fr-field w-100 ${isComplex ? 'fr-field-complex' : ''}`;
  let labelClass = 'fr-label mb2';
  let contentClass = 'fr-content';

  let columnStyle = { paddingRight: '12px' };

  if (!isComplex && column > 1) {
    columnStyle = {
      width: `calc(100% /${column})`,
      paddingRight: '12px',
    };
  }

  switch (schema.type) {
    case 'object':
      // if (schema.title) {
      //   containerClass += ' ba b--black-20 pt4 pr3 pb2 relative mt3 mb4'; // object的margin bottom由内部元素撑起
      //   labelClass += ' fr-label-object bg-white absolute ph2 top-upper left-1'; // fr-label-object 无默认style，只是占位用于使用者样式覆盖
      // }
      // containerClass += ' fr-field-object'; // object的margin bottom由内部元素撑起
      // if (schema.title) {
      //   contentClass += ' ml3'; // 缩进
      // }
      if (schema.title && !schema.enum) {
        labelClass += ' mt2 mb3';
      }
      break;
    case 'array':
      if (schema.title && !schema.enum) {
        labelClass += ' mt2 mb3';
      }
      break;
    default:
      if (displayType === 'row') {
        labelClass = labelClass.replace('mb2', 'mb0');
      }
  }
  // 横排时
  if (displayType === 'row' && !isComplex) {
    containerClass += ' flex items-center';
    labelClass += ' flex-shrink-0 fr-label-row';
    labelClass = labelClass.replace('mb2', 'mb0');
    contentClass += ' flex-grow-1 relative';
  }

  // 横排的checkbox
  // if (displayType === 'row') {
  //   contentClass += ' flex justify-end pr2';
  // }

  const fieldProps = {
    $id: id,
    item,
    labelClass,
    contentClass,
    isComplex,
  };
  const childrenProps = {
    children: item.children,
    preview,
  };

  const childrenElement =
    item.children && item.children.length > 0 ? (
      <ul className={`flex flex-wrap pl0`}>
        <RenderChildren {...childrenProps} />
      </ul>
    ) : null;

  // TODO: list 也要算进去
  if (preview) {
    return (
      <div style={columnStyle} className={containerClass}>
        <RenderField {...fieldProps}>
          {(isObj || isList) && childrenElement}
        </RenderField>
      </div>
    );
  }

  const isEmpty = Object.keys(flatten).length < 2; // 只有一个根元素 # 的情况
  if (isEmpty) {
    return (
      <Wrapper style={columnStyle} $id={id} item={item}>
        <div
          className={`${containerClass} h-100 f5 black-40 flex items-center justify-center`}
        >
          点击/拖拽左侧栏的组件进行添加
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={columnStyle} $id={id} item={item}>
      <div className={containerClass}>
        <RenderField {...fieldProps}>
          {(isObj || isList) && (
            <Wrapper $id={id} item={item} inside>
              {childrenElement || <div className="h2" />}
            </Wrapper>
          )}
        </RenderField>
      </div>
    </Wrapper>
  );
};

export default FR;
