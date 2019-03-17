import React from 'react';
import { Rate, Popover, Icon } from 'antd';
import moment from 'moment';
import Locked from 'components/Locked';
import { connect } from 'react-redux';

const ReviewDetails = (props: any) => {
    const {  isAuthenticated, hasAccess, item, index } = props;
    let content = (
      <div>
          Localização<br/> <Rate defaultValue={item.localizationPoints} allowHalf disabled/> {item.localizationPoints} <br />
          Estrutura<br/> <Rate defaultValue={item.structurePoints} allowHalf disabled/> {item.structurePoints} <br />
          Didática<br/> <Rate defaultValue={item.teachingMethodPoints} allowHalf disabled/> {item.teachingMethodPoints} <br />
          Professores<br/> <Rate defaultValue={item.teachersPoints} allowHalf disabled/> {item.teachersPoints} <br />
          Staff<br/> <Rate defaultValue={item.staffPoints} allowHalf disabled/> {item.staffPoints} <br />
          Mix de nacionalidade<br/> <Rate defaultValue={item.mixNacionality} allowHalf disabled/> {item.mixNacionality ? item.mixNacionality : 'N/A'} <br />
      </div>
    );
      if (index > 0 && (!isAuthenticated || (isAuthenticated && !hasAccess))) {
        return (
          <div>
            <Popover placement='bottom' content={content}>
              <Rate defaultValue={item.generalPoints} allowHalf disabled/> <Icon type= 'down-circle'/> <br />
            </Popover>
            <p>{!item.anonymous && item.user ? `${item.user.username} ` : 'Usuário '}
              estudou {item.course === 'GE' ? 'General English ' : 'Preparatório Trinity '}
              em {moment(item.startDate).format('MMMM/YYYY')}</p>
            <div className='is-locked'>
              <Locked />
              <p><strong>Prós:</strong>&nbsp;pariatur provident temporibus est laborum ab excepturi commodi hic a accusamus dolores qui doloremque cumque ex illo sint quis velit quia perferendis dolorum odit ut id modi debitis atque suscipit et aliquam rem perspiciatis molestias libero voluptas ipsum vero eos est voluptatem corrupti incidunt quasi in quia est laboriosam sed</p>
              <p><strong>Contras:</strong>&nbsp;omnis id ratione laborum et provident aut autem aut perspiciatis dolore odio itaque qui quod ut repellendus unde perferendis nisi non porro qui facere earum occaecati rerum optio delectus ipsa et iure voluptatem ea numquam temporibus eos est ut libero expedita qui veritatis blanditiis assumenda est sunt rem qui quae</p>
            </div>
          </div>
        );
      }
      return (
        <div className={'review-text'}>
          <Popover placement='bottom' content={content}>
            <Rate defaultValue={item.generalPoints} allowHalf disabled/> <Icon type= 'down-circle'/> <br />
          </Popover>
          <p>{!item.anonymous && item.user ? `${item.user.username} `: 'Usuário '}
              estudou {item.course === 'GE' ? 'General English ' : 'Preparatório Trinity '}
              em {moment(item.startDate).format('MMMM/YYYY')}</p>
          <p> <strong>Prós:</strong> {item.pros}</p>
          <p> <strong>Contras:</strong> {item.contras} </p>
          {item.advise && <p> <strong>Conselho a diretoria:</strong> {item.advise} </p> }
          <p> <strong> Recomenda a escola: </strong> {item.recommend ? <span><Icon type='check-circle' style={{ fontSize: 16, color: 'green' }}/> Sim</span> : <span><Icon type='close-circle' style={{ fontSize: 16, color: 'red' }}/> Não</span>} </p>
        </div>
      );
};

function mapStateToProps(state: any, ownProps: any) {
  return {
    isAuthenticated: state.app.Authentication.authentication.isAuthenticated,
    hasAccess: state.app.Profile.hasAccess,
  };
}

export default connect(mapStateToProps)(ReviewDetails);