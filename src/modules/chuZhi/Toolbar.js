import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon, notification, Tooltip} from "antd";

class Toolbar extends PureComponent {


    handleExport = () => {
        document.getElementById("export").submit();
        notification.success({
            message: '请等待文件导出'
        });
    };

    render() {
        const {filter = {}} = this.props;
        const data = [];
        delete filter.userId;
        for (let key of Object.keys(filter)) {
            const value = filter[key];
            if(value !== undefined){
                data.push({"key": key, "value": value});
            }
        }
        return (
            <div className="actions">
                <Tooltip placement="top" title={"点击搜索后再导出"}><Button onClick={this.handleExport}><Icon type="export"/>导 出</Button></Tooltip>
                <form
                    id="export"
                    method="post"
                    target="_blank"
                    action="/api/fx/export"
                >
                    {data.map(item => (
                        <input
                            id={item.key}
                            name={item.key}
                            type="hidden"
                            value={item.value}
                        />
                    ))}
                </form>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.chuZhi.list
    };
};

export default connect(mapStateToProps)(Toolbar);
