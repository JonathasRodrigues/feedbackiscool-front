import React, { Component } from 'react';
import { Drawer, Tabs } from 'antd';
import { connect, DispatchProp } from 'react-redux';
import { drawer } from 'store/Authentication/actions';
import Login from 'components/Login';
import Register from 'components/Register';
import { injectIntl } from 'react-intl';
import './index.css';

const TabPane = Tabs.TabPane;

interface IProps extends DispatchProp<any> {
  open: boolean;
  intl: any;
}

class MyDrawer extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  closeDrawer = () => {
    this.props.dispatch(drawer(false));
  }
  render() {
    const { intl, open } = this.props;
   return(
    <Drawer
      placement='right'
      onClose={this.closeDrawer}
      maskClosable={true}
      visible={open}
    >
      <Tabs defaultActiveKey='1'>
        <TabPane tab={intl.formatMessage({ id: 'login', defaultMessage: 'Entrar' })} key='1'><Login /></TabPane>
        <TabPane tab={intl.formatMessage({ id: 'register', defaultMessage: 'Cadastrar' })} key='2'><Register /></TabPane>
      </Tabs>
    </Drawer>
   );
  }
}
function mapStateToProps(state: any, ownProps: any) {
  return {
    open: state.app.Authentication.drawer
  };
}
export default injectIntl(connect(mapStateToProps)(MyDrawer));