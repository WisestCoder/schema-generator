import React from 'react';
import FRWrapper from '../FRWrapper';
import { widgets } from '../widgets';
import { useGlobalProps, useStore } from '../hooks';
import ALL, { commonSettings } from '../Left/elementList';
import { getWidgetName } from '../mapping';

const elements = [...ALL[0], ...ALL[1], ...ALL[2]]; // 前三项是所有的组件

export default function ItemSettings() {
  const { flatten, onItemChange } = useStore();
  const { selected, Widgets, isPc, customElements, advancedElements } = useGlobalProps();

  let settingSchema = {};
  let settingData = {};

  const onDataChange = newSchema => {
    if (selected) {
      try {
        const item = flatten[selected];
        if (item && item.schema) {
          onItemChange(selected, { ...item, schema: newSchema });
        }
      } catch (error) {
        console.log(error, 'catch');
      }
    }
  };

  // setting该显示什么的计算，要把选中组件的schema和它对应的widgets的整体schema进行拼接
  let itemSelected;
  let widgetName;
  try {
    itemSelected = flatten[selected];
    if (itemSelected) {
      widgetName = getWidgetName(itemSelected.schema);
    }
    if (widgetName) {
      let schemaNow;
      const element = elements.find(e => e.widget === widgetName);
      if (element) { // 内置组件
        schemaNow = isPc ? element.setting : element.mobileSetting;
      } else { // 自定义组件
        const customSetting = [...advancedElements, ...customElements].find(x => x.schema['x-component'] === widgetName).settings;
        schemaNow = { ...commonSettings, ...customSetting }
      }
      // 包装一层schema，符合FRWrapper格式
      settingSchema = {
        type: 'object',
        properties: {
          ...schemaNow,
        },
      };
      // 选中的控件的schema，即是配置组件的formdata
      settingData = itemSelected.schema;
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <div style={{ paddingRight: 24 }}>
      <FRWrapper
        schema={settingSchema}
        formData={settingData}
        onChange={onDataChange}
        displayType="row"
        showDescIcon
        widgets={Widgets}
        isPc
        preview={true}
      />
    </div>
  );
}
