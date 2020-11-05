import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

export default (p) => {
  const style = p.invalid ? { borderColor: '#f5222d' } : {};

  const handleChange = (date) => {
    p.onChange(+moment(date));
  };

  const props = {
    style,
    value: p.value ? moment(p.value) : undefined,
    ...p.options,
    onChange: handleChange
  };

  return (
    <TimePicker
      {...props}
      getPopupContainer={(triggerNode) => {
        return triggerNode;
      }}
    />
  );
};
