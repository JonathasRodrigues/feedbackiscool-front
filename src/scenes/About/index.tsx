import React from 'react';
import { Row, Col } from 'antd';
import { logComponentError } from 'errors/errorHandler';
import './index.css';

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
              <Row>
                <Col span={24} className={'we-do2'}>
                  <h2> Bem-vindo ao Feedback is cool!</h2>
                  <span>
                  Aqui você descobre os satisfação dos alunos e ex-alunos em cada escola e qual a melhor escola que combina com você.
                  A lista de escolas são referências do ILEP (Interim List of Eligible Programmes) e ACELS (Accreditation and Coordination of English Language Services).
                  </span>
                </Col>
                <Col span={24} className={'we-do2'}>
                  <h2> Por que criamos o Feedback is cool?</h2>
                  <span>
                  Quando estávamos pesquisando as cidades e escolas disponíveis para fazer intercâmbio percebemos que faltavam informações mais detalhadas e feedbacks sobre as escolas disponíveis.
                  Analisamos que esse não era um problema que só nós enfrentamos, foi aí que surgiu a ideia de reunir todas as escolas para intercâmbio em um só lugar para serem avaliadas por ninguém melhor que os atuais e ex alunos.
                  Desta maneira, é possível ajudar quem está pesquisando sobre intercâmbio e até mesmo quem está no país e quer renovar o curso em uma escola diferente.
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default About;