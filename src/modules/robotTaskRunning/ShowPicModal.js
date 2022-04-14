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
        return (
            <Modal
                title="查看图片"
                visible={visible}
                onCancel={this.handleCancel}
                confirmLoading={loading}
                footer={null}
                width="50%"
            >
                <img src={"./api/image/"+ model.filePath} style={{ width: '100%', height:"600px"}}/>
            </Modal>

        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.robotTaskRunning.pic
    };
};

export default connect(mapStateToProps)(ShowPicModal);
