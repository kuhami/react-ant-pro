import React from 'react';
import { Row, Col } from 'antd';
import ImageWrapper from 'components/ImageWrapper'; // aware of the relative path

export default () => (
  <div>
    <Row>
      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
        <ImageWrapper
          src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png"
          desc="带有图片说明的实例图片"
        />
      </Col>
      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
        <ImageWrapper
          src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png"
          desc="带有图片说明的实例图片"
        />
      </Col>
    </Row>
    <Row>
      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
        <ImageWrapper
          src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png"
          desc="带有图片说明的实例图片"
        />
      </Col>
      <Col xl={12} lg={12} md={12} sm={24} xs={24}>
        <ImageWrapper
          src="https://os.alipayobjects.com/rmsportal/mgesTPFxodmIwpi.png"
          desc="带有图片说明的实例图片"
        />
      </Col>
    </Row>
  </div>
);
