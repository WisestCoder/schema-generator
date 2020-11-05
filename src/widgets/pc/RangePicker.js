import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

const { RangePicker } = DatePicker;

export default (p) => {
  const style = p.invalid ? { borderColor: '#f5222d' } : {};

  const handleChange = (value) => {
    p.onChange(value);
  };

  let value = undefined;
  if (p.value && p.value.length) {
    const [start, end] = p.value;
    value = [moment(start), moment(end)];
  }

  const props = {
    style,
    ...p.options,
    value,
    onChange: handleChange
  };
  const { showTime, picker } = p.options;
  if (showTime) {
    props.showTime = { format: showTime }
  }
  if (picker === 'date' && showTime) {
    props.format = `YYYY-MM-DD ${showTime}`;
  }

  return (
    <RangePicker
      {...props}
      getPopupContainer={(triggerNode) => {
        return triggerNode;
      }}
    />
  );
};
