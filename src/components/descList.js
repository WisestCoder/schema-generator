import React from 'react';

const getEnumLabel = (value, enums) => {
  if (Array.isArray(enums)) {
    if (typeof value === 'string' || typeof value === 'number') {
      const findIndex = enums.findIndex(x => x.value === value);
      if (findIndex > -1) {
        return enums[findIndex].label;
      }
      return value;
    } else if (Array.isArray(value)) {
      const result = value.map(v => getEnumLabel(value, enums));
      return String(result);
    }
    return value;
  }
  return value;
};

const DescriptionList = ({ schema = {}, value = [], index }) => {
  const list = getDescription({ schema, value, index })
    .filter(item => item.title)
    .slice(0, 3);
  return (
    <ul className="flex overflow-hidden" style={{ paddingRight: 45 }}>
      {list.map((item, i) => {
        return item.title ? (
          <li className="flex-auto mr2 overflow-hidden" key={i}>
            <span className="fw5">{item.title}: </span>
            <span>{item.text}</span>
          </li>
        ) : null;
      })}
    </ul>
  );
};

export default DescriptionList;

// 获得title，value值list
export const getDescription = ({ schema = {}, value = [], index }) => {
  const { items = {} } = schema;
  // 只有当items为object时才做收起（fold）处理
  if (items.type !== 'object') {
    return [];
  }
  let titles = (items && items.properties) || {};
  titles = Object.values(titles);
  let description = (value && value.length && value[index]) || {};
  const valueList = Object.values(description);
  const descList = titles.map((t, idx) => {
    let hidden = t && t['ui:hidden'];
    // ui:hidden为判断式时解析 TODO: 解析在外部集中做
    if (hidden) return;
    const title = t.title;
    let text = valueList[idx];
    if (text === null && text === undefined) {
      text = '';
    } else if (typeof text === 'boolean') {
      text = text ? '是' : '否';
    } else if (typeof text !== 'string' && typeof text !== 'number' && text) {
      text = '{复杂结构}';
    } else if (t.enum) {
      text = getEnumLabel(text, t.enum);
    }
    return {
      title,
      text,
    };
  });
  // 去空
  return descList.filter(d => !!d);
};
