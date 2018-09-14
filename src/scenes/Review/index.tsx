import { Form, Col, Row, Select, Rate, Divider, Radio, Input, Button, InputNumber, DatePicker, Switch, notification } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as ListCities } from 'store/City/actions';
import { list as ListSchool, findById } from 'store/School/actions';
import { insert as insertReview } from'store/Review/actions';
import './index.css';
import { withRouter } from 'react-router';
//const dataSource2 = ['Irlanda'];

const reviews = [
  { label: 'Localização', field: 'localization' },
  { label: 'Estrutura', field: 'structure' },
  { label: 'Professores', field: 'teachers' },
  { label: 'Funciónarios', field: 'staff' },
  { label: 'Método de ensino', field: 'teachingMethod' }
];

class Home extends Component<any,any> {
  constructor(props: any) {
    super(props);
    this.props.dispatch(ListCities());
    const { id } = this.props.match.params;
    if (id) {
      (async() => {
        try {
          await this.props.dispatch(findById(id));
          await this.props.dispatch(ListSchool(this.props.school.cityId));
          this.props.form.setFieldsValue({ cityId: this.props.school.cityId, schoolId: id });
        } catch (error) {
          console.log(error);
        }
      })();
    }
    this.state = {
      student : true
    };
  }
  onSelectedCity = (item: any) => {
    this.props.dispatch(ListSchool(item));
    this.setState({ city : item });
  }
  onSelectType = (value: boolean) => {
    this.setState({ student: value });
  }
  onRecommend = (value: boolean) => {
    this.setState({ recommend: value });
  }
  handleSubmitStudent = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        (async () => {
          try {
            let review = values;
            review.userId = localStorage.getItem('id');
            await this.props.dispatch(insertReview(values));
            notification.success({
              message: 'Sucesso',
              description: 'Obrigado por ajudar com sua avaliação.',
            });
            this.props.history.push('/');
          } catch(error) {
            notification.error({
              message: 'Erro',
              description: error,
            });
          }
        })();
      }
    });
  }
  handleSubmitProspect = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    //const filter = (inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
    const { cities, schools, isLoadingSchools, isLoadingCities } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const isStudent = (
      <Form onSubmit={this.handleSubmitStudent}>
      <Row gutter={8}>
        <Col md={24} xs={24} >
          <Form.Item hasFeedback validateStatus={isLoadingCities ? 'validating': null} colon={false} label={'Selecione a cidade da escola que você esta estudando ou estudou'}>
            {getFieldDecorator('cityId', {
              rules: [{
                required: true, message: 'Por favor escolha uma cidade',
              }],
            })(
              <Select
                showSearch
                placeholder='Selecione a cidade'
                optionFilterProp='children'
                onChange={this.onSelectedCity}
                filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {(cities && cities && cities.length > 0)
                  ? cities.map((item: any) => (
                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                  ))
                  : null}
              </Select>
            )}
            </Form.Item>
          </Col>
          {/* <Col md={8} xs={24}>
            <Form.Item>
              <AutoComplete
                disabled={true}
                defaultValue={'Irlanda'}
                dataSource={dataSource2}
                placeholder='Selecione um país'
                filterOption={filter}
              />
            </Form.Item>
          </Col> */}
        </Row>
        { getFieldValue('cityId') &&
          <Row>
            <Col md={24} xs={24} >
              <Form.Item hasFeedback validateStatus={isLoadingSchools ? 'validating': null} colon={false} label={'Selecione a escola que você esta estudando ou estudou'}>
                {getFieldDecorator('schoolId', {
                  rules: [{
                    required: true, message: 'Por favor selecione uma escola',
                  }]
                })(
                  <Select
                    showSearch
                    placeholder='Selecione a escola'
                    optionFilterProp='children'
                    filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {(schools && schools && schools.length > 0)
                      ? schools.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                      ))
                      : null}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        }
        {/* { getFieldValue('schoolId') && */}
        <div>
          <Row gutter={8}>
            <Col md={18} xs={24} >
              <Form.Item colon={false} label={'Qual o tipo de curso'}>
              {getFieldDecorator('course', {
                rules: [{
                  required: true, message: 'Por favor selecione um tipo de curso',
                }],
              })(
                <Select
                  placeholder='Selecione o tipo de curso'>
                    <Select.Option value={'GE'}>{'General english'}</Select.Option>
                    <Select.Option value={'TP'}>{'Preparatório para teste trinity (IELTS, PET, etc.)'}</Select.Option>
                 </Select>
              )}
              </Form.Item>
            </Col>
            <Col md={6} xs={24} >
              <Form.Item colon={false} label={'Qtd. de semanas'}>
                {getFieldDecorator('weeks', {
                  rules: [{
                    required: true, message: 'Por favor preencha o campo quantidade de semanas',
                  }],
                })(
                  <InputNumber min={1} style={{ width: '100%' }} placeholder={'Ex: 25'} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} xs={24} >
              <Form.Item colon={false} label={'Quando você começou o curso'} extra={'Não lembra o mês? Não tem problema! Coloque um mês próximo que você acha que começou o curso.'}>
              {getFieldDecorator('startDate', {
                rules: [{
                  required: true, message: 'Por favor preencha o campo data que começou o curso',
                }],
              })(
                <DatePicker.MonthPicker format={'MMMM/YYYY'} placeholder='Selecione o mês e ano' style={{ width: '100%' }}/>
              )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={'Qual é o seu grau de satisfação geral?'}>
                {getFieldDecorator('generalPoints', {
                  rules: [{
                    required: true, message: 'Por favor preencha o campo satisfação geral',
                  }],
                })(
                  <Rate style={{ fontSize: '20px'}} allowClear={false} allowHalf />
                )}
                {getFieldValue('generalPoints')}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={'Pontos positivos'} extra={'Mínimo de 140 caracteres'}>
                {getFieldDecorator('pros', {
                  rules: [{
                    required: true, message: 'Por favor preencha o campo pontos positivos',
                  }],
                })(
                  <Input.TextArea placeholder={'Reconheça o que é legal na escola'} autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item colon={false} label={'Pontos negativos'} extra={'Mínimo de 140 caracteres'}>
                {getFieldDecorator('contras', {
                  rules: [{
                    required: true, message: 'Por favor preencha o campo pontos negativos',
                  }],
                })(
                  <Input.TextArea placeholder={'Explique de maneira construtiva'} autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item colon={false} label={'Título da avaliação'}>
                {getFieldDecorator('title', {
                  rules: [{
                    required: true, message: 'Por favor preencha o campo título da avaliação',
                  }],
                })(
                  <Input placeholder={'Uma frase, resuma sua avaliação'} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <span>Qual a sua satisfação quanto a:</span>
          <Row>
            {reviews.map((item: any) => (
              <Col span={24}>
                <Form.Item colon={false} labelCol={{ xs: {span: 12 }, md:{ span: 12 } }} label={item.label}>
                  {getFieldDecorator(`${item.field}Points`, {
                    rules: [{
                      required: true, message: `Por favor preencha o campo ${item.label}`,
                    }],
                  })(
                    <Rate allowClear={false} allowHalf />
                  )}
                  {getFieldValue(`${item.field}Points`)}
                </Form.Item>
              </Col>
            ))}
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={'Recomendaria essa escola ?'}>
              {getFieldDecorator('recommend', {
                  rules: [{
                    required: true, message: 'Por favor preencha o campo Recomendaria essa escola',
                  }],
                })(
                  <Radio.Group defaultValue={true} onChange={(e) => this.onRecommend(e.target.value)}>
                    <Radio value={true}>Sim</Radio>
                    <Radio value={false}>Não</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={'Conselho para diretoria'} extra={'(Opcional)'}>
              {getFieldDecorator('advise', {
                })(
                  <Input.TextArea placeholder={'Suas dicas para melhorar a escola'} autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} xs={24} >
                <Form.Item colon={false} label={'Deseja que apareça seu nome no feedback ?'} extra={'Acreditamos que quanto mais informações no seu feedback melhor é a integridade da informação mas se não deseja que seu nome apareça no feedback não tem problema.'}>
                  {getFieldDecorator('anonymous', { valuePropName: 'checked' })(
                    <Switch checkedChildren='Sim' unCheckedChildren='Não' />
                  )}
                </Form.Item>
              </Col>
            </Row>
          <Row>
            <Col span={24}>
              <Button type='primary' size='large' style={{ width: '100%' }} htmlType='submit'>Enviar avaliação</Button>
            </Col>
          </Row>
        </div>
      {/* } */}
      </Form>
    );

    const isProspect = (
      <Form onSubmit={this.handleSubmitProspect}>
        <Row gutter={8}>
          <Col md={24} xs={24} >
            <Form.Item colon={false} label={'Selecione as cidades que você tem interesse em fazer intercâmbio'}>
              {getFieldDecorator('cityId', {
                  rules: [{
                    required: true, message: 'Por favor selecione uma cidade',
                  }],
                })(
                  <Select
                    showSearch
                    mode='multiple'
                    placeholder='Selecione a cidade'
                    optionFilterProp='children'
                    onChange={this.onSelectedCity}
                    filterOption={(input, option) => String(option.props.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {(cities && cities && cities.length > 0)
                      ? cities.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                      ))
                      : null}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col md={18} xs={24} >
              <Form.Item colon={false} label={'Qual o tipo de curso'}>
                {getFieldDecorator('course', {
                  rules: [{
                    required: true, message: 'Por favor selecione um curso',
                  }],
                })(
                  <Select
                    placeholder='Selecione o tipo de curso'>
                      <Select.Option value={'IDK'}>{'Não sei, estou pensando'}</Select.Option>
                      <Select.Option value={'GE'}>{'General english'}</Select.Option>
                      <Select.Option value={'TP'}>{'Preparatório para exame trinity (IELTS, Cambridge, etc.)'}</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col md={6} xs={24} >
              <Form.Item colon={false} label={'Qtd. de semanas'}>
              {getFieldDecorator('weeks', {
                  rules: [{
                    required: true, message: 'Por favor informe a qunatidade de semanas',
                  }],
                })(
                  <InputNumber min={1} style={{ width: '100%' }} placeholder={'Ex: 25'} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} xs={24} >
              <Form.Item colon={false} label={'Quando você deseja começar o curso'} extra={'Não faz ideia do mês? Não tem problema! Coloque um mês próximo que você deseja começar.'}>
                {getFieldDecorator('startDate', {
                  rules: [{
                    required: true, message: 'Por favor selecione uma data que você pretende começar seu curso',
                  }],
                })(
                  <DatePicker.MonthPicker format={'MMMM/YYYY'} placeholder='Selecione o mês e ano' style={{ width: '100%' }}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button type='primary' size='large' style={{ width: '100%' }} htmlType='submit'>Enviar interesse</Button>
            </Col>
          </Row>
        </Form>
    );
    return (
      <div className={'with-padding'}>
        <Row type='flex'>
          <Col md={{ span: 13, order: 1 }} xs={{ span: 24, order: 2}} className={'form-review'}>
            <h2> Avalie uma escola ou adicione um interesse para acessar todo conteúdo de avaliações</h2>
            <Divider />
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Radio.Group buttonStyle='solid' defaultValue={true} onChange={(e) => this.onSelectType(e.target.value)}>
                    <Radio.Button value={true}>Sou estudante / Ex-estudante</Radio.Button>
                    <Radio.Button value={false}>Quero fazer intercâmbio (futuro estudante)</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
              {this.state.student ? isStudent : isProspect}
          </Col>
          <Col md={{ span: 10, offset: 1, order: 2}} xs={{ span: 24, order: 1}} className={'tips'}>
            <Row>
              <Col span={24}>
                <h2> Faça parte da comunidade e ajude futuros estudantes a escolherem a melhor escola para um intercâmbio</h2>
              </Col>
              <Col span={24}>
                <span>Somos uma comunidade de estudantes onde você descobre o histórico de preços e a satisfação dos estudantes em cada escola.</span>
              </Col>
              <Col span={24}>
                 <span> O acesso a todo o conteúdo é gratuito,<br />
                  mas pedimos que você contribua com a comunidade fornecendo sua colaboração para ter acesso ilimitado a opiniões e históricos de preços oferecidos em todas as escolas.</span>
              </Col>
            </Row>
           <br/>
            <Row>
              <Col span={24}>
                <h3>Lembre-se</h3>
              </Col>
              <Col span={24}>
                <span>Somos uma plataforma séria, sempre faça seu feedback com seu verdadeiro ponto de vista e <b>não</b> usar comentários inapropriados como xingamentos ou coisas do gênero, nossa equipe sempre estará monitorando os feedbacks, aliás nosso principal objetivo é ajudar futuros estudantes a conhecer melhor as escolas. Se algum feedback quebrar as regras ele será brevemente bloqueado e o usuário será informado ou se depender o feedback poderá ser excluído da nossa base.</span>
              </Col>
              <Col span={24}>
                 <span> O acesso a todo o conteúdo é gratuito,<br />
                  mas pedimos que você contribua com a comunidade fornecendo sua colaboração para ter acesso ilimitado a opiniões e históricos de preços oferecidos em todas as escolas.</span>
              </Col>
            </Row>
          </Col>
          </Row>
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    city: state.app.City.selected,
    cities: state.app.City.list.data,
    schools: state.app.School.list.data,
    school: state.app.School.findById.data,
    isLoadingCities: state.app.City.list.isFetching,
    isLoadingSchools: state.app.School.list.isFetching
  };
}
const FormHome = Form.create()(Home);
export default withRouter(connect(mapStateToProps)((FormHome)));
