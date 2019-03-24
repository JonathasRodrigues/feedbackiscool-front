import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect, DispatchProp } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import './index.css';

interface IProps extends DispatchProp<any> {
  currentState: boolean;
}

class ModalWelcome extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  handleCancel = (e: any) => {
    this.props.dispatch({ type: 'MODAL_WELCOME_CLOSE '});
  }

  render() {
   return(
      <Modal footer={null}
      title={<FormattedMessage id={'welcomeModalTitle'} defaultMessage='Vamos começar!' />}
      visible={this.props.currentState}
      onCancel={this.handleCancel}
    >
      <p><FormattedMessage id={'welcomeModalMessage'} defaultMessage='O primeiro passo para você ter acesso total a todas as informações do site e começar analisar qual escola encaixa no seu perfil e bolso!' /></p>
      <p className='buttonReview'><Link to='/review'><FormattedMessage id={'welcomeModalReview'} defaultMessage='Eu quero fazer meu primeiro feedback agora.'/></Link></p>
      <p className='buttonReview'><Link to='/review'><FormattedMessage id={'welcomeModalReview2'} defaultMessage='Não sou estudante ainda, mas tenho interesse nas escolas.'/></Link></p>
    </Modal>
   );
  }
}
function mapStateToProps(state: any, ownProps: any) {
  return {
    currentState: state.app.Helpers.modalWelcome
  };
}
export default connect(mapStateToProps)(ModalWelcome);