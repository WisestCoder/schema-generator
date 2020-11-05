// 只需写配置，方便可扩展
export const commonSettings = {
  $id: {
    title: 'ID',
    description: '数据存储的名称，请写英文，不能为空',
    type: 'string',
    'x-component': 'IdInput',
  },
  title: {
    title: '标题',
    type: 'string',
  },
  disabled: {
    title: '置灰',
    type: 'boolean',
  },
  required: {
    title: '必填',
    type: 'boolean',
  },
};

// widget 用于schema中每个元素对应的右侧配置知道用哪个setting

const elements = [
  {
    text: '输入框',
    name: 'input',
    widget: 'Input',
    schema: {
      title: '输入框',
      type: 'string',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入'
      }
    },
    setting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          placeholder: {
            title: 'placeholder',
            type: 'string',
          },
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean',
            'x-component': 'Switch',
          },
          addonBefore: {
            title: '前置标签',
            type: 'string',
          },
          addonAfter: {
            title: '后置标签',
            type: 'string',
          },
          prefix: {
            title: '前缀',
            type: 'string',
          },
          suffix: {
            title: '后缀',
            type: 'string',
          },
          maxLength: {
            title: '最长字数',
            type: 'number',
            'x-component': 'Number',
            'x-component-props': {
              min: 1,
              precision: 0
            },
          },
          size: {
            title: '尺寸',
            type: 'string',
            'x-component': 'Select',
            'x-component-props': {
              allowClear: true
            },
            enum: [
              {
                label: '大',
                value: 'large',
              },
              {
                label: '中',
                value: 'middle',
              },
              {
                label: '小',
                value: 'small',
              },
            ],
          },
        },
      },
    },
    mobileSetting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          placeholder: {
            title: 'placeholder',
            type: 'string',
          },
          clear: {
            title: '是否带清除功能',
            type: 'boolean',
            'x-component': 'Switch',
          },
          maxLength: {
            title: '最长字数',
            type: 'number',
            'x-component': 'Number',
            'x-component-props': {
              precision: 0
            },
          },
          extra: {
            title: '右边注释',
            type: 'string',
          }
        },
      },
    }
  },
  {
    text: '大输入框',
    name: 'textarea',
    widget: 'TextArea',
    schema: {
      title: '编辑框',
      type: 'string',
      'x-component': 'TextArea',
      'x-component-props': {
        "placeholder": "请输入"
      }
    },
    setting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          placeholder: {
            title: 'placeholder',
            type: 'string',
          },
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean',
            'x-component': 'Switch',
          },
          autoSize: {
            title: '高度自动',
            type: 'boolean',
            'x-component': 'Switch'
          },
          rows: {
            title: '指定高度',
            type: 'number',
            'x-component': 'Number',
            'x-component-props': {
              min: 1
            },
          },
          maxLength: {
            title: '最长字数',
            type: 'number',
            'x-component': 'Number',
            'x-component-props': {
              min: 1,
              precision: 0
            },
          },
        },
      },
    },
  },
  {
    text: '数字输入框',
    name: 'number',
    widget: 'Number',
    schema: {
      title: '数字输入框',
      type: 'number',
      'x-component': 'Number',
      'x-component-props': {
        "placeholder": "请输入"
      }
    },
    setting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          placeholder: {
            title: 'placeholder',
            type: 'string',
          },
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean',
            'x-component': 'Switch',
          },
          min: {
            title: '最小值',
            type: 'number',
            'x-component': 'Number'
          },
          max: {
            title: '最大值',
            type: 'number',
            'x-component': 'Number'
          },
          precision: {
            title: '精度',
            type: 'number',
            'x-component': 'Number',
            'x-component-props': {
              min: 0,
              precision: 0
            },
          },
          step: {
            title: '步数',
            type: 'number',
            'x-component': 'Number',
            'x-component-props': {
              min: 0,
            },
          },
        }
      }
    },
  },
  {
    text: '是否选择',
    name: 'switch',
    widget: 'Switch',
    schema: {
      title: '是否选择',
      type: 'boolean',
      'x-component': 'Switch',
    },
    setting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          checkedChildren: {
            title: '选中时的内容',
            type: 'string',
            'x-component-props': {
              allowClear: true
            }
          },
          unCheckedChildren: {
            title: '非选中时的内容',
            type: 'string',
            'x-component-props': {
              allowClear: true
            }
          },
        },
      },
    },
  },
  {
    text: '点击单选',
    name: 'radio',
    widget: 'Radio',
    schema: {
      title: '点击单选',
      type: 'string',
      'x-component': 'Radio',
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
    setting: {
      enum: {
        title: '数据源',
        type: 'array',
        'x-component': 'EnumList',
      },
    },
  },
  {
    text: '点击多选',
    name: 'checkbox',
    widget: 'Checkbox',
    schema: {
      title: '点击多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: [
        {
          label: '杭州',
          value: 'A',
        },
        {
          label: '武汉',
          value: 'B',
        },
        {
          label: '湖州',
          value: 'C',
        },
        {
          label: '贵阳',
          value: 'D',
        },
      ],
      'x-component': 'Checkbox',
    },
    setting: {
      enum: {
        title: '数据源',
        type: 'array',
        'x-component': 'EnumList',
      },
    },
  },
  {
    text: '下拉单选',
    name: 'select',
    widget: 'Select',
    schema: {
      title: '下拉单选',
      type: 'string',
      "x-component": 'Select',
      "x-component-props": {
        placeholder: '请输入'
      },
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
    setting: {
      enum: {
        title: '数据源',
        type: 'array',
        'x-component': 'EnumList',
      },
      "x-component-props": {
        title: '属性',
        type: 'object',
        properties: {
          placeholder: {
            title: 'placeholder',
            type: 'string',
          },
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean',
            'x-component': 'Switch',
          },
          size: {
            title: '尺寸',
            type: 'string',
            'x-component': 'Select',
            'x-component-props': {
              allowClear: true
            },
            enum: [
              {
                label: '大',
                value: 'large',
              },
              {
                label: '中',
                value: 'middle',
              },
              {
                label: '小',
                value: 'small',
              },
            ],
          },
          virtual: {
            title: '是否开启虚拟滚动',
            type: 'boolean',
            'x-component': 'Switch',
          }
        }
      }
    },
  },
  {
    text: '下拉多选',
    name: 'multiSelect',
    widget: 'MultiSelect',
    schema: {
      title: '下拉多选',
      type: 'array',
      items: {
        type: 'string',
      },
      enum: [
        {
          label: '杭州',
          value: 'A',
        },
        {
          label: '武汉',
          value: 'B',
        },
        {
          label: '湖州',
          value: 'C',
        },
        {
          label: '贵阳',
          value: 'D',
        },
      ],
      'x-component': 'MultiSelect',
      'x-component-props': {
        placeholder: '请输入'
      }
    },
    setting: {
      enum: {
        title: '数据源',
        type: 'array',
        'x-component': 'EnumList',
      },
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          placeholder: {
            title: 'placeholder',
            type: 'string',
          },
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean',
            'x-component': 'Switch',
          },
          size: {
            title: '尺寸',
            type: 'string',
            'x-component': 'Select',
            'x-component-props': {
              allowClear: true
            },
            enum: [
              {
                label: '大',
                value: 'large',
              },
              {
                label: '中',
                value: 'middle',
              },
              {
                label: '小',
                value: 'small',
              },
            ],
          },
          virtual: {
            title: '是否开启虚拟滚动',
            type: 'boolean',
            'x-component': 'Switch',
          }
        }
      }
    },
  },
  {
    text: '日期选择',
    name: 'date',
    widget: 'DatePicker',
    schema: {
      title: '日期选择',
      type: 'string',
      'x-component': 'DatePicker',
      'x-component-props': {
        placeholder: '请选择'
      }
    },
    setting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          placeholder: {
            title: 'placeholder',
            type: 'string',
          },
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean',
            'x-component': 'Switch',
          },
          picker: {
            title: '格式',
            type: 'string',
            'x-component': 'Select',
            'x-component-props': {
              allowClear: true
            },
            enum: [
              {
                label: '年/月/日',
                value: 'date',
              },
              {
                label: '周',
                value: 'week',
              },
              {
                label: '年/月',
                value: 'month',
              },
              {
                label: '季度',
                value: 'quarter',
              },
              {
                label: '年',
                value: 'year',
              },
            ],
          },
          showTime: {
            title: '时刻',
            type: 'string',
            'x-component': 'Select',
            'x-component-props': {
              allowClear: true
            },
            enum: [
              {
                label: '时+分+秒',
                value: 'HH:mm:ss',
              },
              {
                label: '时+分',
                value: 'HH:mm',
              },
              {
                label: '时',
                value: 'HH',
              }
            ],
          }
        }
      },
    },
  },
  {
    text: '日期范围',
    name: 'dateRange',
    widget: 'RangePicker',
    schema: {
      title: '日期范围',
      type: 'range',
      format: 'dateTime', // TODO ? format在schema中起的校验作用？是否可以完全干掉？
      'x-component': 'RangePicker',
      'x-component-props': {
        placeholder: ['开始时间', '结束时间'],
      },
    },
    setting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          picker: {
            title: '格式',
            type: 'string',
            'x-component': 'Select',
            'x-component-props': {
              allowClear: true
            },
            enum: [
              {
                label: '年/月/日',
                value: 'date',
              },
              {
                label: '周',
                value: 'week',
              },
              {
                label: '年/月',
                value: 'month',
              },
              {
                label: '季度',
                value: 'quarter',
              },
              {
                label: '年',
                value: 'year',
              },
            ],
          },
          showTime: {
            title: '时刻',
            type: 'string',
            'x-component': 'Select',
            'x-component-props': {
              allowClear: true
            },
            enum: [
              {
                label: '时+分+秒',
                value: 'HH:mm:ss',
              },
              {
                label: '时+分',
                value: 'HH:mm',
              },
              {
                label: '时',
                value: 'HH',
              }
            ],
          }
        }
      },
    },
  },
  {
    text: '时间选择',
    name: 'time',
    widget: 'TimePicker',
    schema: {
      title: '时间选择',
      type: 'time',
      'x-component': 'TimePicker',
      'x-component-props': {
        placeholder: '请选择时间',
      },
    },
    setting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          placeholder: {
            title: 'placeholder',
            type: 'string',
          },
          allowClear: {
            title: '是否带清除按钮',
            description: '填写内容后才会出现x哦',
            type: 'boolean',
            'x-component': 'Switch',
          },
          showNow: {
            title: '是否显示此刻',
            type: 'boolean',
            'x-component': 'Switch',
          },
          use12Hours: {
            title: '是否使用12小时制',
            type: 'boolean',
            'x-component': 'Switch',
          },
          suffixIcon: {
            title: '后缀文案',
            type: 'string',
          },
          hourStep: {
            title: '小时选项间隔',
            type: 'number',
            'x-component': 'Number',
            'x-component-props': {
              min: 0,
              max: 24,
              precision: 0
            },
          },
          minuteStep: {
            title: '分钟选项间隔',
            type: 'number',
            'x-component': 'Number',
            'x-component-props': {
              min: 0,
              max: 60,
              precision: 0
            },
          },
          secondStep: {
            title: '秒选项间隔',
            type: 'number',
            'x-component': 'Number',
            'x-component-props': {
              min: 0,
              max: 60,
              precision: 0
            },
          }
        }
      },
    },
  },
  {
    text: '数字滑动条',
    name: 'slider',
    widget: 'Slider',
    schema: {
      title: '数字滑动条',
      type: 'number',
      'x-component': 'Slider'
    },
    setting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          showInput: {
            title: '是否显示数字框',
            type: 'boolean',
            'x-component': 'Switch',
          },
          min: {
            title: '最小值',
            type: 'number',
            'x-component': 'Number',
          },
          max: {
            title: '最大值',
            type: 'number',
            'x-component': 'Number',
          },
          step: {
            title: '步长',
            type: 'number',
            'x-component': 'Number',
            min: 0
          }
        }
      }
    },
  },
  {
    text: '上传文件',
    name: 'upload',
    widget: 'Upload',
    schema: {
      title: '上传文件',
      type: 'time',
      'x-component': 'Upload',
      'x-component-props': {
        placeholder: '请选择文件',
      },
    },
    setting: {
      'x-component-props': {
        title: '属性',
        type: 'object',
        properties: {
          placeholder: {
            title: 'placeholder',
            type: 'string',
          }
        }
      }
    }
  }
];

const advancedElements = [];

const layouts = [
  {
    text: '对象',
    name: 'object',
    schema: {
      title: '对象',
      type: 'object',
      properties: {},
    },
    widget: 'map',
    setting: {},
  },
  {
    text: '列表',
    name: 'list',
    widget: 'list',
    schema: {
      title: '数组',
      type: 'array',
      items: {
        type: 'object',
        properties: {},
      },
    },
    // setting: {
    //   minItems: {
    //     title: '最小长度',
    //     type: 'number',
    //   },
    //   maxItems: {
    //     title: '最大长度',
    //     type: 'number',
    //   },
    //   'x-component-props': {
    //     title: '属性',
    //     type: 'object',
    //     properties: {
    //       foldable: {
    //         title: '是否可折叠',
    //         type: 'boolean',
    //       },
    //     },
    //   },
    // },
  },
];

let result = [elements, advancedElements, layouts];

result = result.map(list =>
  list.map(item => ({
    ...item,
    setting: { ...commonSettings, ...(item.setting || {}) },
    mobileSetting: { ...commonSettings, ...(item.mobileSetting || {}) }
  })),
);

export default result;
