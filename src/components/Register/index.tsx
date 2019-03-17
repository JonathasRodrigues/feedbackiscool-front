import React from 'react';
import { Form, Row, Col, Input, Button, notification, Checkbox } from 'antd';
import { register, login, drawer } from 'store/Authentication/actions';
import { connect } from 'react-redux';
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
            await notification.success({
              message: 'Sucesso',
              description: 'Registrado com sucesso, você será autenticado automaticamente',
            });
            await this.props.dispatch(login(values.email, values.password));
            this.setState({ register: false });
            this.props.dispatch(drawer(false));
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
      callback('As senhas não são iguais!');
    } else {
      callback();
    }
  }

  onActiveEmail = () => {
    this.setState({ email: true });
  }

  registerByFacebook = () => {
    //window.location.href = `${SERVER_URL}/auth/facebook`;
    //this.props.dispatch(loginFacebook());
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { register } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className={'formRegister'}>
        <h2> Cadastrar-se </h2>
        <Row>
           <Col span={24}>
            <Button onClick={this.registerByFacebook} size={'large'} icon='facebook' type='primary' className={'bt-facebook'}>
                  Registrar com Facebook
              </Button>
          </Col>
           <Col span={24} style={{ paddingTop: '2%'}}>
            <Button size={'large'} icon='google' type='primary' className={'bt-google'}>
                Registrar com Google
            </Button>
          </Col>
           <Col span={24} style={{ paddingTop: '2%'}}>
            <Button disabled={this.state.email} onClick={this.onActiveEmail} size={'large'} icon='mail' type='primary' className={'bt-email'}>
                Cadastrar-se com E-mail
            </Button>
          </Col>
        </Row>
        {this.state.email &&
          <Row>
            <Col span={24}>
                <FormItem label={'Nome'}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Por favor informe seu nome completo' }],
                  })(
                    <Input placeholder={'Informe seu nome completo'} />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={'E-mail'}>
                  {getFieldDecorator('email', {
                    rules: [
                      { type: 'email', message: 'Por favor insira um email válido' },
                      { required: true, message: 'Por favor informe seu email' }],
                  })(
                    <Input type='email' placeholder={'Informe um e-mail válido'} />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={'Senha'}>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Por favor informe sua senha' }],
                  })(
                    <Input type='password' placeholder='Informe sua senha' />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label={'Confirme sua senha'}>
                  {getFieldDecorator('password2', {
                    rules: [{ required: true, message: 'Por favor informe sua senha' },
                    {
                      validator: this.compareToFirstPassword,
                    }],
                  })(
                    <Input type='password' placeholder='Confirme sua senha' />
                  )}
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>Aceito os <a>termos</a></Checkbox>
                  )}
                </FormItem>
              </Col>
              <Col span={24} className={'paddindTop'}>
                <Button loading={register} type='primary' style={{ width: '100%'}} htmlType='submit'>
                    Cadastrar
                </Button>
              </Col>
          </Row>
        }
      </Form>
    );
  }
}

const Register = Form.create()(RegisterForm);

export default connect()(Register);