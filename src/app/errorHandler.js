import { notification } from "antd";

const errorHandler = store => next => action => {
  if (action.error === true) {
    const { payload: { message } } = action;
    notification.error({
      message: "错误",
      description: message,
      placement: "bottomRight",
      duration: 10
    });
  }
  return next(action);
};

export default errorHandler;
