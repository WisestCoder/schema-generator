import { InputNumber } from 'antd';

export default (p) => {
  const style = p.invalid ? { borderColor: '#f5222d' } : {};
  const { max, min, step } = p.schema;
  let obj = {};
  if (max || max === 0) {
    obj = { max };
  }

  if (min || min === 0) {
    obj = { ...obj, min };
  }

  if (step) {
    obj = { ...obj, step };
  }

  return (
    <InputNumber
      {...obj}
      style={{ width: '100%', ...style }}
      disabled={p.disabled}
      readOnly={p.readOnly}
      {...p.options}
      value={p.value}
      onChange={p.onChange}
    />
  );
};
