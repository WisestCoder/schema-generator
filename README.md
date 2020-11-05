# 可视化 schema 编辑器

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

代码展示效果见 Demo。
目前支持 3 个 props：`defaultValue`，`templates` 和 `submit`

- **defaultValue:** 默认一进入编辑器展示的表单对应的 schema。格式参考 schema 生成器的输出 schema
- **templates:** 常用的 schema 模板，模板方便用户点击使用。格式参照上面代码：text 按钮文案，name 对应的字段
- **submit:** 提交按钮的 callback，入参是导出的 schema
