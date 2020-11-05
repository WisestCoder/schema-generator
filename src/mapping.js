export const mapping = {
  string: 'Input',
  array: 'list',
  boolean: 'Switch',
  number: 'Number',
  object: 'map',
  'string:upload': 'upload',
  'string:date': 'DatePicker',
  'string:time': 'TimePicker',
  'string:textarea': 'TextArea',
  'range:date': 'dateRange',
  'range:dateTime': 'dateRange',
  '*?enum': 'Select',
  'array?enum': 'checkboxes',
  '*?readOnly': 'text',
};

export function getWidgetName(schema, _mapping = mapping, force = true) {
  const { type, format, enum: enums, readOnly } = schema;

  if (force && schema['x-component']) {
    return schema['x-component'];
  }

  const list = [];
  if (readOnly) {
    list.push(`${type}?readOnly`);
    list.push('*?readOnly');
  }
  if (enums) {
    list.push(`${type}?enum`);
    // array 默认使用list，array?enum 默认使用checkboxes，*?enum 默认使用select
    list.push('*?enum');
  }
  if (format) {
    list.push(`${type}:${format}`);
  }
  list.push(type); // 放在最后兜底，其他都不match时使用type默认的组件
  let found = '';
  list.some(item => {
    found = _mapping[item];
    return !!found;
  });
  return found;
}
