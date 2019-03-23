import React from 'react';
import { Col, Rate } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

interface IProps {
  school: any;
}

const SchoolRatings = (props: IProps) => {
  if (!props.school.reviews) {
    return (
      <React.Fragment>
        <Col xs={24} style={{ textAlign: 'center' }} >
          <FormattedMessage id={'noAvaliation'} defaultMessage='A escola não tem nenhuma avaliação, ' />
          <Link to={`review/${props.school.id}`}>
            <a><FormattedMessage id={'beTheFirst'} defaultMessage='seja o primeiro a avaliar!' /> </a>
          </Link>
        </Col>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Col xs={24}>
        <Col span={12}>
          <span><FormattedMessage id={'localization'} defaultMessage='Localização' /> </span>
        </Col>
        <Col span={12}>
          <Rate allowHalf disabled defaultValue={props.school.localizationPoints} /> {props.school.localizationPoints}
        </Col>

        <Col span={12}>
          <span><FormattedMessage id={'facilities'} defaultMessage='Estrutura' /></span>
        </Col>
        <Col span={12}>
          <Rate allowHalf disabled defaultValue={props.school.structurePoints}  /> {props.school.structurePoints}
        </Col>

        <Col span={12}>
          <span><FormattedMessage id={'teaching'} defaultMessage='Didática' /></span>
        </Col>
        <Col span={12}>
          <Rate allowHalf disabled defaultValue={props.school.teachingMethodPoints}  /> {props.school.teachingMethodPoints}
        </Col>

        <Col span={12}>
          <span><FormattedMessage id={'teachers'} defaultMessage='Professores' /></span>
        </Col>
        <Col span={12}>
          <Rate allowHalf disabled defaultValue={props.school.teachersPoints}  /> {props.school.teachersPoints}
        </Col>

        <Col span={12}>
          <span><FormattedMessage id={'staff'} defaultMessage='Staff' /></span>
        </Col>
        <Col span={12}>
          <Rate allowHalf disabled defaultValue={props.school.staffPoints}  /> {props.school.staffPoints}
        </Col>
        <Col span={12}>
          <span><FormattedMessage id={'nacionalities'} defaultMessage='Mix de nacionalidades' /></span>
        </Col>
        <Col span={12}>
          <Rate allowHalf disabled defaultValue={props.school.mixNacionality}  /> {props.school.mixNacionality ? props.school.mixNacionality : 'N/A' }
        </Col>
      </Col>
    </React.Fragment>
  );
};

export default SchoolRatings;