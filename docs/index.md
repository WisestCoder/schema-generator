---
hero:
  title: Schema Generator
  desc: 表单设计器
  actions:
    - text: 在线Demo
      link: /_demos/playground
    - text: 开始使用
      link: /demo
---

### 安装

```bash
npm i fr-generator
```

### 使用

```js
import React from 'react';
import Generator from 'fr-generator';

const defaultValue = {
  type: 'object',
  properties: {
    inputName: {
      type: 'string',
      name: 'cc',
      'x-component': 'input',
      'x-component-props': { min: 1 },
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
              label: 'a',
              value: '早',
            },
            {
              label: 'b',
              value: '中',
            },
            {
              label: 'c',
              value: '晚',
            },
          ],
        },
      },
    },
  },
];

const Demo = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Generator defaultValue={defaultValue} templates={templates} />
    </div>
  );
};

export default Demo;
```

<code src='./Playground.jsx' className='hide-demo' />
