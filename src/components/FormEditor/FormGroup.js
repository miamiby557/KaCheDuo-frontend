import React, { Fragment } from 'react';
import { Row, Col } from 'antd';

const FormGroup = ({ title, children, column }) => {
  if (column > 1) {
    return (
      <Row>
        <Col span={24}>
          <h3>{title}</h3>
        </Col>
        {children}
      </Row>
    );
  } else
    return (
      <Fragment>
        <Row>
          <Col span={24}>
            <h3>{title}</h3>
          </Col>
        </Row>
        {children}
      </Fragment>
    );
};

export default FormGroup;
