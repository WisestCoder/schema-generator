import React from 'react';
import { Switch } from 'antd';

export default function SGSwitch(p) {
  return (
    <Switch
      disabled={p.disabled}
      readOnly={p.readOnly}
      {...p.options}
      onChange={checked => p.onChange(checked)}
      checked={p.value}
    />
  );
}
