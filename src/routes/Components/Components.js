import React,{Component} from 'react';
import PropTypes from 'prop-types'
import { Table, Divider, Tag,Card,Button,Popconfirm,Input,Skeleton } from 'antd';
import TreeCheck from 'components/TreeCheck'; // aware of the relative path

export default class Components extends Component {
    constructor(props){
        super(props);
        console.log(props)

        const {bordered} = props
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align:'center',//设置列内容的对齐方式
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            align:'center',
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            align:'center',
            render: (input, record) =>{
                return(
                    <Input value={input} onChange={(e)=>this.changeInput(e,record)}/>
                )
            }
        }, {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            align:'center',
            render: tags => (<span>{tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}</span>),
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) =>{
                return(
                    this.state.dataSource.length > 1
                        ? (
                        <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                    ) : null
                )
            },
        }];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }];

        this.state={
            columns,
            dataSource:data,
            count: 3,
            bordered,
        }
    }
    componentDidMount() {

    }
    //增加行
    handleAdd =()=>{
        const { count, dataSource } = this.state;
        console.log(dataSource);
        const newData = {
            key: count +1,
            name: 'John Brown',
            age: Math.floor(Math.random() * 50),
            address:'张江高科',
            tags: ['nice', 'developer'],
        };
        console.log(newData);
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }

    //删除行
    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    //修改input
    changeInput = (e,record)=>{
        let {value} = e.target,{key} = record,dataSource = [...this.state.dataSource];
        dataSource = dataSource.map((v)=>{
            if(v.key == key ) v.address = value
            return v
        })
        this.setState({ dataSource: dataSource });
    }

    onCheckedKeyChange = (checkedArrs)=>{
        console.log(checkedArrs);
    }

    render() {
        // const [count, setCount] = useState(0)
        // console.log(count);
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Joe Black', // Column configuration not to be checked
                name: record.name,
            }),
        };
        const {columns,dataSource} = this.state;

        const treeDatas = [{
            title: '0-0',
            key: '0-0',
            children: [{
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    { title: '0-0-0-0', key: '0-0-0-0' },
                    { title: '0-0-0-1', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ],
            }, {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                ],
            }, {
                title: '0-0-2',
                key: '0-0-2',
            }],
        }, {
            title: '0-1',
            key: '0-1',
            children: [
                { title: '0-1-0-0', key: '0-1-0-0' },
                { title: '0-1-0-1', key: '0-1-0-1' },
                { title: '0-1-0-2', key: '0-1-0-2' },
            ],
        }, {
            title: '0-2',
            key: '0-2',
        }];
        const treeData = [{
            label: '全部',
            value: 'all',
            children:[{
                label: '0-0',
                value: '00',
                children: [{
                    label: '0-0-0',
                    value: '000',
                    children: [
                        { label: '0-0-0-0', value: '0000' },
                        { label: '0-0-0-1', value: '0001' },
                        { label: '0-0-0-2', value: '0002' },
                    ],
                }, {
                    label: '0-0-1',
                    value: '001',
                    children: [
                        { label: '0-0-1-0', value: '0010' },
                        { label: '0-0-1-1', value: '0011' },
                        { label: '0-0-1-2', value: '0012' },
                    ],
                }, {
                    label: '0-0-2',
                    value: '002',
                }],
            }, {
                label: '0-1',
                value: '01',
                children: [
                    { label: '0-1-0-0', value: '0100' },
                    { label: '0-1-0-1', value: '0101' },
                    { label: '0-1-0-2', value: '0102' },
                ],
            }, {
                label: '0-2',
                value: '02',
            }]
        }];
        return (
            <div>
                <Card title="多功能Table"  bordered={false}>
                    {/*<Skeleton loading={false} title = {'我是title'} active={true} avatar={true} paragraph={{ rows: 4 }}>*/}
                        {/*<Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>*/}
                            {/*增加*/}
                        {/*</Button>*/}
                        {/*<Table rowSelection={rowSelection}*/}
                               {/*size="small"*/}
                               {/*columns={columns}*/}
                               {/*dataSource={dataSource}*/}
                               {/*loading={false}*/}
                               {/*bordered={this.state.bordered}*/}
                        {/*/>*/}
                    {/*</Skeleton>*/}

                    <TreeCheck
                        treeData={treeData}
                        isShowSearch={true}
                        spanName={'多选Selec：'}
                        getAllNodes={true}
                        //LabelAndValue={['title','key']}
                        selectTop="36px"
                        onCheckedKeyChange={(checkedArrs) => this.onCheckedKeyChange(checkedArrs)}/>

                </Card>
            </div>
        );
    }
}

// 组件必须传递参数
Components.propTypes = {
    bordered:PropTypes.bool,
    // isShowSearch: PropTypes.bool,
    // spanName: PropTypes.string,
    // getAllNodes: PropTypes.bool,
    // divWidth: PropTypes.string,
    // divHeight: PropTypes.string,
    // selectTop: PropTypes.string,
    // checkedKeys: PropTypes.array, // 树默认选中的值
    // async: PropTypes.bool
};

// 设置默认属性
Components.defaultProps = {
    bordered:true,//是否展示外边框和列边框
};
