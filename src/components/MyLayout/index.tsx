import React from 'react';
import { Layout, Badge, Avatar, Dropdown, Menu, Row, Col, Divider, Icon } from 'antd';
const { Content, Header, Footer } = Layout;
import MyDrawer from 'components/Drawer';
import { connect, DispatchProp } from 'react-redux';
import { drawer, logout } from 'store/Authentication/actions';
import { Link } from 'react-router-dom';
import './index.css';

interface IProps extends DispatchProp<any> {
  open: boolean;
  isAuthenticated: boolean;
}

interface IStates {

}

class MyLayout extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
  }
  showDrawer = () => {
    this.props.dispatch(drawer(true));
  }

  logout = () => {
    this.props.dispatch(logout());
  }

  componentDidCatch(error: any, info: any) {
    console.log(error);
  }
  render(){
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to='/profile'> Meu Perfil </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a onClick={this.logout}> Sair </a>
        </Menu.Item>
      </Menu>
    );
    return(
      <Layout>
        <Header className={'my-header'}>
          <Link to='/' className='logo'>
          </Link>
          <div className='user'>
            { this.props.isAuthenticated ?
              (<Dropdown overlay={menu} placement='bottomRight'>
                   <span style={{ marginRight: 24 }}>
                    <Badge count={0}><Avatar icon='user' /></Badge>
                  </span>
                </Dropdown>)
              : (<a onClick={this.showDrawer} style={{ marginRight: 24 }}>
                <Icon type='user' /> Entrar
               </a>)}
          </div>
        </Header>
        <Content className={'main'}>
          {this.props.children}
        </Content>
        <Footer className='footer'>
          <Row type='flex' justify='start'>
            <Col md={8} xs={24}>
              <b>LOGO</b><br />
              <span>NOME DA APP é uma plataforma que ajuda encontrar a escola ideal para você, avaliada por estudantes e ex-estudantes.</span>
            </Col>
            <Col md={8} xs={24}>
                <b>Links</b><br />
                <Link to='/'>Página inicial</Link><br />
                <a>Sobre</a><br />
                <Link to='/review'>Avaliar uma escola</Link><br />
            </Col>
            <Col md={8} xs={24}>
              <b>Redes Sociais</b><br />
              <Icon type='facebook' /><a> Facebook</a><br />
              <Icon type='instagram' /><a> Instagram</a><br />
              <Icon type='twitter' /><a> Twitter</a><br />
            </Col>
          </Row>
          <Row>
            <Divider />
            <Col span={24}>
               © 2018 NOME DA APP
            </Col>
          </Row>
        </Footer>
        <MyDrawer />
      </Layout>
    );
  }
}
function mapStateToProps(state: any, ownProps: any) {
  return {
    open: state.app.Authentication.drawer,
    isAuthenticated: state.app.Authentication.authentication.isAuthenticated,
  };
}
export default connect(mapStateToProps)(MyLayout);