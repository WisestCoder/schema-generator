import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@ant-design/icons';
import { Button } from 'antd';
import {
  arrayMove,
} from 'react-sortable-hoc';
import FoldIcon from '../../components/foldIcon';
import DescriptionList, { getDescription } from '../../components/descList';

class ListItem extends React.Component {
  componentDidMount() {
    const { p = {}, name, fold } = this.props;
    const description = getDescription({
      schema: p.schema,
      value: p.value,
      index: name,
    });
    // 如果第一个值不为空，则收起
    // 新增的值为0，不折叠
    const hasValue = description && description[0] && description[0].text;
    if (hasValue && fold !== 0) {
      this.props.toggleFoldItem(name);
    }
  }

  toggleFold = () => {
    this.props.toggleFoldItem(this.props.name);
  };

  render() {
    const { item, p = {}, name, fold } = this.props;
    const descProps = { ...p, index: name };
    const { options = {}, readOnly, formData, value: rootValue } = p;
    const { foldable: canFold } = options;
    let { itemButtons } = options;

    // 只有当items为object时才做收起（fold）处理
    const isObj = p.schema.items && p.schema.items.type == 'object';
    let setClass =
      'fr-set ba b--black-10 hover-b--black-20 relative flex flex-column';
    if (canFold && fold) {
      setClass += ' pv12';
    } else if (p.displayType === 'row') {
      setClass += ' pt44';
    }
    return (
      <li className={setClass}>
        {canFold && fold && isObj ? <DescriptionList {...descProps} /> : item}
        {canFold && (
          <FoldIcon
            fold={fold}
            onClick={this.toggleFold}
            style={{ position: 'absolute', top: 12, right: 32 }}
          />
        )}
        {!((canFold && fold) || readOnly) && (
          <div className="self-end flex">
            <FrButton
              type="dashed"
              icon="delete"
              onClick={() => {
                const value = [...p.value];
                value.splice(name, 1);
                p.onChange(value);
              }}
            >
              删除
            </FrButton>
            {itemButtons &&
              itemButtons.length > 0 &&
              itemButtons.map((btn, idx) => {
                return (
                  <FrButton
                    key={idx.toString()}
                    className="ml2"
                    type="dashed"
                    icon={btn.icon}
                    onClick={() => {
                      const value = [...p.value];
                      if (typeof window[btn.callback] === 'function') {
                        const result = window[btn.callback](value, name); // eslint-disable-line
                        p.onChange(result);
                      }
                    }}
                  >
                    {btn.text || ''}
                  </FrButton>
                );
              })}
          </div>
        )}
      </li>
    );
  }
}

class FieldList extends React.Component {
  handleAddClick = () => {
    const { p, addUnfoldItem } = this.props;
    const value = [...p.value];
    value.push(p.newItem);
    p.onChange(value);
    addUnfoldItem();
  };

  render() {
    const { p, foldList = [], toggleFoldItem } = this.props;
    const { options = {}, extraButtons = {} } = p || {};
    // prefer x-component-props/buttons to ui:extraButtons, but keep both for backwards compatibility
    const buttons = options.buttons || extraButtons || [];
    const { readOnly, schema = {} } = p;
    const { maxItems } = schema;
    const list = p.value || [];
    const canAdd = maxItems ? maxItems > list.length : true; // 当到达最大个数，新增按钮消失

    return (
      <ul className="pl0 ma0">
        {list.map((_, name) => (
          <ListItem
            key={`item-${name}`}
            index={name}
            name={name}
            p={p}
            fold={foldList[name]}
            toggleFoldItem={toggleFoldItem}
            item={p.children}
          />
        ))}
        {!readOnly && (
          <div className="tr">
            <FrButton icon="add" onClick={this.handleAddClick}>
              新增
            </FrButton>
            {buttons &&
              buttons.length > 0 &&
              buttons.map((item, i) => (
                <FrButton
                  className="ml2"
                  icon={item.icon}
                  key={i.toString()}
                  onClick={() => {
                    if (item.callback === 'clearAll') {
                      p.onChange([]);
                      return;
                    }
                    if (item.callback === 'copyLast') {
                      const value = [...p.value];
                      const lastIndex = value.length - 1;
                      value.push(lastIndex > -1 ? value[lastIndex] : p.newItem);
                      p.onChange(value);
                      return;
                    }
                    if (typeof window[item.callback] === 'function') {
                      const value = [...p.value];
                      const onChange = value => p.onChange(value);
                      window[item.callback](value, onChange, p.newItem); // eslint-disable-line
                    }
                  }}
                >
                  {item.text}
                </FrButton>
              ))}
          </div>
        )}
      </ul>
    );
  }
}

class list extends React.Component {
  static propTypes = {
    value: PropTypes.array,
  };

  static defaultProps = {
    value: [null], // list需要默认加一项
  };

  constructor(props) {
    super(props);
    const len = this.props.value.length || 0;
    this.state = {
      foldList: new Array(len).fill(false) || [],
    };
  }

  // 新添加的item默认是展开的
  addUnfoldItem = () =>
    this.setState({
      foldList: [...this.state.foldList, 0],
    });

  toggleFoldItem = index => {
    const { foldList = [] } = this.state;
    foldList[index] = !foldList[index]; // TODO: need better solution for the weird behavior caused by setState being async
    this.setState({
      foldList,
    });
  };

  handleSort = ({ oldIndex, newIndex }) => {
    const { onChange, value } = this.props;
    onChange(arrayMove(value, oldIndex, newIndex));
    this.setState({
      foldList: arrayMove(this.state.foldList, oldIndex, newIndex),
    });
  };

  render() {
    const { foldList } = this.state;
    return (
      <FieldList
        p={this.props}
        foldList={foldList}
        toggleFoldItem={this.toggleFoldItem}
        addUnfoldItem={this.addUnfoldItem}
      />
    );
  }
}

function FrButton({ icon, children, ...rest }) {
  let iconName;
  switch (icon) {
    case 'add':
      iconName = 'PlusCircleOutlined';
      break;
    case 'delete':
      iconName = 'DeleteOutlined';
      break;
    default:
      iconName = icon;
      break;
  }
  const IconComponent = Icons[iconName];
  if (IconComponent) {
    return (
      <Button {...rest} icon={<IconComponent />}>
        {children}
      </Button>
    );
  }
  return <Button {...rest}>{children}</Button>;
}

export default list;
