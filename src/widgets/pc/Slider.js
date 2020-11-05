import React from 'react';
import { InputNumber, Slider } from 'antd';

export default (p) => {
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
  const showInput = p.options && p.options.showInput;

  const renderNumber = showInput ? (
    <InputNumber
    {...p.options}
    style={{ width: '90px', ...style }}
    value={p.value}
    disabled={p.disabled}
    onChange={p.onChange}
  />
  ) : (
    <span style={{ width: '90px' }}>
      {p.value === (undefined || '') ? '-' : p.value}
    </span>
  );

  return (
    <div className='fr-slider'>
      <Slider
        style={{ flexGrow: 1, marginRight: showInput ? 12 : 0 }}
        {...p.options}
        onChange={p.onChange}
        value={p.value}
        disabled={p.disabled}
        readOnly={p.readOnly}
      />
      {showInput ? renderNumber : null}
    </div>
  );
};
