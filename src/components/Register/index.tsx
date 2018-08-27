import React from 'react';
import { Form, Row, Col, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class RegisterForm extends React.Component< any, any> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Row>
        <Col span={24}>
            <FormItem label={'Nome'}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Por favor informe seu nome completo' }],
              })(
                <Input type='email' placeholder={'Informe seu nome completo'} />
              )}
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label={'E-mail'}>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Por favor informe seu email' }],
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
                rules: [{ required: true, message: 'Por favor informe sua senha' }],
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
                <Checkbox>Quero receber ofertas e dicas para intercâmbio</Checkbox>
              )}
            </FormItem>
          </Col>
          {/* <Col span={24}>
            <a  href=''>Esqueci minha senha</a>
          </Col> */}
          <Col span={24}>
            <Button type='primary' style={{ width: '100%'}} htmlType='submit'>
                Cadastrar
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

const Register = Form.create()(RegisterForm);

export default Register;