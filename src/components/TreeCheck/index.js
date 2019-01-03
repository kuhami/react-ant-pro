/**
 * Created by mwbyd on 2019/1/3.
 */
/**
 * 多选树
 * 例：treeData = [{
            label: '全部',
            value: '全部',
            children: [
                {label: "秦小厨", value: "秦小厨", children: [{label: "预入库单测试", value: "2017110602"}]}
                {label: "秦小厨集团", value: "秦小厨集团",…}
            ],
        }];
 * Created by lyl on 2018/6/26.
 *
 * 声明：本插件设计单据较多 ，如有修改请在群里告知 2018/12/19.
 *
 */
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, Tree, Input } from 'antd';
import $ from 'jquery';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class TreeCheck extends Component {
  constructor(props) {
    super(props);
    const { spanName, treeData, isShowSearch } = props;
    const expandedKeys = treeData[0].children.map(n => n.value);

    let treeList = treeData;

    this.state = {
      treeData,
      expandedKeys, //默认展开第一级
      autoExpandParent: true,
      checkedKeys: this.props.checkedKeys,
      selectedKeys: [],
      SelectKey:
        (this.props.checkedKeys.length > 0 && '选中了' + this.props.checkedKeys.length + '项') ||
        '全部',
      searchValue: '',
      isIcon: false,
      spanName,
      isShowSearch,
      treeList,
    };
  }

  // componentDidMount() {
  //     this.selectTop
  // }

  // componentWillReceiveProps (nextProps) {
  //
  //     // 根据 treeData 判断是否重新渲染结点
  //     if (!ImmutableCompare(Immutable.fromJS(this.props.treeData), Immutable.fromJS(nextProps.treeData))) {
  //
  //         const nextTreeData = nextProps.treeData
  //         const treeList = this.updateTreeList(nextTreeData)
  //         const expandedKeys =  nextTreeData[0].children.map((n)=>n.value)
  //         this.setState({
  //             expandedKeys,
  //             treeData: nextTreeData,
  //             treeList,
  //         })
  //     }
  // }

  handButton = e => {
    e.stopPropagation();
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this);
    let document = ReactDOM.findDOMNode(this).ownerDocument;
    console.log($(dom));
    let isHide = $(dom)
      .find('div.ant-dropdown')
      .hasClass('hide');
    let isScroll = $(document).find('div.frame-head-wrapper-scroll').length;

    let len = $(document).find('div.ant-dropdown').length;
    for (let i = 0; i < len; i++) {
      $(document)
        .find('div.ant-dropdown')
        .eq(i)
        .addClass('hide');
    }

    if (isHide) {
      $(dom)
        .find('div.ant-dropdown')
        .removeClass('hide');
      this.setState({
        isIcon: true,
      });
    } else {
      $(dom)
        .find('div.ant-dropdown')
        .addClass('hide');
      this.setState({
        isIcon: false,
      });
    }

    //解决 下框被覆盖问题
    if (isScroll) {
      if (isHide) {
        $(document)
          .find('div.frame-head-wrapper-scroll')
          .css({
            overflow: 'visible',
          });
      } else {
        $(document)
          .find('div.frame-head-wrapper-scroll')
          .css({
            overflowX: 'auto',
            overflowY: 'hidden',
          });
      }
    }

    $(document)
      .unbind('click')
      .bind('click', e => {
        e.stopPropagation();
        e.preventDefault();
        $(dom)
          .find('div.ant-dropdown')
          .addClass('hide');
        this.setState({
          isIcon: false,
        });
        //解决 下框被覆盖问题
        if (isScroll) {
          $(document)
            .find('div.frame-head-wrapper-scroll')
            .css({
              overflowX: 'auto',
              overflowY: 'hidden',
            });
        }
      });
  };

  handeDown = e => {
    e.stopPropagation();
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this);
    $(dom)
      .find('div.ant-dropdown')
      .removeClass('hide');
    let document = ReactDOM.findDOMNode(this).ownerDocument;
    let isScroll = $(document).find('div.frame-head-wrapper-scroll').length;

    $(document)
      .unbind('click')
      .bind('click', e => {
        e.stopPropagation();
        e.preventDefault();
        $(dom)
          .find('div.ant-dropdown')
          .addClass('hide');
        this.setState({
          isIcon: false,
        });

        //解决 下框被覆盖问题
        if (isScroll) {
          $(document)
            .find('div.frame-head-wrapper-scroll')
            .css({
              overflowX: 'auto',
              overflowY: 'hidden',
            });
        }
      });
  };
  /**
   * 将树转换成一维数组
   */
  updateTreeList = data => {
    let treeData = data;
    let treeList = [];
    // 递归获取树列表
    const getTreeList = (data, parent = {}) => {
      data.forEach(node => {
        console.log(node, node.children);
        node.parent = parent;
        //node = node.set('parent', parent);
        treeList = treeList.push(node);
        // if (node.children && node.children.length > 0) {
        //     getTreeList(node.get('children'), (parent.set(node.get('value'), '')));
        // }
      });
    };
    getTreeList(treeData);

    return treeList;
  };

  onExpand = expandedKeys => {
    //console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheckedKeyChange = checkedKeys => {
    this.props.onCheckedKeyChange(checkedKeys);
  };

  onCheck = (checkedKeys, e) => {
    let len = 0,
      lenValue,
      checkedArrs = [];
    this.setState({ checkedKeys });
    if (this.props.getAllNodes) {
      this.onCheckedKeyChange(checkedKeys);
      len = checkedKeys.length;
    } else {
      e.checkedNodes.map(v => {
        if (!v.props.children) {
          len++;
          if (len == '1') {
            lenValue = v.props.title.props.children[2];
          }
          checkedArrs.push(v.key);
        }
      });
      this.onCheckedKeyChange(checkedArrs);
    }

    this.setState({
      SelectKey:
        len == '0'
          ? '全部'
          : len == '1' && !this.props.getAllNodes ? lenValue : '选中' + len + '项',
    });
  };

  onChange = e => {
    const value = e.target.value;
    const { treeList } = this.state;
    const getParentKey = (key, tree) => {
      let parentKey;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key;
          } else if (getParentKey(key, node.children)) {
            parentKey = getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    };
    const expandedKeys = treeList
      .map(item => {
        console.log(item);
        if (item.label.indexOf(value) > -1) {
          return getParentKey(item.key, []);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  renderTreeNodes = data => {
    const { searchValue } = this.state;
    const { async } = this.props;

    return data.map(item => {
      const index = item.label && item.label.indexOf(searchValue);
      const beforeStr = item.label && item.label.substr(0, index);
      const afterStr = item.label && item.label.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.label}</span>
        );
      if (item.children) {
        return (
          <TreeNode title={title} key={item.value}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }

      if (async)
        return (
          <TreeNode
            {...{ title: title, key: item.value }}
            isLeaf={!item.hasOwnProperty('child') || item.child.length == 0}
          />
        );
      else return <TreeNode {...{ title: title, key: item.value }} />;
    });
  };

  render() {
    const linkStyle = {
      width: this.props.divWidth,
      height: this.props.divHeight,
      display: 'inline-block',
    };
    const buttonStyle = {
      display: 'inline-block',
      width: 200,
      minHeight: 32,
      paddingRight: 12,
      verticalAlign: 'middle',
      textAlign: 'left',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    };
    const spanStyle = {
      display: 'inline-block',
      minWidth: 0,
      textAlign: 'right',
    };
    const { treeData } = this.state;
    const { async } = this.props;

    const treeProps = {
      checkable: true,
      onExpand: this.onExpand,
      expandedKeys: this.state.expandedKeys,
      autoExpandParent: this.state.autoExpandParent,
      onCheck: this.onCheck,
      checkedKeys: this.state.checkedKeys,
      selectedKeys: this.state.selectedKeys,
    };

    if (async) {
      treeProps.loadData = node => {
        return new Promise(resolve => {
          resolve();
          return;
        });
      };
    }

    return (
      <div style={linkStyle}>
        <span style={spanStyle}>{this.state.spanName}</span>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <Button title={this.state.SelectKey} style={buttonStyle} onClick={this.handButton}>
            {this.state.SelectKey}
            <Icon
              style={{ position: 'absolute', right: 8, top: 10 }}
              type={this.state.isIcon ? 'up' : 'down'}
            />
          </Button>
          <div
            className="ant-dropdown hide"
            onClick={this.handeDown}
            style={{ minWidth: 200, top: this.props.selectTop, left: 0 }}
          >
            <div className="ant-dropdown-menu">
              {this.state.isShowSearch && (
                <Search
                  style={{ width: '94%', margin: '2% 3% 0 3%' }}
                  placeholder="请搜索......"
                  onChange={this.onChange}
                />
              )}
              <div style={{ maxHeight: 400, overflow: 'auto', minHeight: 0 }}>
                <Tree {...treeProps}>{this.renderTreeNodes(treeData)}</Tree>
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }
}

// 组件必须传递参数
TreeCheck.propTypes = {
  treeData: PropTypes.array,
  isShowSearch: PropTypes.bool,
  spanName: PropTypes.string,
  getAllNodes: PropTypes.bool,
  divWidth: PropTypes.string,
  divHeight: PropTypes.string,
  selectTop: PropTypes.string,
  checkedKeys: PropTypes.array, // 树默认选中的值
  async: PropTypes.bool,
};

// 设置默认属性
TreeCheck.defaultProps = {
  treeData: [],
  isShowSearch: false, //默认不显示搜索框
  spanName: '',
  onCheckedKeyChange: function() {
    //选中节点输出
  },
  async: false,
  getAllNodes: false, //是否选取所有节点 false：只选子节点
  divWidth: '300px',
  divHeight: '50px',
  selectTop: '42px',
  checkedKeys: [],
};