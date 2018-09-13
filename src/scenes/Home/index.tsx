import { Col, Row, Icon, Divider } from 'antd';
import React, { Component } from 'react';
import Result from 'components/Result';
import Search from 'components/Search';
import Map from 'components/Map';
import { connect } from 'react-redux';
import './index.css';

class Home extends Component<any,any> {
  render() {
    const { city } = this.props;
    return (
      <div>
        <Row className={'img-back'}>
          <Col md={{ span: 16, offset: 4 }} xs={24}>
            <Search />
          </Col>
        </Row>
       {(city && city.latitude && city.longitude) &&
        <div className={'map'}>
          <Row>
            <Col span={24} >
              <Map zoom={13} center={{
                lat: city.latitude,
                lng: city.longitude
              }} />
            </Col>
          </Row>
        </div>
       }
       { (city && city.id) &&
        <div>
          <Row>
            <Col span={24} >
              <Result />
            </Col>
          </Row>
          <Divider className={'no-margin'} />
        </div>
       }
        <Row type='flex' justify='center'>
          <Col md={8} xs={24} className={'we-do'}>
            <Icon type='home' style={{ fontSize: 65, color: '#08c' }} /><br /><br/>
            Saiba o que os alunos acham da <b>escola</b> onde estudam
          </Col>
          <Col md={8} xs={24} className={'we-do'}>
          <Icon type='line-chart' style={{ fontSize: 65, color: '#08c' }} /><br /><br/>
            Descubra o <b>histórico de preços</b> das escolas
          </Col>
          <Col md={8} xs={24} className={'we-do'}>
          <Icon type='smile-o' style={{ fontSize: 65, color: '#08c' }} /><br /><br/>
            Encontre a melhor escola para <b>seu perfil e seu bolso</b>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    city: state.app.City.selected
  };
}
export default connect(mapStateToProps)(Home);
