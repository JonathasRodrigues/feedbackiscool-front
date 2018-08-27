import React from 'react';
import { Form, Input, Button, Row, Col, AutoComplete, notification, Table } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { logComponentError } from 'errors/errorHandler';
import { connect, DispatchProp } from 'react-redux';
import { list as ListCities } from 'store/City/actions';
import { list as ListSchool } from 'store/School/actions';
import { insert } from 'store/School/actions';
import './index.css';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

interface IProps extends FormComponentProps, DispatchProp<any> {
  cities?: any;
  schools?: any;
}

interface IStates {
  cityId: any;
}

class School extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);
    this.props.dispatch(ListCities());
    this.props.dispatch(ListSchool());
  }
  componentDidCatch(error: any, info: any) {
    logComponentError(error);
  }
  onSelect = (item: any) =>{
    this.setState({ cityId: item.id });
  }
  openNotificationWithIcon = (type: any, title: any, msg: any) => {
    notification[type]({
      message: title,
      description: msg,
    });
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.cityId) {
        values.cityId = this.state.cityId;
        console.log('Received values of form: ', values);
        (async () => {
          try {
            await this.props.dispatch(insert(values));
            this.openNotificationWithIcon('success', 'Eba!', `Escola cadastrada com sucesso!`);
            this.props.form.resetFields;
          } catch(error) {
            this.openNotificationWithIcon('error', 'Ops!', error);
          }
        })();
      }
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { cities, schools } = this.props;
    const filter = (inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
    return(
      <Row gutter={16}>
        <Col md={{ span: 12, offset: 6 }} xs={24}>
            <div className='school-form'>
              <h2> Cadastrar nova escola </h2>
              <Form onSubmit={this.handleSubmit}>
                <Form.Item label={'Cidade'}>
                {getFieldDecorator('cityId', {
                    rules: [ {
                      required: true, message: 'Por favor selecione uma cidade',
                    }],
                  })(
                    <AutoComplete
                    dataSource={(cities && cities.data && cities.data.length > 0) ? cities.data.map((item: any) => item.name) : null}
                    placeholder='Selecione uma cidade'
                    filterOption={filter}
                    onSelect={(item) => this.onSelect(cities.data.filter((it: any) => it.name === item)[0])}
                  />
                  )}
                </Form.Item>
                <Form.Item label={'Nome da escola'}>
                  {getFieldDecorator('name', {
                    rules: [ {
                      required: true, message: 'Por favor coloque um nome',
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item label={'Endereço'}>
                  {getFieldDecorator('address', {
                    rules: [ {
                      required: true, message: 'Por favor coloque o endereço',
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                 <a target='__blank' href='https://www.gps-coordinates.net/'> Para pesquisar Longitude e Latitude clique aqui</a>
                <Form.Item label={'Longitude'}>
                  {getFieldDecorator('longitude', {
                    rules: [ {
                      required: true, message: 'Por favor coloque a logitude',
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item label={'Latitude'}>
                  {getFieldDecorator('latitude', {
                    rules: [ {
                      required: true, message: 'Por favor coloque a latitude',
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item label={'Telefone'}>
                {getFieldDecorator('phone', {
                    rules: [ {
                      required: false, message: 'Por favor coloque o telefone',
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item label={'E-mail'}>
                  {getFieldDecorator('email', {
                    rules: [ {
                      required: false, message: 'Por favor coloque o email',
                    }],
                  })(
                    <Input />
                  )}
                </Form.Item>
                <Form.Item label={'Site'}>
                  {getFieldDecorator('site', {
                    rules: [ {
                      required: false, message: 'Por favor coloque o site',
                    }],
                  })(
                    <Input addonBefore={'http://www.'} />
                  )}
                </Form.Item>
                <Form.Item label={'Facebook'}>
                  {getFieldDecorator('facebook', {
                    rules: [ {
                      required: false, message: 'Por favor coloque o facebook',
                    }],
                  })(
                    <Input addonBefore={'facebook.com/'} />
                  )}
                </Form.Item>
                <Form.Item label={'Instagram'}>
                  {getFieldDecorator('instagram', {
                    rules: [ {
                      required: false, message: 'Por favor coloque o instagram',
                    }],
                  })(
                    <Input addonBefore={'instagram.com/'} />
                  )}
                </Form.Item>
                <Button htmlType='submit' type='primary'> Salvar </Button>
                </Form>
            </div>
            </Col>
            <Col className={'with-padding'} span={24}>
              <Table style={{ background: '#fff' }} dataSource={schools} columns={columns} />
            </Col>
          </Row>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    cities: state.app.City.list,
    schools: state.app.School.list.data
  };
}

const WrappedLoginForm = Form.create()(School);
export default connect(mapStateToProps)(WrappedLoginForm);