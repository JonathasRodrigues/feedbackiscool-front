import { Form, Col, Row, Select, Rate, Divider, Radio, Input, Button, InputNumber, DatePicker, Switch, notification } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { list as ListCities } from 'store/City/actions';
import { list as ListSchool, findById } from 'store/School/actions';
import { insert as insertReview, insertProspect } from 'store/Review/actions';
import { FormattedMessage } from 'react-intl';
import './index.css';
import { withRouter } from 'react-router';
//const dataSource2 = ['Irlanda'];

const reviews = [
  { label: 'Localização', field: 'localization' },
  { label: 'Estrutura', field: 'structure' },
  { label: 'Professores', field: 'teachers' },
  { label: 'Funciónarios', field: 'staff' },
  { label: 'Método de ensino', field: 'teachingMethod' },
  { label: 'Mix de nacionalidade', field: 'mixNacionality' },
];

class Home extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.props.dispatch(ListCities());
    const { id } = this.props.match.params;
    if (id) {
      (async () => {
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
      student: true
    };
  }
  onSelectedCity = (item: any) => {
    this.props.dispatch(ListSchool(item));
    this.setState({ city: item });
  }
  onSelectType = (value: boolean) => {
    this.setState({ student: value });
  }
  handleSubmitStudent = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        (async () => {
          try {
            let review = values;
            review.userId = localStorage.getItem('id');
            await this.props.dispatch(insertReview(review));
            notification.success({
              message: 'Sucesso',
              description: 'Obrigado por ajudar com sua avaliação.',
            });
            this.props.history.push('/');
          } catch (error) {
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
        (async () => {
          try {
            let prospect = values;
            prospect.userId = localStorage.getItem('id');
            await this.props.dispatch(insertProspect(prospect));
            notification.success({
              message: 'Sucesso',
              description: 'Obrigado por ajudar com suas informações.',
            });
            this.props.history.push('/');
          } catch (error) {
            notification.error({
              message: 'Erro',
              description: error,
            });
          }
        })();
      }
    });
  }
  render() {
    //const filter = (inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
    const { cities, schools, isLoadingSchools, isLoadingCities } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const studentRequired = this.state.student ? true : false;
    const prospectRequired = this.state.student ? false : true;

    const isStudent = (
      <Form onSubmit={this.handleSubmitStudent}>
        <Row gutter={8}>
          <Col md={24} xs={24} >
            <Form.Item hasFeedback validateStatus={isLoadingCities ? 'validating' : null} colon={false} label={<FormattedMessage id='formCityChoose' defaultMessage='Selecione a cidade da escola que você esta estudando ou estudou' />}>
              {getFieldDecorator('cityId', {
                rules: [{
                  required: studentRequired, message: 'Por favor escolha uma cidade',
                }],
              })(
                <Select
                  showSearch
                  placeholder={<FormattedMessage id='formCityPholder' defaultMessage='Selecione a cidade' />}
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
        {getFieldValue('cityId') &&
          <Row>
            <Col md={24} xs={24} >
              <Form.Item hasFeedback validateStatus={isLoadingSchools ? 'validating' : null} colon={false} label={'Selecione a escola que você esta estudando ou estudou'}>
                {getFieldDecorator('schoolId', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formSchoolChoose' defaultMessage='Por favor selecione uma escola'/>
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
              <Form.Item colon={false} label={<FormattedMessage id='formCursoLabel' defaultMessage='Qual o tipo do curso'/>}>
                {getFieldDecorator('course', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formCursoChoose' defaultMessage='Por favor selecione um tipo de curso'/>,
                  }],
                })(
                  <Select
                    placeholder={<FormattedMessage id='formCursoPlaceholder' defaultMessage='Selecione o tipo de curso'/>}>
                    <Select.Option value={'GE'}>{'General english'}</Select.Option>
                    <Select.Option value={'TP'}>{'Preparatório para teste trinity (IELTS, PET, etc.)'}</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col md={6} xs={24} >
              <Form.Item colon={false} label={<FormattedMessage id='formQtdSemanas' defaultMessage='Qtd. de semanas'/>}>
                {getFieldDecorator('weeks', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formCursodataChoose' defaultMessage='Por favor preencha o campo quantidade de semanas'/> ,
                  }],
                })(
                  <InputNumber min={1} style={{ width: '100%' }} placeholder={'Ex: 25'} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} xs={24} >
              <Form.Item colon={false} label={<FormattedMessage id='formCursodataChooseTitle' defaultMessage='Quando você começou o curso'/>} extra={<FormattedMessage id='formCursoDataMsg'defaultMessage='Não lembra o mês? Não tem problema! Coloque um mês próximo que você acha que começou o curso.'/>}>
                {getFieldDecorator('startDate', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formCursodataChoose' defaultMessage='Por favor preencha o campo data que começou o curso'/>,
                  }],
                })(
                  <DatePicker.MonthPicker format={'MMMM/YYYY'} placeholder='Selecione o mês e ano' style={{ width: '100%' }} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={<FormattedMessage id='formSatisfacaoChoose' defaultMessage='Qual é o seu grau de satisfação geral?'/>}>
                {getFieldDecorator('generalPoints', {
                  rules: [{
                    required: studentRequired, message:<FormattedMessage id='formSatisfacaoerr' defaultMessage='Por favor escolha uma nota de satisfação geral'/>,
                  }],
                })(
                  <Rate style={{ fontSize: '20px' }} allowClear={false} allowHalf />
                )}
                {getFieldValue('generalPoints')}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={<FormattedMessage id='formPontoPositivotitle' defaultMessage='Pontos positivos'/>} extra={<FormattedMessage id='formPontosExtra' defaultMessage='Minimo de 140 caracteres'/>}>
                {getFieldDecorator('pros', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formPontoPositivoErr1' defaultMessage='Por favor preencha o campo pontos positivos'/>
                  },
                  {
                    min: 140, message:<FormattedMessage id='formPontoPositivoErr2' defaultMessage='Por favor pontos positivos devem conter pelo menos 140 caracteres'/>
                  }],
                })(
                  <Input.TextArea placeholder={'Reconheça o que é legal na escola'} autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item colon={false} label={<FormattedMessage id='formPontoNegativotitle' defaultMessage='Pontos negativos'/>} extra={<FormattedMessage id='formPontosExtra' defaultMessage='Minimo de 140 caracteres'/>}>
                {getFieldDecorator('contras', {
                  rules: [{
                    required: studentRequired, message:<FormattedMessage id='formPontoNegativoErr1' defaultMessage='Por favor preencha o campo pontos negativos'/>
                  },
                  {
                    min: 140, message:<FormattedMessage id='formPontoNegativoErr2' defaultMessage='Por favor pontos negativos devem conter pelo menos 140 caracteres'/>
                  }],
                })(
                  <Input.TextArea placeholder={'Explique de maneira construtiva'} autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item colon={false} label={<FormattedMessage id='formTitleTitle' defaultMessage='Título da avaliação'/>}>
                {getFieldDecorator('title', {
                  rules: [{
                    required: studentRequired, message:<FormattedMessage id='formTitleTitleErr' defaultMessage='Por favor preencha o campo título da avaliação'/>,
                  }],
                })(
                  <Input placeholder={'Uma frase, resuma sua avaliação'} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <b><FormattedMessage id='formSatisfacaoTitle' defaultMessage='Qual sua satisfação quanto a:'/></b>
            </Col>
          </Row>
          < br />
          <Row type='flex' justify='start'>
            {reviews.map((item: any) => (
              <Col span={24}>
                <Col span={12}>
                  <span>{item.label}</span>
                </Col>
                <Col span={12}>
                  <Form.Item colon={false}>
                    {getFieldDecorator(`${item.field}Points`, {
                      rules: [{
                        required: studentRequired, message: `Por favor dê uma nota para ${item.label}`,
                      }],
                    })(
                      <Rate allowClear={false} allowHalf />
                    )}
                    {getFieldValue(`${item.field}Points`)}
                  </Form.Item>
                </Col>
              </Col>
            ))}
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={<FormattedMessage id='formRecomendariaTitle' defaultMessage='Recomendaria essa escola?'/>}>
                {getFieldDecorator('recommend', { valuePropName: 'checked', initialValue: true })(
                  <Switch checkedChildren={<FormattedMessage id='formsim' defaultMessage='Sim'/>} unCheckedChildren={<FormattedMessage id='formnao' defaultMessage='Não'/>}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={<FormattedMessage id='formConselhoDiretoria' defaultMessage='Conselho para diretoria'/>} extra={'(Opcional)'}>
                {getFieldDecorator('advise', {
                })(
                  <Input.TextArea placeholder={'Suas dicas para melhorar a escola'} autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} xs={24} >
              <Form.Item colon={false} label={<FormattedMessage id='formNomeFeedback' defaultMessage='Deseja que apareça seu nome no feedback?'/>} extra={<FormattedMessage id='formNomeFeedbackExtra' defaultMessage='Acreditamos que quanto mais informações em seu feedback, maior é a integridade das informaçoes, mas a decisão é sua de mostrar ou não seu nome.'/>}>
                {getFieldDecorator('anonymous', { valuePropName: 'checked', initialValue: true })(
                  <Switch checkedChildren={<FormattedMessage id='formsim' defaultMessage='Sim'/>} unCheckedChildren={<FormattedMessage id='formnao' defaultMessage='Não'/>}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Button type='primary' size='large' style={{ width: '100%' }} htmlType='submit'><FormattedMessage id='formButtonSubmit' defaultMessage='Enviar avaliação'/></Button>
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
            <Form.Item colon={false} label={<FormattedMessage id='Form2City' defaultMessage='Selecione as cidades que você tem interesse em fazer intercâmbio'/>}>
              {getFieldDecorator('citiesId', {
                rules: [{
                  required: prospectRequired, message:<FormattedMessage id='formCityChoose' defaultMessage='Por favor selecione uma cidade'/>,
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
            <Form.Item colon={false} label={<FormattedMessage id='formCursoLabel' defaultMessage='Qual o tipo do curso'/>}>
              {getFieldDecorator('courseType', {
                rules: [{
                  required: prospectRequired, message: 'Por favor selecione um curso',
                }],
              })(
                <Select
              placeholder={<FormattedMessage id='formCursoPlaceholder' defaultMessage='Selecione o tipo de curso'/>}>
                  <Select.Option value={'IDK'}>{'Não sei, estou pensando'}</Select.Option>
                  <Select.Option value={'GE'}>{'General english'}</Select.Option>
                  <Select.Option value={'TP'}>{'Preparatório para exame trinity (IELTS, Cambridge, etc.)'}</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={6} xs={24} >
            <Form.Item colon={false} label={<FormattedMessage id='formQtdSemanas' defaultMessage='Qtd. de semanas'/>}>
              {getFieldDecorator('weeks', {
                rules: [{
                  required: prospectRequired, message:<FormattedMessage id='formQtdSemanasErr' defaultMessage='Por favor informe a quantidade de semanas'/>
                }],
              })(
                <InputNumber min={1} style={{ width: '100%' }} placeholder={'Ex: 25'} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} xs={24} >
            <Form.Item colon={false} label={<FormattedMessage id='FormCursoDataChoose2' defaultMessage='Quando você deseja começar o curso'/>} extra={<FormattedMessage id='formCursoDataMsg' defaultMessage='Não faz ideia do mês? Não tem problema! Coloque um mês próximo que você deseja começar.'/>}>
              {getFieldDecorator('expectedDate', {
                rules: [{
                  required: prospectRequired, message: 'Por favor selecione uma data que você pretende começar seu curso',
                }],
              })(
                <DatePicker.MonthPicker format={'MMMM/YYYY'} placeholder='Selecione o mês e ano' style={{ width: '100%' }} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button type='primary' size='large' style={{ width: '100%' }} htmlType='submit'><FormattedMessage id='formButtonSubmit' defaultMessage='Enviar avaliação'/></Button>
          </Col>
        </Row>
      </Form>
    );
    return (
      <div className={'with-padding'}>
        <Row type='flex'>
          <Col md={{ span: 13, order: 1 }} xs={{ span: 24, order: 2 }} className={'form-review'}>
            <h2><FormattedMessage id='reviewTitle' defaultMessage='Avalie uma escola ou adicione um interesse para acessar todo conteúdo de avaliações'/></h2>
            <Divider />
            <Row>
              <Col span={24}>
                <Form.Item>
                  <Radio.Group buttonStyle='solid' defaultValue={true} onChange={(e) => this.onSelectType(e.target.value)}>
                    <Radio.Button value={true}><FormattedMessage id='formRadioStudent1' defaultMessage='Sou estudante / Ex-estudante' /></Radio.Button>
                    <Radio.Button value={false}><FormattedMessage id='formRadioStudent2' defaultMessage='Quero fazer intercâmbio (futuro estudante)' /></Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            {this.state.student ? isStudent : isProspect}
          </Col>
          <Col md={{ span: 10, offset: 1, order: 2 }} xs={{ span: 24, order: 1 }} className={'tips'}>
            <Row>
              <Col span={24}>
                <h2><FormattedMessage id='reviewTitle1' defaultMessage='Faça parte da comunidade e ajude futuros estudantes a escolherem a melhor escola para um intercâmbio' /></h2>
              </Col>
              <Col span={24}>
                <FormattedMessage id='reviewtext1' defaultMessage='Somos uma comunidade de estudantes onde você descobre o histórico de preços e a satisfação dos estudantes em cada escola. O acesso a todo o conteúdo é gratuito, mas pedimos que você contribua com a comunidade fornecendo sua colaboração para ter acesso ilimitado a opiniões e históricos de preços oferecidos em todas as escolas.' />
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={24}>
                <h3><FormattedMessage id='reviewTitle2' defaultMessage='lembre-se' /></h3>
              </Col>
              <Col span={24}>
                <FormattedMessage id='reviewText2' defaultMessage='Somos uma plataforma séria, sempre faça seu feedback com seu verdadeiro ponto de vista e não envie comentários inapropriados, seja respeitoso com a comunidade, nossa equipe sempre estará monitorando os feedbacks, nosso principal objetivo é ajudar futuros estudantes a conhecer melhor as escolas. Se algum feedback quebrar as regras ele será rapidamente bloqueado e o usuário será informado ou dependendo do feedback poderá ser excluído da nossa base.' />
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
