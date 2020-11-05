/**
 * select列表配置组件
 */
import { Button, Input, List } from 'antd';
let idNumber = 0;

const EnumList = ({ value = [], onChange, disabled, style }) => {
  const onDelete = item => {
    const newValue = value.filter(x => x.value !== item.value);
    onChange(newValue);
  };

  const onInputChange = (inputValue, item, type) => {
    const findIndex = value.findIndex(x => x.value === item.value);
    value.splice(findIndex, 1, {
      ...item,
      [type]: inputValue,
    });
    onChange(value);
  };

  const onAdd = () => {
    idNumber += 1;
    const newValue = [...value, { label: `新增${idNumber}`, value: idNumber }];
    onChange(newValue);
  };

  return (
    <List
      itemLayout="horizontal"
      bordered
      dataSource={value || []}
      footer={<div style={{ textAlign: 'center' }}><Button type="link" onClick={onAdd}>新增</Button></div>}
      renderItem={(item) => (
        <List.Item
          actions={[<a style={{ marginLeft: '-20px' }} onClick={() => { onDelete(item); }}>删除</a>]}
        >
          <div>
            <div>
              <span>名称: </span>
              <Input
                allowClear
                style={{ ...style, width: '180px', marginLeft: '10px' }}
                value={item.label}
                disabled={disabled}
                onChange={e => {
                  onInputChange(e.target.value, item, 'label');
                }}
              />
            </div>
            <div style={{ marginTop: '6px' }}>
              <span>字段: </span>
              <Input
                allowClear
                style={{ ...style, width: '180px', marginLeft: '10px' }}
                value={item.value}
                disabled={disabled}
                onChange={e => {
                  onInputChange(e.target.value, item, 'value');
                }}
              />
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};

export default EnumList;
