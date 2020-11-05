import React from 'react';
import FRWrapper from '../FRWrapper';
import SCHEMA from './GlobalSettingSchema.json';
import { useGlobalProps } from '../hooks';

export default function ItemSettings() {
  const {
    hovering,
    mapping,
    preview,
    selected,
    setState,
    Widgets,
    isPc,
    ...rest
  } = useGlobalProps();
  const onDataChange = data => {
    setState(state => ({ ...state, ...data }));
  };

  return (
    <div style={{ paddingRight: 24 }}>
      <FRWrapper
        schema={SCHEMA}
        formData={rest}
        onChange={onDataChange}
        displayType="row"
        showDescIcon
        Widgets={Widgets}
        isPc
        preview={true}
      />
    </div>
  );
}
