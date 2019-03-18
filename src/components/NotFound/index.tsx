import React from 'react';
import { Row, Col, Icon } from 'antd';
import './index.css';
import { FormattedMessage } from 'react-intl';

const NotFound = () => (
  <Row type='flex' justify='space-around' align='middle' className={'loading'}>
    <Col span={24}>
      <Row >
        <Col xs={24}>
          <Icon style={{ fontSize: '4vw' }} className={'spin'} type='robot' /><br /><br/>
          <p><FormattedMessage id='notFound' defaultMessage='Página não econtrada' /></p>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default NotFound;