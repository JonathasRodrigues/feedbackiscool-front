import React from 'react';
import { Form, Row, Icon, Input, Button, notification, Col } from 'antd';
import { login, drawer } from 'store/Authentication/actions';
import { SERVER_URL } from 'settings';
import './index.css';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component<any, any> {
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
  }

  loginOnGoogle = () => {
    window.location.href = `${SERVER_URL}/auth/google`;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { authentication } = this.state;
    const { intl } = this.props;
    return (
      <div className={'formLogin'}>
        {/* <h2><FormattedMessage id='login' defaultMessage='Faça seu login'/></h2> */}
        <Row>
           <Col span={24}>
            <Button onClick={this.loginOnFacebook} size={'large'} icon='facebook' type='primary' className={'bt-facebook'}>
              <FormattedMessage id='loginWith' defaultMessage='Entrar com {name}' values={{ name: 'Facebook'}} />
            </Button>
          </Col>
           <Col span={24} style={{ paddingTop: '2%'}}>
            <Button onClick={this.loginOnGoogle} size={'large'} icon='google' type='primary' className={'bt-google'}>
              <FormattedMessage id='loginWith' defaultMessage='Entrar com {name}' values={{ name: 'Google'}} />
            </Button>
          </Col>
           <Col span={24} style={{ paddingTop: '2%'}}>
            <Button disabled={this.state.email} onClick={this.onActiveEmail} size={'large'} icon='mail' type='primary' className={'bt-email'}>
              <FormattedMessage id='loginWith' defaultMessage='Entrar com {name}' values={{ name: 'E-mail'}} />
            </Button>
          </Col>
        </Row>
         {this.state.email &&
          <div>
            <Form onSubmit={this.handleSubmit} layout={'horizontal'}>
              <FormItem label={'E-mail'} colon={false}>
                {getFieldDecorator('email',{
                  rules: [
                    { type: 'email', message: intl.formatMessage({ id: 'emailInvalid', defaultMessage: 'Por favor insira um email válido' })},
                    { required: true, message: intl.formatMessage({ id: 'emailMessage', defaultMessage: 'Por favor informe seu email' })} ],
                })(
                  <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={intl.formatMessage({ id: 'email', defaultMessage: 'Seu email cadastrado' })} />
                )}
              </FormItem>
              <FormItem label={intl.formatMessage({ id: 'password', defaultMessage: 'Senha' })} colon={false}>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: intl.formatMessage({ id: 'passwordMessage', defaultMessage: 'Por favor informe sua senha' })}],
                })(
                  <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder={intl.formatMessage({ id: 'password', defaultMessage: 'Sua senha' })} />
                )}
              </FormItem>
              <FormItem className={'paddingTop'}>
                <Button loading={authentication} icon={'email'} size='large' type='primary' style={{ width: '100%'}} htmlType='submit'>
                  <FormattedMessage id='login' defaultMessage='Entrar'/>
                </Button>
              </FormItem>
            </Form>
          </div>
        }
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

function mapStateToProps(state: any, ownProps: any) {
  return {
  };
}

export default injectIntl(connect(mapStateToProps)(WrappedNormalLoginForm));