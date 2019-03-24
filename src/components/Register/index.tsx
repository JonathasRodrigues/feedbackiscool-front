import React from 'react';
import { Form, Row, Col, Input, Button, notification, Icon, Select, Checkbox } from 'antd';
import { register, login, drawer } from 'store/Authentication/actions';
import { canAccessContent } from 'store/Profile/actions';
import { connect } from 'react-redux';
import { SERVER_URL } from 'settings';
import { FormattedMessage, injectIntl } from 'react-intl';
import './index.css';

const FormItem = Form.Item;

class RegisterForm extends React.Component< any, any> {
  state = {
    register: false,
    email: false
  };
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.setState({ register: true });
        (async () => {
          try {
            await this.props.dispatch(register(values));
            await this.props.dispatch(login(values.email, values.password));
            await this.setState({ register: false });
            await this.props.dispatch(drawer(false));
            const userId = localStorage.getItem('id');
            await this.props.dispatch(canAccessContent(userId));
            if (!this.props.hasAccess) {
              this.props.dispatch({ type: 'MODAL_WELCOME_OPEN' });
            }
          } catch (error) {
            this.setState({ register: false });
            notification.error({
              message: 'Ops',
              description: 'Por favor informe corretamente os campos',
            });
          }
        })();
      }
    });
  }

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback(this.props.intl.formatMessage({ id: 'passwordConfirmMessage', defaultMessage: 'As senhas não são iguais!'}));
    } else {
      callback();
    }
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
    const { register } = this.state;
    const { intl } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={'formRegister'}>
        {/* <h2> Cadastrar-se </h2> */}
        <Row>
           <Col span={24}>
            <Button onClick={this.loginOnFacebook} size={'large'} icon='facebook' type='primary' className={'bt-facebook'}>
              <FormattedMessage id='registerWith' defaultMessage='Cadastrar-se com {name}' values={{ name: 'Facebook'}} />
              </Button>
          </Col>
           <Col span={24} style={{ paddingTop: '2%'}}>
            <Button onClick={this.loginOnGoogle}  size={'large'} icon='google' type='primary' className={'bt-google'}>
              <FormattedMessage id='registerWith' defaultMessage='Cadastrar-se com {name}' values={{ name: 'Google'}} />
            </Button>
          </Col>
           <Col span={24} style={{ paddingTop: '2%'}}>
            <Button disabled={this.state.email} onClick={this.onActiveEmail} size={'large'} icon='mail' type='primary' className={'bt-email'}>
              <FormattedMessage id='registerWith' defaultMessage='Cadastrar-se com {name}' values={{ name: 'E-mail'}} />
            </Button>
          </Col>
        </Row>
        {this.state.email &&
          <Row>
            <Col span={24}>
                <FormItem label={intl.formatMessage({ id: 'fullName', defaultMessage: 'Nome completo' })}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: intl.formatMessage({ id: 'fullNameMessage', defaultMessage: 'Por favor informe seu nome completo' })}],
                  })(
                    <Input prefix={<Icon type='smile' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={intl.formatMessage({ id: 'fullName', defaultMessage: 'Informe seu nome completo' })} />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={'E-mail'}>
                  {getFieldDecorator('email', {
                    rules: [
                      { type: 'email', message: intl.formatMessage({ id: 'emailInvalid', defaultMessage: 'Por favor insira um email válido' })},
                      { required: true, message: intl.formatMessage({ id: 'emailMessage', defaultMessage: 'Por favor informe seu email' })} ],
                  })(
                    <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} type='email' placeholder={intl.formatMessage({ id: 'email', defaultMessage: 'Informe um e-mail válido' })} />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={intl.formatMessage({ id: 'password', defaultMessage: 'Senha' })}>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: intl.formatMessage({ id: 'passwordMessage', defaultMessage: 'Por favor informe sua senha' })},
                            { min: 7, message: intl.formatMessage({ id: 'passwordMin', defaultMessage: 'A senha deve conter pelo menos 7 caracteres' })}],
                  })(
                    <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder={intl.formatMessage({ id: 'password', defaultMessage: 'Senha' })} />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={intl.formatMessage({ id: 'passwordConfirm', defaultMessage: 'Confirme sua senha' })}>
                  {getFieldDecorator('password2', {
                    rules: [{ required: true, message: intl.formatMessage({ id: 'passwordMessage', defaultMessage: 'Por favor confirme sua senha' })},
                    {
                      validator: this.compareToFirstPassword,
                    }],
                  })(
                    <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder={intl.formatMessage({ id: 'passwordConfirm', defaultMessage: 'Confirme sua senha' })} />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={intl.formatMessage({ id: 'country', defaultMessage: 'País de origem' })}>
                {getFieldDecorator('country', {
                    rules: [{ required: true, message: intl.formatMessage({ id: 'countryMessage', defaultMessage: 'Selecione seu país de origem' })},
                  ],
                  })(
                    <Select showSearch optionFilterProp='children' filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0} labelInValue placeholder={intl.formatMessage({ id: 'countryMessage', defaultMessage: 'Selecione seu país de origem' })}>
                      {Array.isArray(this.props.countries) && this.props.countries.map(( country: any, index: any) => (
                        <Select.Option key={index} value={country.code}>{country.name} ({country.code})</Select.Option>
                      ))}
                  </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                    rules: [{ required: true, message: intl.formatMessage({ id: 'countryMessage', defaultMessage: 'Selecione seu país de origem' })}]
                  })(
                    <Checkbox disabled={true}><FormattedMessage id='accept' defaultMessage='Eu concordo com os '/><a target='_blank' href='https://termsandconditionsgenerator.com/live.php?token=rvvZf0uxjJRlfW1LByiWKKcaEaxZiPnw'><FormattedMessage id='termsConditions' defaultMessage='Termos e Condições' /></a></Checkbox>
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem className={'paddingTop'}>
                  <Button loading={register} type='primary' style={{ width: '100%'}} htmlType='submit'>
                    <FormattedMessage id='register' defaultMessage='Cadastrar' />
                  </Button>
                </FormItem>
              </Col>
          </Row>
        }
      </Form>
    );
  }
}

const Register = Form.create()(RegisterForm);

function mapStateToProps(state: any, ownProps: any) {
  return {
    countries: state.app.Helpers.countries,
    hasAccess: state.app.Profile.hasAccess,
  };
}

export default injectIntl(connect(mapStateToProps)(Register));