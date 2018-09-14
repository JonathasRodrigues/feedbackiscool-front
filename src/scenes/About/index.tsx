import React from 'react';
import { Row, Col } from 'antd';
import { logComponentError } from 'errors/errorHandler';

interface IProps {

}

interface IStates {

}

class About extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
  }
  componentDidCatch(error: any, info: any) {
    logComponentError(error);
  }
  render(){
    return(
      <Row>
        <Col span={24}>
          <Row className={'with-padding'}>
            <Col style={{ textAlign: 'center' }} className={'tab-content'} md={{ span: 18, offset: 3 }} xs={24}>
              <h2> Bem-vindo ao Feedback is cool!</h2>
              <span>
                Aqui você descobre os satisfação dos alunos em cada escola.
              </span>
              <h2> Por que criamos o Feedback is cool?</h2>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default About;