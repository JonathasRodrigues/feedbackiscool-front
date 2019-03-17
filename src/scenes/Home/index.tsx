import { Col, Row, Icon, Carousel, Spin, List } from 'antd';
import React, { Component } from 'react';
import Search from 'components/Search';
import { connect } from 'react-redux';
import './index.css';
import CountUp from 'react-countup';
import { totalCities, unSelected } from 'store/City/actions';
import { totalSchools } from 'store/School/actions';
import { totalReviews, listLast } from 'store/Review/actions';
import ReviewDetails from 'components/ReviewDetails';

class Home extends Component<any,any> {
  componentWillMount() {
    this.props.dispatch(unSelected());
    this.props.dispatch(totalReviews());
    this.props.dispatch(totalSchools());
    this.props.dispatch(totalCities());
    this.props.dispatch(listLast());
  }
  render() {
    if (this.props.isFetchingSchools) {
      return (
        <p>Loading</p>
      );
    }
    return (
      <div>
        <Row className={'img-back'}>
          <Col md={{ span: 16, offset: 4 }} xs={24}>
            <Search />
          </Col>
        </Row>
        <Row type='flex' justify='center' className={'we-do'}>
          <Col xs={24}>
            <h2>Como funciona </h2>
          </Col>
          <Col md={8} xs={24}>
            <Icon type='home' style={{ fontSize: 65, color: '#08c' }} /><br /><br/>
            Saiba o que os alunos acham da <b>escola</b> onde estudam
          </Col>
          <Col md={8} xs={24}>
          <Icon type='line-chart' style={{ fontSize: 65, color: '#08c' }} /><br /><br/>
            Descubra o <b>histórico de preços</b> das escolas
          </Col>
          <Col md={8} xs={24}>
          <Icon type='smile-o' style={{ fontSize: 65, color: '#08c' }} /><br /><br/>
            Encontre a melhor escola para <b>seu perfil e seu bolso</b>
          </Col>
        </Row>
        <Row className={'info'} type='flex' justify='center'>
          <Col md={8} xs={24}>
            {this.props.isFetchingTotalReviews ?
              <div className={'number'}>0</div>
            :
            <div className={'number'}><CountUp duration={8} start={0} end={this.props.totalReviews} /></div>
            }
            <p>Feedbacks realizados</p>
          </Col>
          <Col md={8} xs={24}>
            {this.props.isFetchingTotalCities ?
              <div className={'number'}>0</div>
            :
            <div className={'number'}><CountUp duration={8} start={0} end={this.props.totalCities} /></div>
            }
            <p>Cidades cadastradas</p>
          </Col>
          <Col md={8} xs={24}>
            {this.props.isFetchingTotalSchools ?
              <div className={'number'}>0</div>
            :
            <div className={'number'}><CountUp duration={8} start={0} end={this.props.totalSchools} /></div>
            }
            <p> Escolas cadastradas </p>
          </Col>
        </Row>
        <Row type='flex' justify='center' className={'lastFeedbacks'}>
          <Col xs={24}>
            <h2>Últimos feedbacks </h2>
          </Col>
          {this.props.isFetchingListLast ?
            <Spin />
          :
            <Col md={24} xs={24}>
              <Carousel autoplay>
                {Array.isArray(this.props.listLast) && this.props.listLast.map((item: any) => (
                  <List.Item className={'reviewItem'}>
                    <List.Item.Meta
                      title={<span className={'review-title'}>"{item.title}"</span>}
                      description={<ReviewDetails item={item} index={0} />}
                    />
                </List.Item>
                ))}
              </Carousel>,
            </Col>
          }
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    city: state.app.City.selected,
    totalCities: state.app.City.total.data,
    isFetchingTotalCities: state.app.City.total.isFetching,
    totalSchools: state.app.School.total.data,
    isFetchingTotalSchools: state.app.School.total.isFetching,
    totalReviews: state.app.Review.total.data,
    isFetchingTotalReviews: state.app.Review.total.isFetching,
    isFetchingSchools: state.app.School.list.isFetching,
    isFetchingListLast: state.app.Review.listLast.isFetching,
    listLast: state.app.Review.listLast.data,
  };
}
export default connect(mapStateToProps)(Home);
