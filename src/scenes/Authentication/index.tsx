import React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { loginFacebook } from 'store/Authentication/actions';
import { logComponentError } from 'errors/errorHandler';

interface IProps extends DispatchProp<any> {

}

interface IStates {

}

function getUrlParameter (name: string) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

class Authentication extends React.Component<IProps, IStates> {
  constructor(props: IProps) {
    super(props);

  }
  componentDidCatch(error: any, info: any) {
    logComponentError(error);
  }

  componentDidMount() {
    (async() => {
      try {
        const code = getUrlParameter('code');
        if (code) {
          await this.props.dispatch(loginFacebook(code));
        }
      } catch (error) {
        console.log(error);
        // window.location.href = '/';
      }
    })();
  }
  render(){
    return(
      <p> Por favor aguarde, estamos autenticando ... </p>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
  };
}

export default connect(mapStateToProps)(Authentication);