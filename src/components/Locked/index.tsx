import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import { connect, DispatchProp } from 'react-redux';
import { drawer } from 'store/Authentication/actions';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './index.css';

interface IProps extends DispatchProp<any> {
  authenticated: boolean;
}

class MyDrawer extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  login = () => {
    this.props.dispatch(drawer(true));
  }
  render() {
   return(
     <div className={'locker-simple'}>
       <Row>
         <Col span={6}>
           <Icon style={{ fontSize: '4.5rem'}} type='lock' />
         </Col>
         <Col span={18}>
          <span> <FormattedMessage id='lockedText1' defaultMessage='Para acessar, '/><Link to={'/review'}><strong><FormattedMessage id='lockedText2' defaultMessage='avalie uma escola ou nos diga o que está pretendendo estudar e ajude a comunidade.'/></strong></Link></span><br />
          {!this.props.authenticated ?
             <div><span><FormattedMessage id='lockedTextAuth1' defaultMessage='Ja avaliou uma escola?, '/></span><strong><a onClick={this.login}> <FormattedMessage id='lockedTextAuth2' defaultMessage='entrar'/></a></strong></div>
             : <span> <FormattedMessage id='lockedTextAuth3' defaultMessage='é rapidinho e facil :)'/></span>
          }
         </Col>
        </Row>
    </div>
   );
  }
}
function mapStateToProps(state: any, ownProps: any) {
  return {
    authenticated: state.app.Authentication.authentication.isAuthenticated
  };
}
export default connect(mapStateToProps)(MyDrawer);