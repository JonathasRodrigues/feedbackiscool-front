import React from 'react';
import { Row, Col, Rate, Icon, Divider, Form, List, Avatar, Button, Popover, BackTop, Spin } from 'antd';
import { connect, DispatchProp } from 'react-redux';
import { findById } from 'store/School/actions';
import { RouteComponentProps, Link } from 'react-router-dom';
import Locked from 'components/Locked';
import { list as listReviews } from 'store/Review/actions';
import './index.css';
import ChartRecommend from './ChartRecommend';
import moment from 'moment';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
  colon: false
};

interface IProps extends DispatchProp<any>, RouteComponentProps<any> {
  school?: any;
  reviews?: any;
  selected?: any;
  isAuthenticated?: any;
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
      })();
      this.props.dispatch(listReviews(id));
    }
  }
  componentDidCatch(error: any, info: any) {
    console.log(error);
  }
  render(){
    const { school, reviews, isAuthenticated, isFetching } = this.props;
    const reviewDetails = (item: any, index: any) => {
      let content = (
        <div>
            Localização<br/> <Rate defaultValue={item.localizationPoints} allowHalf disabled/> {item.localizationPoints} <br />
            Estrutura<br/> <Rate defaultValue={item.structurePoints} allowHalf disabled/> {item.structurePoints} <br />
            Didática<br/> <Rate defaultValue={item.teachingMethodPoints} allowHalf disabled/> {item.teachingMethodPoints} <br />
            Professores<br/> <Rate defaultValue={item.teachersPoints} allowHalf disabled/> {item.teachersPoints} <br />
            Staff<br/> <Rate defaultValue={item.staffPoints} allowHalf disabled/> {item.staffPoints} <br />
        </div>
      );
      if (index > 0 && !isAuthenticated) {
        return (
          <div>
            <Popover placement='bottom' content={content}>
              <Rate defaultValue={item.generalPoints} allowHalf disabled/> <Icon type= 'down-circle'/> <br />
            </Popover>
            <p>{item.user ? item.user : 'Usuário '}
              estudou {item.course === 'GE' ? 'General English ' : 'Preparatório Trinity '}
              em {moment(item.startDate).format('MMMM/YYYY')}</p>
            <div className='is-locked'>
              <Locked />
              <p><strong>Prós:</strong>&nbsp;pariatur provident temporibus est laborum ab excepturi commodi hic a accusamus dolores qui doloremque cumque ex illo sint quis velit quia perferendis dolorum odit ut id modi debitis atque suscipit et aliquam rem perspiciatis molestias libero voluptas ipsum vero eos est voluptatem corrupti incidunt quasi in quia est laboriosam sed</p>
              <p><strong>Contras:</strong>&nbsp;omnis id ratione laborum et provident aut autem aut perspiciatis dolore odio itaque qui quod ut repellendus unde perferendis nisi non porro qui facere earum occaecati rerum optio delectus ipsa et iure voluptatem ea numquam temporibus eos est ut libero expedita qui veritatis blanditiis assumenda est sunt rem qui quae</p>
            </div>
          </div>
        );
      }
      return (
        <div className={'review-text'}>
          <Popover placement='bottom' content={content}>
            <Rate defaultValue={item.generalPoints} allowHalf disabled/> <Icon type= 'down-circle'/> <br />
          </Popover>
          <p>{item.user ? item.user : 'Usuário '}
              estudou {item.course === 'GE' ? 'General English ' : 'Preparatório Trinity '}
              em {moment(item.startDate).format('MMMM/YYYY')}</p>
          <p> <strong>Prós:</strong> {item.pros}</p>
          <p> <strong>Contras:</strong> {item.contras} </p>
          {item.advise && <p> <strong>Conselho a diretoria:</strong> {item.advise} </p> }
          <p> <strong> Recomenda a escola: </strong> {item.recommend ? <span><Icon type='check-circle' style={{ fontSize: 16, color: 'green' }}/> Sim</span> : <span><Icon type='close-circle' style={{ fontSize: 16, color: 'red' }}/> Não</span>} </p>
        </div>
      );
    };
    if (isFetching) {
      return (
        <Row>
          <Col span={24}>
            <Row className={'with-padding'}>
              <Col style={{ textAlign: 'center' }} className={'tab-content'} md={{ span: 18, offset: 3 }} xs={24}>
                <Spin tip={'Carregando informações da escola ...'} indicator={<Icon type='loading' style={{ fontSize: '7vh' }} spin />} />
              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
    return(
      <div>
        <Row>
          <Col span={24}>
            <Row className={'with-padding'}>
              <Col className={'tab-content'} md={{ span: 18, offset: 3 }} xs={24}>
                <Row type='flex' justify='space-around' align='middle'>
                  <Col md={20} xs={24}>
                    <strong style={{ fontSize: '1.5rem' }}>{school && school.name} </strong>
                    <Icon style={{ color: '#fadb12', fontSize: '1.5rem' }} type='star'></Icon> <strong style={{ fontSize: '1.5rem' }}>{school && school.generalPoints}</strong><br />
                    {school &&
                      <div>
                        {school.address && <span><Icon type='environment'/> <b>Endereço:</b> {school.address}<br/></span>}
                        {school.phone && <span> <Icon type='phone' /> <b>Telefone:</b> {school.phone}<br/></span>}
                        {school.email && <span><Icon type='mail' /> <b>E-mail:</b> {school.email}<br/></span> }
                        {school.site && <span><Icon type='chrome' /> <b>Site:</b> <a target='_blank' href={`http://${school.site}`}>{school.site}</a><br/></span>}
                        {school.facebook && <span><Icon type='facebook' /> <a target='_blank' href={`http://fb.com/${school.facebook}`}>Facebook</a><br/></span>}
                        {school.instagram && <span><Icon type='instagram' /> <a target='_blank' href={`http://instagram.com/${school.instagram}`}>Instagram</a><br/></span>}
                      </div>
                    }
                  </Col>
                  <Col md={4} xs={24}>
                    <Link to={`/review/${school && school.id}`}> <Button size={'large'} icon={'star-o'} type={'primary'}> Avaliar </Button></Link>
                  </Col>
                </Row>
                <Divider/>
                <h2> Como é estudar na {school && school.name} ?</h2>
                <span> {reviews && reviews.length} avaliações nos últimos 12 meses</span>
                <Divider />
                <Row>
                  { school &&
                    <div>
                      <Col style={{ textAlign: 'center' }} span={24}>
                        <h3> Satisfação dos alunos </h3>
                        <span style={{ fontSize: 36 }}><Rate style={{ fontSize: 36 }} allowClear={false} defaultValue={school.generalPoints} allowHalf disabled /> {school.generalPoints}</span>
                      </Col>
                      <Col md={12} xs={24}>
                        <Form.Item {...formItemLayout} label={'Localização'}>
                          <Rate allowHalf disabled defaultValue={school.localizationPoints} /> {school.localizationPoints}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label={'Estrutura'}>
                          <Rate allowHalf disabled defaultValue={school.structurePoints}  /> {school.structurePoints}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label={'Didática'}>
                          <Rate allowHalf disabled defaultValue={school.teachingMethodPoints}  /> {school.teachingMethodPoints}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label={'Professores'}>
                          <Rate allowHalf disabled defaultValue={school.teachersPoints}  /> {school.teachersPoints}
                        </Form.Item>
                        <Form.Item {...formItemLayout} label={'Staff'}>
                          <Rate allowHalf disabled defaultValue={school.staffPoints}  /> {school.staffPoints}
                        </Form.Item>
                      </Col>
                      <Col md={12} xs={24}>
                        <ChartRecommend recommend={school && school.recommend} norecommend={school && school.noRecommend} />
                      </Col>
                    </div>
                  }
                </Row>
                <Divider />
                <Row>
                  <Col span={24}>
                  <List
                      itemLayout='horizontal'
                      dataSource={reviews}
                      renderItem={(item: any, index: any) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar icon='user' />}
                            title={<span className={'review-title'}>"{item.title}"</span>}
                            description={reviewDetails(item, index)}
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
    isAuthenticated: state.app.Authentication.authentication.isAuthenticated
  };
}
export default connect(mapStateToProps)(Information);