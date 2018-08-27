import { AutoComplete, Button, Col, Form, Row } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as ListCities, selected } from 'store/City/actions';
import { list as ListSchool } from 'store/School/actions';
import './index.css';

const dataSource2 = ['Irlanda'];

class Search extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.props.dispatch(ListCities());
    this.state = {
      selected: null
    };
  }

  onSelected = (item: any) => {
    this.setState({ selected : item });
  }
  onOk = () => {
    this.props.dispatch(selected(this.state.selected));
    this.props.dispatch(ListSchool(this.state.selected.id));
  }
  render() {
    const filter = (inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
    const { cities } = this.props;
    return (
      <div className='search-form'>
        <Form>
          <Row>
            <h2> Encontre a melhor escola para seu intercâmbio</h2>
          </Row>
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item>
                <AutoComplete size='large'
                  dataSource={(cities && cities.data && cities.data.length > 0) ? cities.data.map((item: any) => item.name) : null}
                  placeholder='Selecione uma cidade'
                  filterOption={filter}
                  onSelect={(item) => this.onSelected(cities.data.filter((it: any) => it.name === item)[0])}
                />
              </Form.Item>
            </Col>
            <Col md={6} xs={24}>
              <Form.Item>
              <AutoComplete size='large'
                disabled={true}
                defaultValue={'Irlanda'}
                dataSource={dataSource2}
                placeholder='Selecione um país'
                filterOption={filter}
              />
              </Form.Item>
            </Col>
            <Col md={6} xs={24}>
              <Form.Item>
                <Button onClick={this.onOk} size='large' type='primary' style={{ width: '100%'}} icon='search'>Buscar</Button>
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
    cities: state.app.City.list
  };
}
export default connect(mapStateToProps)(Search);