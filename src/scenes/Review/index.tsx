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
  { label: <FormattedMessage id={'localization'} defaultMessage='Localização' />, field: 'localization' },
  { label: <FormattedMessage id={'facilities'} defaultMessage='Estrutura' />, field: 'structure' },
  { label: <FormattedMessage id={'teachers'} defaultMessage='Professores' />, field: 'teachers' },
  { label: <FormattedMessage id={'staff'} defaultMessage='Staff' />, field: 'staff' },
  { label: <FormattedMessage id={'teaching'} defaultMessage='Didática' />, field: 'teachingMethod' },
  { label: <FormattedMessage id={'nacionalities'} defaultMessage='Mix de nacionalidades' />, field: 'mixNacionality' },
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
              message: <FormattedMessage id='success' defaultMessage='Successo' />,
              description: <FormattedMessage id='successFeedback' defaultMessage='Obrigado por ajudar com sua avaliação.'/>,
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
              message: <FormattedMessage id='success' defaultMessage='Successo' />,
              description: <FormattedMessage id='successProspect' defaultMessage='Dados salvo com sucesso, aproveite todo contéudo do site' />,
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

  // componentDidMount() {
  //   const btn = (
  //     <Button type='primary' size='small' onClick={() => notification.close('info')}>
  //       Ok
  //     </Button>
  //   );
  //   notification.info({
  //     message: <FormattedMessage id='reviewTitle2' defaultMessage='Lembre-se' />,
  //     description: <FormattedMessage id='reviewText2' defaultMessage='Sempre faça seu feedback com seu verdadeiro ponto de vista e evite de user palavras inapropriadas, seja respeitoso com a comunidade, nossa equipe sempre estará monitorando os feedbacks, nosso principal objetivo é ajudar futuros estudantes a conhecer melhor as escolas. Se algum feedback quebrar as regras ele será rapidamente bloqueado e o usuário será informado ou dependendo do feedback poderá ser excluído da nossa base.' />,
  //     duration: null,
  //     btn,
  //     key: 'info'
  //   });
  // }
  render() {
    //const filter = (inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
    const { cities, schools } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const studentRequired = this.state.student ? true : false;
    const prospectRequired = this.state.student ? false : true;

    const isStudent = (
      <Form onSubmit={this.handleSubmitStudent}>
        <Row gutter={8}>
          <Col md={24} xs={24} >
            <Form.Item hasFeedback  colon={false} label={<FormattedMessage id='formCityChoose' defaultMessage='Selecione a cidade da escola que você esta estudando ou estudou' />}>
              {getFieldDecorator('cityId', {
                rules: [{
                  required: studentRequired, message: <FormattedMessage id='formCityChooseErr' defaultMessage='Por favor escolha uma cidade'/> ,
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
              <Form.Item hasFeedback colon={false} label={<FormattedMessage id='formSchoolSelect' defaultMessage='Selecione a escola que você esta estudando ou estudou'/>}>
                {getFieldDecorator('schoolId', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formSchoolChoose' defaultMessage='Por favor selecione uma escola'/>
                  }]
                })(
                  <Select
                    showSearch
                    placeholder={<FormattedMessage id='formSchoolChoose' defaultMessage='Selecione uma escola'/>}
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
              <Form.Item colon={false} hasFeedback label={<FormattedMessage id='formCourseLabel' defaultMessage='Qual o tipo do curso'/>}>
                {getFieldDecorator('course', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formCourseChoose' defaultMessage='Por favor selecione um tipo de curso'/>,
                  }],
                })(
                  <Select
                    placeholder={<FormattedMessage id='formCoursePlaceholder' defaultMessage='Selecione o tipo de curso'/>}>
                    <Select.Option value={'GE'}>{'General english'}</Select.Option>
                    <Select.Option value={'TP'}>{'Trinity (IELTS, PET, etc.)'}</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col md={6} xs={24} >
              <Form.Item colon={false} hasFeedback label={<FormattedMessage id='formQtWeeks' defaultMessage='Qtd. de semanas'/>}>
                {getFieldDecorator('weeks', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formCourseDataChoose' defaultMessage='Por favor preencha o campo quantidade de semanas'/> ,
                  }],
                })(
                  <InputNumber min={1} style={{ width: '100%' }} placeholder={'Ex: 25'} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} xs={24} >
              <Form.Item colon={false} hasFeedback label={<FormattedMessage id='formCourseDateChooseTitle' defaultMessage='Quando você começou o curso'/>} extra={<FormattedMessage id='formCourseDateMsg'defaultMessage='Não lembra o mês? Não tem problema! Coloque um mês próximo que você acha que começou o curso.'/>}>
                {getFieldDecorator('startDate', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formCourseDateChoose' defaultMessage='Por favor preencha o campo data que começou o curso'/>,
                  }],
                })(
                  <DatePicker.MonthPicker format={'MMMM/YYYY'} style={{ width: '100%' }} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={<FormattedMessage id='formSatisfactionChoose' defaultMessage='Qual é o seu grau de satisfação geral?'/>}>
                {getFieldDecorator('generalPoints', {
                  rules: [{
                    required: studentRequired, message:<FormattedMessage id='formSatisfactionErr' defaultMessage='Por favor escolha uma nota de satisfação geral'/>,
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
              <Form.Item colon={false} hasFeedback label={<FormattedMessage id='formPositivePointsTitle' defaultMessage='Pontos positivos'/>} extra={<FormattedMessage id='formExtraPoints' defaultMessage='Minimo de 140 caracteres'/>}>
                {getFieldDecorator('pros', {
                  rules: [{
                    required: studentRequired, message: <FormattedMessage id='formPositivePointsErr1' defaultMessage='Por favor preencha o campo pontos positivos'/>
                  },
                  {
                    min: 140, message:<FormattedMessage id='formPositivePointsErr2' defaultMessage='Por favor pontos positivos devem conter pelo menos 140 caracteres'/>
                  }],
                })(
                  <Input.TextArea autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item colon={false} hasFeedback label={<FormattedMessage id='formNegativePointsTitle' defaultMessage='Pontos negativos'/>} extra={<FormattedMessage id='formExtraPoints' defaultMessage='Minimo de 140 caracteres'/>}>
                {getFieldDecorator('contras', {
                  rules: [{
                    required: studentRequired, message:<FormattedMessage id='formNegativePointsErr1' defaultMessage='Por favor preencha o campo pontos negativos'/>
                  },
                  {
                    min: 140, message:<FormattedMessage id='formNegativePointsErr2' defaultMessage='Por favor pontos negativos devem conter pelo menos 140 caracteres'/>
                  }],
                })(
                  <Input.TextArea autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item colon={false} label={<FormattedMessage id='formTitle' defaultMessage='Título da avaliação'/>}>
                {getFieldDecorator('title', {
                  rules: [{
                    required: studentRequired, message:<FormattedMessage id='formTitleErr' defaultMessage='Por favor preencha o campo título da avaliação'/>,
                  }],
                })(
                  <Input/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <b><FormattedMessage id='formSatisfactionTitle' defaultMessage='Qual sua satisfação quanto a:'/></b>
            </Col>
          </Row>
          < br />
          <Row type='flex' justify='start'>
            {reviews.map((item: any, index: any) => (
              <Col span={24} key={index}>
                <Col span={12}>
                  <span>{item.label}</span>
                </Col>
                <Col span={12}>
                  <Form.Item colon={false}>
                    {getFieldDecorator(`${item.field}Points`, {
                      rules: [{
                        required: studentRequired, message: <FormattedMessage id={`${item.label.props.id}Message`} defaultMessage={`Por favor dê uma nota para ${item.label.props.defaultMessage}`}/>,
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
              <Form.Item colon={false} label={<FormattedMessage id='formRecommendTitle' defaultMessage='Recomendaria essa escola?'/>}>
                {getFieldDecorator('recommend', { valuePropName: 'checked', initialValue: true })(
                  <Switch checkedChildren={<FormattedMessage id='yes' defaultMessage='Sim'/>} unCheckedChildren={<FormattedMessage id='no' defaultMessage='Não'/>}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item colon={false} label={<FormattedMessage id='formAdvice' defaultMessage='Conselho para diretoria'/>} extra={'(Opcional)'}>
                {getFieldDecorator('advise', {
                })(
                  <Input.TextArea autosize={{ minRows: 4, maxRows: 6 }} />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} xs={24} >
              <Form.Item colon={false} label={<FormattedMessage id='formFeedbackName' defaultMessage='Deseja que apareça seu nome no feedback?'/>} extra={<FormattedMessage id='formFeedbackNameExtra' defaultMessage='Acreditamos que quanto mais informações em seu feedback, maior é a integridade das informaçoes, mas a decisão é sua de mostrar ou não seu nome.'/>}>
                {getFieldDecorator('anonymous', { valuePropName: 'checked', initialValue: true })(
                  <Switch checkedChildren={<FormattedMessage id='yes' defaultMessage='Sim'/>} unCheckedChildren={<FormattedMessage id='no' defaultMessage='Não'/>}/>
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
            <Form.Item colon={false} hasFeedback label={<FormattedMessage id='form2City' defaultMessage='Selecione as cidades que você tem interesse em fazer intercâmbio'/>}>
              {getFieldDecorator('citiesId', {
                rules: [{
                  required: prospectRequired, message:<FormattedMessage id='formCityError' defaultMessage='Por favor selecione uma cidade'/>,
                }],
              })(
                <Select
                  showSearch
                  mode='multiple'
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
        </Row>
        <Row gutter={8}>
          <Col md={18} xs={24} >
            <Form.Item colon={false} hasFeedback label={<FormattedMessage id='formCourseLabel' defaultMessage='Qual o tipo do curso'/>}>
              {getFieldDecorator('courseType', {
                rules: [{
                  required: prospectRequired, message: <FormattedMessage id='formCourseChoose' defaultMessage='Por favor selecione um tipo de curso'/>,
                }],
              })(
                <Select
              placeholder={<FormattedMessage id='formCoursePlaceholder' defaultMessage='Selecione o tipo de curso'/>}>
                  <Select.Option value={'IDK'}>{<FormattedMessage id='idkThinking' defaultMessage='Não sei, estou pensando' />}</Select.Option>
                  <Select.Option value={'GE'}>{'General english'}</Select.Option>
                  <Select.Option value={'TP'}>{'Trinity (IELTS, Cambridge, etc.)'}</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col md={6} xs={24} >
            <Form.Item colon={false} hasFeedback label={<FormattedMessage id='formQtWeeks' defaultMessage='Qtd. de semanas'/>}>
              {getFieldDecorator('weeks', {
                rules: [{
                  required: prospectRequired, message:<FormattedMessage id='formQtWeeksErr' defaultMessage='Por favor informe a quantidade de semanas'/>
                }],
              })(
                <InputNumber min={1} style={{ width: '100%' }} placeholder={'Ex: 25'} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={24} xs={24} >
            <Form.Item colon={false} hasFeedback label={<FormattedMessage id='formCourseDateChoose2' defaultMessage='Quando você deseja começar o curso'/>} extra={<FormattedMessage id='formCourseDataMsg' defaultMessage='Não faz ideia do mês? Não tem problema! Coloque um mês próximo que você deseja começar.'/>}>
              {getFieldDecorator('expectedDate', {
                rules: [{
                  required: prospectRequired, message: <FormattedMessage id='formCourseDateChoose2' defaultMessage='Por favor selecione uma data que você pretende começar seu curso'/>,
                }],
              })(
                <DatePicker.MonthPicker format={'MMMM/YYYY'} style={{ width: '100%' }} />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button type='primary' size='large' style={{ width: '100%' }} htmlType='submit'><FormattedMessage id='formButtonSubmitProspect' defaultMessage='Enviar avaliação'/></Button>
          </Col>
        </Row>
      </Form>
    );
    return (
      <div className={'with-padding'}>
        <Row type='flex' justify='center'>
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
          {/* <Col md={{ span: 10, offset: 1, order: 2 }} xs={{ span: 24, order: 1 }} className={'tips'}>
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
          </Col> */}
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
