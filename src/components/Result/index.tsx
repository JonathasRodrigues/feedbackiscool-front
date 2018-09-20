import { List, Rate, Icon, BackTop, Row, Col, Tag } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selected } from 'store/School/actions';
import './index.css';

class Result extends Component<any, any> {
  onClick = (item: any) => {
    this.props.dispatch(selected(item));
  }
  render() {
   const { schools, isFetching } = this.props;
   const IconText = ({ type, text }: any) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
    const desc = (it: any) => (
      <div>
        {it.reviews ?
        <span>
          Localização <Rate allowHalf disabled defaultValue={it.localizationPoints} /> {it.localizationPoints}<br />
          Estrutura <Rate allowHalf disabled defaultValue={it.structurePoints}  /> {it.structurePoints}<br />
          Didática <Rate allowHalf disabled defaultValue={it.teachingMethodPoints}  /> {it.teachingMethodPoints}<br />
          Professores <Rate allowHalf disabled defaultValue={it.teachersPoints}  /> {it.teachersPoints}<br />
          Staff <Rate allowHalf disabled defaultValue={it.staffPoints}  /> {it.staffPoints}<br />
        </span>
        : <span> A escola não tem nenhuma avaliação,<Link to={`review/${it.id}`}> <a>seja o primeiro a avaliar!</a> </Link></span> }
      </div>
    );

    const info = (it: any) => (
      <div>
        <Icon style={{ color: '#fadb12', fontSize: '1.5rem' }} type='star'></Icon> <strong style={{ fontSize: '1.0rem' }}>{it.generalPoints ? it.generalPoints : 'N/A' }</strong><br />
        {it.address && <span> <Icon type='environment'/> <b>Endereço:</b> {it.address}<br/> </span>}
        {it.phone && <span><Icon type='phone' /> <b>Telefone:</b> {it.phone}<br/></span>}
        {it.email && <span><Icon type='mail' /> <b>E-mail:</b> {it.email}<br/></span>}
        {it.site && <span><Icon type='chrome' /> <b>Site:</b> <a target='_blank' href={`http://${it.site}`}>{it.site}</a><br/></span>}
        {it.facebook && <span><Icon type='facebook' /> <a target='_blank' href={`http://fb.com/${it.facebook}`}>Facebook</a><br/></span>}
        {it.instagram && <span><Icon type='instagram' /> <a target='_blank' href={`http://instagram.com/${it.instagram}`}>Instagram</a><br/></span>}
      </div>
    );

    const item = (it: any) => {
      return (
        <Row key={it.name} className='item'>
          <Col span={24}>
            <Link onClick={() => this.onClick(it)} to={{ pathname: `/information/${it.id}` }} href={it.href}><p className='title'>{it.name}</p></Link>
          </Col>
          <Col xs={24} md={12}>
            {info(it)}
            <br />
            {/* <IconText type='star-o' text={`${it.reviews ? it.reviews : 0 } Avaliações`} /><br />
            <IconText type='like-o' text={`${it.recommend ? it.recommend : 0 } Recomendam`} /><br />
            <IconText type='dislike-o' text={`${it.noRecommend ? it.noRecommend : 0} Não recomendam`} /><br /> */}
          </Col>
          <Col className='rating' xs={24} md={{span: 10, offset: 2 }}>
            {desc(it)}
          </Col>
          <Col span={24}>
            <Row className={'status'}>
              <Col md={{ span: 6 }} xs={{ span: 24, offset: 2 }}>
              <Tag><IconText type='star-o' text={<b>{`${it.reviews ? it.reviews : 0 } Avaliações`}</b>} /></Tag>
              </Col>
              <Col md={{ span: 6 }} xs={{ span: 24, offset: 2 }}>
                <Tag><IconText type='like-o' text={<b>{`${it.recommend ? it.recommend : 0 } Recomendam`}</b>} /></Tag>
              </Col>
              <Col md={{ span: 6 }} xs={{ span: 24, offset: 2 }}>
                <Tag><IconText type='dislike-o' text={<b>{`${it.noRecommend ? it.noRecommend : 0} Não Recomendam`}</b>} /></Tag>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    };
    if (isFetching) {
      return(
        <div></div>
      );
    }

    return (
      <Row className={'results'}>
        <Col lg={{ span:15, offset: 5 }} md={24} xs={24}>
          <List
            itemLayout='vertical'
            locale={{ emptyText: 'Não foram encontradas escolas nessa cidade.'}}
            size='small'
            dataSource={schools}
            renderItem={item}
          />
        </Col>
          <BackTop />
      </Row>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    schools: state.app.School.list.data,
    isFetching: state.app.School.list.isFetching
  };
}
export default connect(mapStateToProps)(Result);