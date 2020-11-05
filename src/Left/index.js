import React, { useEffect } from 'react';
import allSettings from './elementList';
import Element from './Element';
import { useGlobalProps } from '../hooks';

import './index.css';

const [elements, advancedElements, layouts] = allSettings;

const Left = ({ ...rest }) => {
  const { advancedElements: advancedEls, customElements } = useGlobalProps();

  return (
    <div className="left-layout w5-l w4">
      <p className="f6 b">基础组件</p>
      <ul className="pl0">
        {elements.map((ele, idx) => {
          return (
            <li key={idx.toString()} className="left-item">
              <Element {...ele} {...rest} key={idx.toString()} />
            </li>
          );
        })}
      </ul>
      <p className="f6 b">高级组件</p>
      <ul className="pl0">
        {[...advancedElements, ...advancedEls].map((ele, idx) => {
          return (
            <li key={idx.toString()} className="left-item">
              <Element {...ele} {...rest} key={idx.toString()} />
            </li>
          );
        })}
      </ul>
      <p className="f6 b">布局组件</p>
      <ul className="pl0">
        {layouts.map((ele, idx) => {
          return (
            <li key={idx.toString()} className="left-item">
              <Element {...ele} {...rest} key={idx.toString()} />
            </li>
          );
        })}
      </ul>
      <p className="f6 b">自定义组件</p>
      <ul className="pl0">
        {customElements.map((ele, idx) => {
          return (
            <li key={idx.toString()} className="left-item">
              <Element {...ele} {...rest} key={idx.toString()} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Left;
