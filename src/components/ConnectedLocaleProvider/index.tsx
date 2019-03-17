import React from 'react';
import { connect } from 'react-redux';
import { LocaleProvider } from 'antd';

console.log(`Idioma padrão do navegador ${navigator.language}`);

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
class ConnectedLocaleProvider extends React.Component<any, any> {
  render(){
    return (
      <LocaleProvider locale={this.props.locale}>
        {this.props.children}
      </LocaleProvider>
    );
  }
}

function mapStateToProps(state: any) {
  const { data, locale } = state.app.Language.current;
  return { locale: data, momentLocale: locale };
}

export default connect(mapStateToProps)(ConnectedLocaleProvider);