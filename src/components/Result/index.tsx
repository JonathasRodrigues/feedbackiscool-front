import { List, Icon, BackTop, Row, Col, Tag } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { selected } from 'store/School/actions';
import { FormattedMessage } from 'react-intl';
import SchoolInfo from 'components/SchoolInfo';
import SchoolRatings from 'components/SchoolRatings';
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
    const item = (it: any) => {
      return (
        <Row key={it.name} className='item'>
          <Col span={24}>
            <Link onClick={() => this.onClick(it)} to={{ pathname: `/information/${it.id}` }} href={it.href}><p className='title'>{it.name}</p></Link>
          </Col>
          <Col xs={24} md={12}>
            <SchoolInfo school={it} />
            <br />
          </Col>
          <Col xs={24} md={12}>
            <SchoolRatings school={it} />
          </Col>
          <Col span={24}>
            <Row className={'status'}>
              <Col md={{ span: 6 }} xs={{ span: 24, offset: 2 }}>
                <Tag><IconText type='star-o' text={<b>{`${it.reviews ? it.reviews : 0 } `}<FormattedMessage id={'feedbacks'} defaultMessage='Avaliações' /></b>} /></Tag>
              </Col>
              <Col md={{ span: 6 }} xs={{ span: 24, offset: 2 }}>
                <Tag><IconText type='like-o' text={<b>{`${it.recommend ? it.recommend : 0 } `}<FormattedMessage id={'recommend'} defaultMessage='Recomendam' /></b>} /></Tag>
              </Col>
              <Col md={{ span: 6 }} xs={{ span: 24, offset: 2 }}>
                <Tag><IconText type='dislike-o' text={<b>{`${it.noRecommend ? it.noRecommend : 0} `}<FormattedMessage id={'noRecommend'} defaultMessage='Não recomendam' /></b>} /></Tag>
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
    isFetching: state.app.School.list.isFetching,
  };
}
export default connect(mapStateToProps)(Result);