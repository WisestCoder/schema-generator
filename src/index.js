import React, { forwardRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Main from './Main';
import './index.css';

const Root = (props, ref) => {
  return (
    <DndProvider backend={HTML5Backend} context={window}>
      <Main ref={ref} {...props} />
    </DndProvider>
  );
};

export default forwardRef(Root);
