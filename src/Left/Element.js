import React from 'react';
import { useGlobal, useGlobalProps, useStore } from '../hooks';
import { addItem } from '../utils/schema';
import nanoid from 'nanoid';
import { useDrag } from 'react-dnd';

const Element = ({ text, name, schema }) => {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: 'box',
      dragItem: {
        parent: '#',
        schema,
        children: [],
      },
      $id: `#/${name}_${nanoid(6)}`,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped into ${dropResult.name}!`);
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const setGlobal = useGlobal();
  const { selected, beforeDragComplete } = useGlobalProps();
  const { flatten, onFlattenChange } = useStore();

  const handleElementClick = () => {
    if (!beforeDragComplete(schema)) {
      return;
    }

    const { newId, newFlatten } = addItem({ selected, name, schema, flatten });
    onFlattenChange(newFlatten);
    setGlobal({ selected: newId });
  };

  return (
    <div ref={dragRef} className="left-element" onClick={handleElementClick}>
      {text}
    </div>
  );
};

export default Element;
