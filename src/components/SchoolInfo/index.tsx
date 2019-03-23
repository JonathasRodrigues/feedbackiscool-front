import React from 'react';
import { Icon } from 'antd';
import { FormattedMessage } from 'react-intl';

interface IProps {
  school: any;
}

const SchoolInfo = (props: IProps) => (
    <React.Fragment>
      <Icon style={{ color: '#fadb12', fontSize: '1.5rem' }} type='star'></Icon> <strong style={{ fontSize: '1.0rem' }}>{props.school.generalPoints ? props.school.generalPoints : 'N/A' }</strong><br />
      {props.school.address && <span> <Icon type='environment'/> <b><FormattedMessage id={'address'} defaultMessage='Endereço' />:</b> {props.school.address}<br/> </span>}
      {props.school.phone && <span><Icon type='phone' /> <b><FormattedMessage id={'phone'} defaultMessage='Telefone' />:</b> {props.school.phone}<br/></span>}
      {props.school.email && <span><Icon type='mail' /> <b><FormattedMessage id={'email'} defaultMessage='E-mail' />:</b> {props.school.email}<br/></span>}
      {props.school.site && <span><Icon type='chrome' /> <b><FormattedMessage id={'website'} defaultMessage='Website' />:</b> <a target='_blank' href={`http://${props.school.site}`}>{props.school.site}</a><br/></span>}
      {props.school.facebook && <span><Icon type='facebook' /> <a target='_blank' href={`http://fb.com/${props.school.facebook}`}>Facebook</a><br/></span>}
      {props.school.instagram && <span><Icon type='instagram' /> <a target='_blank' href={`http://instagram.com/${props.school.instagram}`}>Instagram</a><br/></span>}
    </React.Fragment>
);

export default SchoolInfo;