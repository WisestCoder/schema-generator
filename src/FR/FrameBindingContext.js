import React, {
  useEffect,
  useContext,
} from 'react';
import { DndContext } from 'react-dnd';
import { FrameContext } from 'react-frame-component'

// 绑定事件组件，更换iframe的DndContext
const FrameBindingContext = ({ children }) => {
  const { dragDropManager } = useContext(DndContext);
  const { window } = useContext(FrameContext);

  useEffect(() => {
    dragDropManager.getBackend().addEventListeners(window);
  }, []);

  return children;
};

export default FrameBindingContext;
