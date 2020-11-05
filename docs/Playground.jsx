import React, { useState } from 'react';
import { Input } from 'antd';
import Generator from '@coolvision/schema-generator';
import './index.css';

const defaultValue = {
  "type": "object",
  "properties": {
    "object_HHLdi8": {
      "title": "基础技能",
      "type": "object",
      "properties": {
        "play_game": {
          "key": "play_game",
          "type": "string",
          "name": "play_game",
          "title": "打游戏",
          "x-component": "Input",
          "x-component-props": {
            "placeholder": "请输入"
          },
          "required": true
        }
      }
    }
  }
};

const advancedElements = [
  {
    text: '工作经历',
    name: 'work_experience',
    schema: {
      "title": "工作经历",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "company_GYjdmL": {
            "title": "工作单位",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入工作单位"
            },
            "required": true
          },
          "position_MYOc0t": {
            "title": "职位",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入职位"
            },
            "required": true
          },
          "dateRange_YUb4kj": {
            "title": "开始结束时间",
            "type": "range",
            "format": "dateTime",
            "x-component": "RangePicker",
            "x-component-props": {
              "placeholder": [
                "开始时间",
                "结束时间"
              ],
              "picker": "date"
            },
            "required": true
          },
          "input_JDWEkz": {
            "title": "证明人",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入"
            }
          },
          "telephone_Ln_F2i": {
            "title": "证明人手机号",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入手机号"
            },
            "x-rules": [
              {
                "validator": "(value: string) => {\n            return !(/^[1]([3-9])[0-9]{9}$/.test(value));\n          }",
                "message": "手机号格式不正确"
              }
            ],
            "required": false
          },
          "textarea_6RDJDA": {
            "title": "离职原因",
            "type": "string",
            "x-component": "TextArea",
            "x-component-props": {
              "placeholder": "请输入离职原因"
            }
          }
        }
      },
      "required": true
    },
  },
  {
    text: '教育经历',
    name: 'educate_experience',
    schema: {
      "title": "教育经历",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "school__ZvyAv": {
            "title": "学校",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入学校"
            },
            "required": true
          },
          "major_zkzF80": {
            "title": "专业",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入专业"
            },
            "required": true
          },
          "dateRange_OfS_p8": {
            "title": "开始结束时间",
            "type": "range",
            "format": "dateTime",
            "x-component": "RangePicker",
            "x-component-props": {
              "placeholder": [
                "开始时间",
                "结束时间"
              ],
              "picker": "date"
            },
            "required": true
          }
        }
      }
    }
  },
  {
    text: '家庭成员',
    name: 'family_member',
    schema: {
      "title": "家庭成员",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "input_2CSFYn": {
            "title": "姓名",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入姓名"
            },
            "required": true
          },
          "input_7WLMnR": {
            "title": "关系",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入关系"
            },
            "required": true
          },
          "input_mkFCKW": {
            "title": "工作或学习单位",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入工作或学习单位"
            },
            "required": true
          },
          "input_psn_Dw": {
            "title": "职务",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入职务"
            },
            "required": true
          }
        }
      },
      "required": true
    }
  },
  {
    text: '专业证书',
    name: 'professional_certificate',
    schema: {
      "title": "专业证书",
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "certificate_type_C2F0Cy": {
            "title": "证书类型",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入证书类型"
            },
            "required": true
          },
          "certificate_name_6odVio": {
            "title": "证书名称",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入证书名称"
            },
            "required": true
          },
          "input_u4EP8Z": {
            "title": "发证机构",
            "type": "string",
            "x-component": "Input",
            "x-component-props": {
              "placeholder": "请输入发证机构"
            }
          },
          "date_OGHtXa": {
            "title": "取得日期",
            "type": "string",
            "x-component": "DatePicker",
            "x-component-props": {
              "placeholder": "请输入"
            }
          }
        }
      }
    }
  }
];

