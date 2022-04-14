import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Card, Tooltip} from 'antd';
import {getPrincipal} from "../../lib/identity";
import 'ant-design-pro/dist/ant-design-pro.css';
import {queryByAdmin, querySelf} from "./actions"; // 统一引入样式
import robotWork from './robot-work.jpg'
import robotNoWork from './robot-no-work.jpg'


class Home extends PureComponent {
    componentDidMount() {
        this.tick();
        this.timerID = setInterval(
            () => this.tick(),
            10000
        );
    }

    tick = () => {
        const {dispatch} = this.props;
        const principal = getPrincipal();
        if (principal.admin) {
            dispatch(queryByAdmin());
        } else {
            dispatch(querySelf(getPrincipal().id));
        }
    };

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    render() {
        const {
            robotList
        } = this.props;
        console.info(robotList);
        const isAdmin = getPrincipal().admin;
        if (isAdmin) {
            return (
                <div>
                    {robotList.map(data => (
                        <div style={{width: "19%", padding: '10px', float: 'left'}}>
                            <Card title={data.company} bordered={false}
                                  style={{width: '100%'}}>
                                {data.subRobots.map(item => (
                                    <div style={{float: 'left', width: "33%"}}>
                                        {item.alive ?
                                            <Tooltip placement="top" title={"在线，上次在线时间：" + item.lastTime}>
                                                <div style={{width: '100%'}}><img src={robotWork} width={'100%'}
                                                                                  alt="在线"/></div>
                                            </Tooltip> :
                                            <Tooltip placement="top" title={"下线"}>
                                                <div style={{width: '100%'}}><img src={robotNoWork} width={'100%'}
                                                                                  alt="下线"/></div>
                                            </Tooltip>}
                                        <div style={{
                                            width: "100%",
                                            textAlign: 'center',
                                            fontSize: '1px'
                                        }}>{item.phone}</div>
                                    </div>
                                ))}
                            </Card>
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div>
                    {robotList.map(data => (
                        <div style={{width: "19%", padding: '10px', float: 'left'}}>
                            <Card title={data.company} bordered={false}
                                  style={{width: '100%'}}>
                                {data.subRobots.map(item => (
                                    <div style={{float: 'left', width: "33%"}}>
                                        {item.alive ?
                                            <Tooltip placement="top" title={"在线，上次在线时间：" + item.lastTime}>
                                                <div style={{width: '100%'}}><img src={robotWork} width={'100%'}
                                                                                  alt="在线"/></div>
                                            </Tooltip> :
                                            <Tooltip placement="top" title={"下线"}>
                                                <div style={{width: '100%'}}><img src={robotNoWork} width={'100%'}
                                                                                  alt="下线"/></div>
                                            </Tooltip>}
                                        <div style={{
                                            width: "100%",
                                            textAlign: 'center',
                                            fontSize: '1px'
                                        }}>{item.phone}</div>
                                    </div>
                                ))}
                            </Card>
                        </div>
                    ))}
                </div>
            );
        }


    }
}

const mapStateToProps = state => {
    return {
        ...state.home
    };
};

export default connect(mapStateToProps)(Home);
