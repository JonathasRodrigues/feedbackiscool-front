import React from 'react';
import { connect } from 'react-redux';
import { loginThird } from 'store/Authentication/actions';
import { logComponentError } from 'errors/errorHandler';
import Cookies from 'js-cookie';
import Loading from 'components/Loading';
import { withRouter} from 'react-router-dom';

class Authentication extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

  }
  componentDidCatch(error: any, info: any) {
    logComponentError(error);
  }

  componentDidMount() {
    (async() => {
      try {
        const userId = Cookies.get('userId');
        const token = Cookies.get('access_token');
        if (userId && token) {
          await this.props.dispatch(loginThird(userId, token));
          this.props.history.push('/');
        }
      } catch (error) {
        console.log(error);
        this.props.history.push('/');
      }
    })();
  }
  render(){
    return(
      <Loading />
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
  };
}

export default withRouter(connect(mapStateToProps)(Authentication));