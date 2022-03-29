export const paginationProps = {
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: total => `共 ${total} 条`,
  pageSizeOptions: ["20", "50", "100", "500"],
  defaultPageSize: 20,
  size: "default"
};

export const tableProps = {
  bordered: true,
  rowKey: "id",
  size:'middle'
};


export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
    }
};

export const formButtonLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16, offset: 8 }
    }
};