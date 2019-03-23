import React from 'react';
import { Row, Col, Rate, Icon, Divider, List, Avatar, Button, BackTop } from 'antd';
import { connect, DispatchProp } from 'react-redux';
import { findById } from 'store/School/actions';
import { RouteComponentProps, Link } from 'react-router-dom';
import { list as listReviews } from 'store/Review/actions';
import { canAccessContent } from 'store/Profile/actions';
import './index.css';
import ChartRecommend from './ChartRecommend';
import Loading from 'components/Loading';
import ReviewDetails from 'components/ReviewDetails';
import SchoolInfo from 'components/SchoolInfo/index';
import SchoolRatings from 'components/SchoolRatings/index';
import { FormattedMessage } from 'react-intl';

interface IProps extends DispatchProp<any>, RouteComponentProps<any> {
  school?: any;
  reviews?: any;
  selected?: any;
  isAuthenticated?: any;
  hasAccess: boolean;
  isFetching: boolean;
}

interface IStates {
  reviews: any;
}

class Information extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    const { id } = this.props.match.params;
    if (id) {
      (async() => {
        await this.props.dispatch(findById(id));
        if (props.isAuthenticated) {
          const userId = localStorage.getItem('id');
          await this.props.dispatch(canAccessContent(userId));
        }
      })();
      this.props.dispatch(listReviews(id));
    }
  }
  componentDidCatch(error: any, info: any) {
    console.log(error);
  }
  render(){
    const { school, reviews, isFetching } = this.props;
    if (isFetching) {
     return <Loading />;
    }
    return(
      <div>
        <Row>
          <Col span={24}>
            <Row className={'with-padding'}>
              <Col className={'tab-content'} md={{ span: 18, offset: 3 }} xs={24}>
                <Row type='flex' justify='space-around' align='middle'>
                  <Col md={18} xs={24}>
                    <strong style={{ fontSize: '1.5rem' }}>{school && school.name} </strong>
                    <Icon style={{ color: '#fadb12', fontSize: '1.5rem' }} type='star'></Icon> <strong style={{ fontSize: '1.5rem' }}>{school && school.generalPoints}</strong><br />
                    {school &&
                      <SchoolInfo school={school} />
                    }
                  </Col>
                  <Col md={6} xs={24}>
                    <Link to={`/review/${school && school.id}`}> <Button size={'large'} icon={'star-o'} type={'primary'}><FormattedMessage id='feedbackButton' defaultMessage='Avaliar'/> </Button></Link>
                  </Col>
                </Row>
                <Divider/>
                <h2> <FormattedMessage id='howStudy' defaultMessage='Como é estudar na '/> {school && school.name} ?</h2>
                <span><FormattedMessage id='frequencyFeedback' defaultMessage='{feedbacks} avaliações nos últimos 12 meses'
                  values={{ feedbacks: reviews ? reviews.length : 0 }} /></span>
                <Divider />
                  { school &&
                    <div>
                      <Col style={{ textAlign: 'center' }} span={24}>
                        <h3><FormattedMessage id='satisfactionTitle' defaultMessage='Satisfação dos alunos' /> </h3>
                        <span style={{ fontSize: 36 }}><Rate style={{ fontSize: 36 }} allowClear={false} defaultValue={school.generalPoints} allowHalf disabled /> {school.generalPoints}</span>
                      </Col>
                      <Col className={'points'} md={12} xs={24}>
                        <SchoolRatings school={school} />
                      </Col>
                      <Col md={12} xs={24}>
                        <ChartRecommend recommend={school && school.recommend} norecommend={school && school.noRecommend} />
                      </Col>
                    </div>
                  }
                <Divider />
                <Row>
                  <Col className={'text-mobile'} span={24}>
                  <List
                      itemLayout='horizontal'
                      dataSource={reviews}
                      renderItem={(item: any, index: any) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon='user' />}
                            title={<span className={'review-title'}>"{item.title}"</span>}
                            description={<ReviewDetails item={item} index={index} />}
                          />
                        </List.Item>
                      )}
                    />,
                  </Col>
                  <BackTop />
                </Row>
              </Col>
              {/* <Col md={{ span: 7, offset: 1}} xs={24}>
                <Row>
                  <Col className={'tab-content'} span={24}>
                    Mensaginha Inspiradora!
                  </Col>
                </Row>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    isFetching: state.app.School.findById.isFetching,
    school: state.app.School.findById.data,
    reviews: state.app.Review.list.data,
    isAuthenticated: state.app.Authentication.authentication.isAuthenticated,
    hasAccess: state.app.Profile.hasAccess,
  };
}
export default connect(mapStateToProps)(Information);