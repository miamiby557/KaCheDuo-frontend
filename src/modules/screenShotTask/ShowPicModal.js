import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Modal} from "antd";
import {hideShowPic} from "./actions";

class ShowPicModal extends PureComponent {


    handleCancel = () => {
        const {dispatch} = this.props;
        dispatch(hideShowPic());
    };


    render() {
        const {loading, visible, model} = this.props;
        const baseImg = 'data:image/png;base64, ' + model.fileBase64
        return (
            <Modal
                title="查看图片"
                visible={visible}
                onCancel={this.handleCancel}
                confirmLoading={loading}
                footer={null}

                width="60%"
            >
                <img src={baseImg} style={{ width: '100%' }}/>
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.screenShotTask.pic
    };
};

export default connect(mapStateToProps)(ShowPicModal);
