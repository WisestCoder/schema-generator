---
title: 配置
nav:
  order: 1
  title: 配置
toc: menu
---

## Props

### defaultValue

type: `object`

默认一进入编辑器展示的表单对应的 schema。格式参考 schema 生成器的输出 schema

### templates

type: `array`

常用的 schema 模板，模板方便用户点击使用。格式参照上面代码：text 按钮文案，name 对应的字段

### transformer

type: `object`

默认值为

```js
{
  from: schema => schema,
  to: schema => schema
}
```

`from` 写从你需要的 schema 到 form-render 的 schema 的转换函数  
`to` 写反向的转换函数

## 方法

### getValue

type: `function`

可以从 ref 中取到 getValue 方法，获取导出的 schema 值，详见“开始使用”中的现实样例

## 注意

使用此组件时，外层要包裹的 div **一定要给一个高度**，否则会默认 min-height: 30vh
