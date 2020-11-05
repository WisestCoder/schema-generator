# 可视化 schema 编辑器

### 效果图
![效果图](https://raw.githubusercontent.com/wisestcoder/assert/master/schema.gif)

### 在线地址
[查看demo](https://wisestcoder.github.io/schema-generator/_demos/playground)

### 安装

```bash
npm i @coolvision/schema-generator
```

### 使用

```js
import React from 'react';
import Generator from '@coolvision/schema-generator';

const defaultValue = {
  type: 'object',
  properties: {
    inputName: {
      title: '简单输入框',
      type: 'string',
    },
  },
};

const templates = [
  {
    text: '模板1',
    name: 'something',
    schema: {
      title: '对象',
      description: '这是一个对象类型',
      type: 'object',
      properties: {
        inputName: {
          title: '简单输入框',
          type: 'string',
        },
        selectName: {
          title: '单选',
          type: 'string',
          enum: [
            {
              label: '早',
              value: 'a',
            },
            {
              label: '中',
              value: 'b',
            },
            {
              label: '晚',
              value: 'c',
            },
          ],
        },
        dateName: {
          title: '时间选择',
          type: 'string',
          format: 'date',
        },
      },
    },
  },
];

const Demo = () => {
  const submit = schema => {
    alert(JSON.stringify(schema));
  };

  return (
    <Generator
      defaultValue={defaultValue}
      templates={templates}
      submit={submit}
    />
  );
};

export default Demo;
```
