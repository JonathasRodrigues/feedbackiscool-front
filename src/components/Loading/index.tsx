import React from 'react';
import { Row, Col, Spin } from 'antd';
import './index.css';
import { FormattedMessage } from 'react-intl';

const Loading = () => (
  <Row type='flex' justify='space-around' align='middle' className={'loading'}>
    <Col span={24}>
      <Row >
        <Col xs={24}>
          <Spin size={'large'} className={'spin'}/>
          <p><FormattedMessage id='loading' defaultMessage='Por favor aguarde, estamos carregando as informações...' /></p>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default Loading;