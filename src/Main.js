import React, { useEffect, forwardRef } from 'react';
import { useSet } from './hooks';
import FRWrapper from './FRWrapper';
import { mapping } from './mapping';
import { isDeepEqual } from './utils/common';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
import 'tachyons';
import './Main.css';

const SCHEMA = {
  type: 'object',
  properties: {},
};

// TODO: formData 不存在的时候会报错：can't find # of undefined

function App({
  defaultValue,
  value,
  onChange = () => {},
  customElements,
  advancedElements,
  className,
  Widgets,
  title,
  actions,
  onSave,
  beforeDragComplete = () => true
}, ref) {
  const initGlobal = {
    displayType: 'row',
  };

  const [state, setState] = useSet({
    formData: {},
    schema: SCHEMA,
    selected: undefined, // 被选中的$id, 如果object/array的内部，以首字母0标识
    hovering: undefined, // 目前没有用到
    preview: false, // preview = false 是编辑模式
    isPc: true,
    ...initGlobal, // form-render 的全局props等
  });

  const { schema, formData, preview, selected, hovering, isPc, ...rest } = state;

  const { displayType } = rest;
  const showDescIcon = displayType === 'row' ? true : false;

  const onDataChange = data => {
    setState({ formData: data });
  };

  const onSchemaChange = newSchema => {
    setState({ schema: newSchema });

    onChange(newSchema);
  };

  useEffect(() => {
    if (typeof value === 'undefined') {
      setState({
        schema: defaultValue || SCHEMA
      });
    }
  }, []);

  useEffect(() => {
    if (typeof value !== 'undefined' && !isDeepEqual(schema, value)) {
      setState({
        schema: value
      });
    }
  }, [value]);

  const _mapping = { ...mapping };

  const globalProps = {
    preview,
    isPc,
    setState,
    simple: false,
    mapping: _mapping,
    beforeDragComplete,
    Widgets, // 外部引入组件
    advancedElements: advancedElements || [], // 高级组件
    customElements: customElements || [], // 自定义组件
    selected,
    hovering,
    ...rest,
    showDescIcon,
  };

  const FRProps = {
    schema,
    formData,
    onChange: onDataChange,
    onSchemaChange,
    className,
    title,
    actions,
    onSave,
    ...globalProps,
  };

  return <FRWrapper ref={ref} {...FRProps} />;
}

export default forwardRef(App);
