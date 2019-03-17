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
import { FormattedMessage } from 'react-intl';
import Loading from 'components/Loading';

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
        <Loading />
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
            <h2><FormattedMessage id={'howItWorks'} defaultMessage={'Como funciona'}/></h2>
          </Col>
          <Col md={8} xs={24}>
            <Icon type='home' style={{ fontSize: 65, color: '#08c' }} /><br /><br/>
            <FormattedMessage id={'infoSchool'} defaultMessage={'Fique por dentro de experiências de alunos nas escolas que estudam'}/>
          </Col>
          <Col md={8} xs={24}>
          <Icon type='line-chart' style={{ fontSize: 65, color: '#08c' }} /><br /><br/>
            <FormattedMessage id={'infoPrices'} defaultMessage={'Descubra o histórico de preços das escolas'}/>
          </Col>
          <Col md={8} xs={24}>
            <Icon type='smile-o' style={{ fontSize: 65, color: '#08c' }} /><br /><br/>
            <FormattedMessage id={'infoHappy'} defaultMessage={'Encontre a melhor escola para seu perfil e seu bolso'}/>
          </Col>
        </Row>
        <Row className={'info'} type='flex' justify='center'>
          <Col md={8} xs={24}>
            {this.props.isFetchingTotalReviews ?
              <div className={'number'}>0</div>
            :
            <div className={'number'}><CountUp duration={8} start={0} end={this.props.totalReviews} /></div>
            }
            <p><FormattedMessage id={'infoFeedbacks'} defaultMessage={'Feedbacks realizados'}/></p>
          </Col>
          <Col md={8} xs={24}>
            {this.props.isFetchingTotalCities ?
              <div className={'number'}>0</div>
            :
            <div className={'number'}><CountUp duration={8} start={0} end={this.props.totalCities} /></div>
            }
            <p><FormattedMessage id={'infoCities'} defaultMessage={'Cidades cadastradas'}/></p>
          </Col>
          <Col md={8} xs={24}>
            {this.props.isFetchingTotalSchools ?
              <div className={'number'}>0</div>
            :
            <div className={'number'}><CountUp duration={8} start={0} end={this.props.totalSchools} /></div>
            }
            <p><FormattedMessage id={'infoSchools'} defaultMessage={'Escolas cadastradas'}/></p>
          </Col>
        </Row>
        <Row type='flex' justify='center' className={'lastFeedbacks'}>
          <Col xs={24}>
            <h2><FormattedMessage id={'lastFeedbacks'} defaultMessage={'Últimos feedbacks'}/></h2>
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