const customElements = [
  {
    text: '手机号',
    name: 'telephone',
    schema: {
      title: '手机号',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入手机号"
      },
      "x-rules": [
        {
          validator: `(value: string) => {
            return !(/^[1]([3-9])[0-9]{9}$/.test(value));
          }`,
          message: "手机号格式不正确"
        }
      ],
      required: true
    },
  },
  {
    text: '邮箱',
    name: 'email',
    schema: {
      title: '邮箱',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入邮箱"
      },
      "x-rules": [
        {
          validator: `(value: string) => {
            return !(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value));
          }`,
          message: "邮箱格式不正确"
        }
      ],
      required: true
    },
  },
  {
    text: '应聘职位',
    name: 'position',
    schema: {
      title: '应聘职位',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入应聘职位"
      },
      required: true
    },
  },
  {
    text: '期望月薪',
    name: 'expected_salary',
    schema: {
      title: '期望月薪',
      type: 'string',
      "x-component": 'Select',
      "x-component-props": {
        placeholder: '请选择期望月薪'
      },
      enum: [
        {
          label: '5000元以下',
          value: 'a',
        },
        {
          label: '5000元 - 10000元',
          value: 'b',
        },
        {
          label: '10000元 - 15000元',
          value: 'c',
        },
        {
          label: '15000元 - 20000元',
          value: 'd',
        },
        {
          label: '20000元 - 30000元',
          value: 'e',
        },
        {
          label: '30000元以上',
          value: 'f',
        },
      ],
      required: true
    },
  },
  {
    text: '当前月薪',
    name: 'current_salary',
    schema: {
      title: '当前月薪',
      type: 'string',
      "x-component": 'Select',
      "x-component-props": {
        placeholder: '请选择当前月薪'
      },
      enum: [
        {
          label: '5000元以下',
          value: 'a',
        },
        {
          label: '5000元 - 10000元',
          value: 'b',
        },
        {
          label: '10000元 - 15000元',
          value: 'c',
        },
        {
          label: '15000元 - 20000元',
          value: 'd',
        },
        {
          label: '20000元 - 30000元',
          value: 'e',
        },
        {
          label: '30000元以上',
          value: 'f',
        },
      ],
      required: true
    },
  },
  {
    text: '婚姻状况',
    name: 'maritlal_status',
    widget: 'Radio',
    schema: {
      title: '婚姻状况',
      type: 'string',
      'x-component': 'Radio',
      enum: [
        {
          label: '已婚',
          value: 'a',
        },
        {
          label: '未婚',
          value: 'b',
        },
        {
          label: '其他',
          value: 'c',
        },
      ],
      required: true
    }
  },
  {
    text: '性别',
    name: 'gender',
    widget: 'Radio',
    schema: {
      title: '点击单选',
      type: 'string',
      'x-component': 'Radio',
      enum: [
        {
          label: '男',
          value: 'a',
        },
        {
          label: '女',
          value: 'b',
        },
        {
          label: '其他',
          value: 'c',
        },
      ],
      required: true
    }
  },
  {
    text: '政治面貌',
    name: 'politics',
    schema: {
      title: '政治面貌',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入政治面貌"
      },
      required: true
    },
  },
  {
    text: '籍贯',
    name: 'native_place',
    schema: {
      title: '籍贯',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入籍贯"
      },
      required: true
    },
  },
  {
    text: '民族',
    name: 'nation',
    schema: {
      title: '民族',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入民族"
      },
      required: true
    },
  },
  {
    text: '工作单位',
    name: 'company',
    schema: {
      title: '工作单位',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入工作单位"
      },
      required: true
    },
  },
  {
    text: '学校',
    name: 'school',
    schema: {
      title: '学校',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入学校"
      },
      required: true
    },
  },
  {
    text: '专业',
    name: 'major',
    schema: {
      title: '专业',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入专业"
      },
      required: true
    },
  },
  {
    text: '学历',
    name: 'education',
    schema: {
      title: '学历',
      type: 'string',
      "x-component": 'Select',
      "x-component-props": {
        "placeholder": "请选择"
      },
      enum: [
        {
          label: '小学',
          value: 'a',
        },
        {
          label: '初中',
          value: 'b',
        },
        {
          label: '高中',
          value: 'c',
        },
        {
          label: '中专',
          value: 'd',
        },
        {
          label: '大专',
          value: 'e',
        },
        {
          label: '本科',
          value: 'f',
        },
        {
          label: '硕士',
          value: 'g',
        },
        {
          label: '博士',
          value: 'h',
        },
      ],
      required: true
    },
  },
  {
    text: '证书类型',
    name: 'certificate_type',
    schema: {
      title: '证书类型',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入证书类型"
      },
      required: true
    },
  },
  {
    text: '证书名称',
    name: 'certificate_name',
    schema: {
      title: '证书名称',
      type: 'string',
      "x-component": 'Input',
      "x-component-props": {
        "placeholder": "请输入证书名称"
      },
      required: true
    },
  },
  // {
  //   text: '自定义组件2',
  //   name: 'something2',
  //   schema: {
  //     title: '自定义的widget',
  //     description: '这是一个自定义的widget',
  //     type: 'string',
  //     "x-component": 'ABCD',
  //     'x-component-props': {
  //       maxLength: 20
  //     }
  //   },
  //   settings: {
  //     'x-component-props': {
  //       title: '选项',
  //       type: 'object',
  //       properties: {
  //         allowClear: {
  //           title: '是否带清除按钮',
  //           description: '填写内容后才会出现x哦',
  //           type: 'boolean',
  //         },
  //         addonBefore: {
  //           title: '前置标签',
  //           type: 'string',
  //         },
  //         addonAfter: {
  //           title: '后置标签',
  //           type: 'string',
  //         },
  //         prefix: {
  //           title: '前缀',
  //           type: 'string',
  //         },
  //         suffix: {
  //           title: '后缀',
  //           type: 'string',
  //         },
  //         maxLength: {
  //           title: '最长字数',
  //           type: 'number',
  //         }
  //       },
  //     },
  //   }
  // }
];

const ABCD = ({ disabled, readOnly, value, onChange, options }) => {
  return (
    <Input
      disabled={disabled}
      readOnly={readOnly}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      maxLength={options.maxLength}
    />
  );
}

const Demo = () => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div style={{ height: '100vh' }}>
      <Generator
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        customElements={customElements}
        advancedElements={advancedElements}
        // Widgets={{
        //   ABCD
        // }}
        actions={[
          { label: '切换模板', onClick: () => {} }
        ]}
        onSave={(schema) => {
          console.log(JSON.stringify(schema, null, 2))
        }}
        beforeDragComplete={(current) => {
          console.log('current', current);
          return true;
        }}
      />
    </div>
  );
};

export default Demo;
