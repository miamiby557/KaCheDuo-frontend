import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Button, Icon, notification, Upload} from "antd";
import {importDriver, query, showCreate} from "./actions";
import {getPrincipal} from "../../lib/identity";

class Toolbar extends PureComponent {

    handleShowCreate = () => {
        const {dispatch} = this.props;
        dispatch(showCreate());
    };

    customRequest = (options) => {
        const {dispatch, filter} = this.props;
        dispatch(importDriver({
            file: options.file,
            owner: getPrincipal().id
        })).then(() => {
            notification.success({
                message: '导入成功'
            });
            dispatch(query({
                ...filter, "owner": getPrincipal().id
            }));
        });
    };

    uploadProps = {
        showUploadList: false,
        name: 'file',
        accept: '.xlsx',
        customRequest: this.customRequest
    };

    render() {
        const {importLoading} = this.props;
        return (
            <div className="actions">
                <Button href="/static/司机档案导入模板.xlsx" target="_blank">下载导入模板</Button>
                <Upload {...this.uploadProps}>
                    <Button disabled={importLoading}>
                        <Icon type="upload"/> 导入
                    </Button>
                </Upload>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.user.list
    };
};

export default connect(mapStateToProps)(Toolbar);
