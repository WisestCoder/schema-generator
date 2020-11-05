import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';

export default function listEditor(props) {
  return (
    <div className='flex flex-column'>
      <div className='fr-set w-100 flex flex-column ba pt4 pb2 ph2 relative b--black-10'>
        {props.children}
      </div>
    </div>
  );
}
