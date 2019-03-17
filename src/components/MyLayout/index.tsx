import React from 'react';
import { Layout, Badge, Avatar, Dropdown, Menu, Row, Col, Divider, Icon, Button } from 'antd';
const { Content, Header, Footer } = Layout;
import MyDrawer from 'components/Drawer';
import { connect, DispatchProp } from 'react-redux';
import { drawer, logout } from 'store/Authentication/actions';
import { Link } from 'react-router-dom';
import { APP_NAME, FB_URL, INST_URL } from 'settings';
import logo from 'assets/images/logo.jpg';
import './index.css';
import { FormattedMessage } from 'react-intl';

interface IProps extends DispatchProp<any> {
  open: boolean;
  isAuthenticated: boolean;
  currentLanguage: any;
  languages: any;
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

  changeLanguage = (newLanguage: any) => {
    this.props.dispatch({ type: 'CHANGE_CURRENT_LANGUAGE', newLanguage });
  }

  componentDidCatch(error: any, info: any) {
    console.log(error);
  }
  render(){
    const menu = (
      <Menu>
      {/* <Menu.Item>
        <Link to='/profile'> Meu Perfil </Link>
      </Menu.Item> */}
        <Menu.Item>
          <Link to='/review'><FormattedMessage id={'searchButton'} defaultMessage={'Avaliar uma escola'}/> </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a onClick={this.logout}> <FormattedMessage id={'logout'} defaultMessage={'Sair'}/></a>
        </Menu.Item>
      </Menu>
    );
    const menuLanguages = (
      <Menu className={'menuLanguages'}>
        {Array.isArray(this.props.languages) && this.props.languages.map((language: any) => {
          if (language.locale === this.props.currentLanguage.locale) {
             return null;
          } else {
            return (
              <Menu.Item key={`language-${language.lg}`} onClick={() => this.changeLanguage(language)}>
                <img className={'brand'} src={`brands/${language.locale}.svg`} />
                <FormattedMessage id={`language${language.locale}`} defaultMessage={language.lg}/>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
    return(
      <Layout>
        <Header className={'my-header'}>
          <Link to='/'>
          <img className='logo' src={logo} />
          </Link>
            <Dropdown trigger={['hover']} overlay={menuLanguages} placement='bottomLeft'>
              <div className={'language'}>
                <img src={`brands/${this.props.currentLanguage.locale}.svg`} />
              </div>
            </Dropdown>
            {this.props.isAuthenticated ?
              (<Dropdown overlay={menu} placement='bottomRight'>
                <div className='user'>
                   <Badge count={0}><Avatar icon='user' /></Badge>
                </div>
                </Dropdown>
              )
              : (
                <div className='user'>
                  <a onClick={this.showDrawer}>
                    <Icon type='user' /> <FormattedMessage id={'login'} defaultMessage={'Entrar'}/>
                  </a>
                </div>)}
          <div className='bt-review'>
            <Col xs={0} md={24} lg={24}>
             <Link to='/review'><Button icon={'star'}><FormattedMessage id={'feedbackButton'} defaultMessage={'Avaliar uma escola'}/></Button></Link>
            </Col>
          </div>
        </Header>
        <Content className={'main'}>
          {this.props.children}
        </Content>
        <Footer className='footer'>
          <Row type='flex' justify='start'>
            <Col md={8} xs={24} className='footer_item'>
              <b>{APP_NAME}</b>
              <br />
              <span>{APP_NAME}<FormattedMessage id={'principle'} defaultMessage={'é uma plataforma que ajuda encontrar a escola ideal para você, avaliada por estudantes e ex-estudantes.'}/></span>
            </Col>
            <Col md={8} xs={24} className='footer_item'>
                <b>Links</b><br />
                <Link to='/'><FormattedMessage id={'home'} defaultMessage={'Página inicial'}/></Link><br />
                <Link to='/about'><FormattedMessage id={'about'} defaultMessage={'Sobre'}/></Link><br />
                <Link to='/review'><FormattedMessage id={'searchButton'} defaultMessage={'Avaliar uma escola'}/></Link><br />
            </Col>
            <Col md={8} xs={24} className='footer_item'>
              <b><FormattedMessage id={'socialMedia'} defaultMessage={'Redes Sociais'}/></b><br />
              <Icon type='facebook' /><a target='_blank' href={FB_URL}> Facebook</a><br />
              <Icon type='instagram' /><a target='_blank' href={INST_URL}> Instagram</a><br />
              {/*<Icon type='twitter' /><a> Twitter</a><br />*/}
            </Col>
          </Row>
          <Row>
            <Divider />
            <Col span={24} className={'final'}>
               © 2018 FEEDBACK IS COOL
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
    languages: state.app.Language.all,
    currentLanguage: state.app.Language.current
  };
}
export default connect(mapStateToProps)(MyLayout);