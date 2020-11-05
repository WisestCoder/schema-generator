import React, { useEffect } from 'react';
import { useGlobalProps, useSet } from '../hooks';
import { RightOutlined } from '@ant-design/icons';
import './index.css';
import ItemSettings from './ItemSettings';
import GlobalSettings from './GlobalSettings';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default function Right() {
  const [state, setState] = useSet({
    showRight: true,
    showItemSettings: false,
  });
  const { selected } = useGlobalProps();
  const { showRight, showItemSettings } = state;

  const toggleRight = () => setState({ showRight: !showRight });

  const ToggleIcon = () => (
    <div
      className="absolute top-0 left-0 pointer"
      style={{ height: 30, width: 30, padding: '8px 0 0 8px' }}
      onClick={toggleRight}
    >
      <RightOutlined className="f5" />
    </div>
  );

  const HideRightArrow = () => (
    <div
      className="absolute right-0 top-0 h2 flex-center"
      style={{ width: 40 }}
    >
      <ToggleIcon />
    </div>
  );

  // 如果没有选中任何item，或者是选中了根节点，object、list的内部，显示placeholder
  useEffect(() => {
    if ((selected && selected[0] === '0') || selected === '#' || !selected) {
      setState({ showItemSettings: false });
    } else {
      setState({ showItemSettings: true });
    }
  }, [selected]);

  return showRight ? (
    <div className="right-layout relative pl2">
      <ToggleIcon />
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        {showItemSettings && (
          <TabPane tab="组件配置" key="1">
            <ItemSettings />
          </TabPane>
        )}
        <TabPane tab="表单配置" key={showItemSettings ? '2' : '1'}>
          <GlobalSettings />
        </TabPane>
      </Tabs>
    </div>
  ) : (
    <HideRightArrow />
  );
}
