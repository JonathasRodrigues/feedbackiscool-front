import React, { Component } from 'react';
import { Drawer, Tabs } from 'antd';
import { connect, DispatchProp } from 'react-redux';
import { drawer } from 'store/Authentication/actions';
import Login from 'components/Login';
import Register from 'components/Register';
import './index.css';

const TabPane = Tabs.TabPane;

interface IProps extends DispatchProp<any> {
  open: boolean;
}

class MyDrawer extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }
  closeDrawer = () => {
    this.props.dispatch(drawer(false));
  }
  render() {
   return(
      <Drawer
      placement='right'
      onClose={this.closeDrawer}
      maskClosable={true}
      visible={this.props.open}
    >
    <Tabs defaultActiveKey='1'>
      <TabPane tab='Entrar' key='1'><Login /></TabPane>
      <TabPane tab='Cadastrar' key='2'><Register /></TabPane>
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
export default connect(mapStateToProps)(MyDrawer);