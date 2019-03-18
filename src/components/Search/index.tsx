import { AutoComplete, Button, Col, Form, Row, Input, Icon } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as ListCities, selected } from 'store/City/actions';
import { list as ListSchool } from 'store/School/actions';
import { withRouter } from 'react-router-dom';
import './index.css';
import { FormattedMessage } from 'react-intl';

const dataSource2 = ['Irlanda'];

class Search extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.props.dispatch(ListCities());
  }

  onSelected = (item: any) => {
    this.props.dispatch(selected(item));
  }
  onOk = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.props.selected) {
          this.props.dispatch(ListSchool(this.props.selected.id));
          this.props.history.push(`/result/${this.props.selected.id}`);
        }
      }
    });
  }
  render() {
    const filter = (inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
    const { cities } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='search-form'>
        <Form onSubmit={this.onOk}>
          <Row>
            <h2> <FormattedMessage id='searchMainText' defaultMessage='Encontre a melhor escola para seu intercâmbio' /> </h2>
          </Row>
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item>
              {getFieldDecorator('city', {
                  rules: [{ required: true, message: <FormattedMessage id='requiredCity' defaultMessage='Por favor informe uma cidade'/> }],
                })(
                <AutoComplete size='large'
                  dataSource={(cities && cities.data && cities.data.length > 0) ? cities.data.map((item: any) => item.name) : null}
                  placeholder={<FormattedMessage id='inputSearch' defaultMessage='Selecione uma cidade' />}
                  filterOption={filter}
                  value={this.props.selected}
                  onSelect={(item) => this.onSelected(cities.data.filter((it: any) => it.name === item)[0])}
                />
                )}
              </Form.Item>
            </Col>
            <Col md={6} xs={24}>
              <Form.Item>
              <AutoComplete size='large'
                disabled={true}
                defaultValue={' Irlanda'}
                dataSource={dataSource2}
                placeholder='Selecione um país'
                filterOption={filter}>
                <Input prefix={<Icon type='environment'/>} />
              </AutoComplete>
              </Form.Item>
            </Col>
            <Col md={6} xs={24}>
              <Form.Item>
                <Button size='large' type='primary' className={'buttonSearch'} icon='search' htmlType='submit'><FormattedMessage id='searchButton' defaultMessage='Buscar' /></Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    cities: state.app.City.list,
    selected: state.app.City.selected,
  };
}
const SearchForm = Form.create()(Search);

export default withRouter(connect(mapStateToProps)(SearchForm));
