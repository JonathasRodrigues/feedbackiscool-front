import React from 'react';
import { Form, Row, Icon, Input, Button, notification } from 'antd';
import { login, drawer } from 'store/Authentication/actions';
import { SERVER_URL } from 'settings';
import './index.css';
import { connect } from 'react-redux';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component< any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: false,
      authentication: false,
    };
  }
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.setState({ authentication: true });
        (async () => {
          try {
            await this.props.dispatch(login(values.email, values.password));
            this.props.dispatch(drawer(false));
            this.setState({ authentication: false });
            // notification.success({
            //   message: '',
            //   description: 'Olá seja bem vindo!',
            // });
          } catch (error) {
            this.setState({ authentication: false });
            notification.error({
              message: 'Ops',
              description: 'Email e ou senha inválidos',
            });
          }
        })();
      } else {
        console.log(values);
      }
    });
  }

  onActiveEmail = () => {
    this.setState({ email: true });
  }

  loginOnFacebook = () => {
    window.location.href = `${SERVER_URL}/auth/facebook`;
    //this.props.dispatch(loginFacebook());
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { authentication } = this.state;
    return (
      <div>
        <br />
        <h2 style={{ textAlign: 'center' }}> Faça seu login </h2>
        <Row>
          {/* <Col span={24} style={{ paddingTop: '2%'}}>
            <Button onClick={this.loginOnFacebook} size={'large'} icon='facebook' type='primary' className={'bt-facebook'}>
                  Entrar com Facebook
              </Button>
          </Col> */}
          {/* <Col span={24} style={{ paddingTop: '2%'}}>
            <Button size={'large'} icon='google' type='primary' className={'bt-google'}>
                Entrar com Google
            </Button>
          </Col> */}
          {/* <Col span={24} style={{ paddingTop: '2%'}}>
            <Button onClick={this.onActiveEmail} size={'large'} icon='mail' type='primary' className={'bt-email'}>
                Entrar com E-mail
            </Button>
          </Col> */}
        </Row>
        {/* {this.state.email && */}
          <div>
            <Form onSubmit={this.handleSubmit} layout={'horizontal'}>
              <FormItem label={'E-mail'} colon={false}>
                {getFieldDecorator('email',{
                  rules: [
                    { type: 'email', message: 'Por favor insira um email válido' },
                    { required: true, message: 'Por favor informe seu email' }],
                })(
                  <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Seu email cadastrado' />
                )}
              </FormItem>
              <FormItem label={'Senha'} colon={false}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Por favor informe sua senha' }],
                })(
                  <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Sua senha' />
                )}
              </FormItem>
              <FormItem>
                <Button loading={authentication} icon={'email'} size='large' type='primary' style={{ width: '100%'}} htmlType='submit'>
                    Entrar
                </Button>
              </FormItem>
            </Form>
          </div>
        {/* } */}
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default connect()(WrappedNormalLoginForm);