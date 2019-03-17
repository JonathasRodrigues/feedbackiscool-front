import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

// This function will map the current redux state to the props for the component that it is "connected" to.
// When the state of the redux store changes, this function will be called, if the props that come out of
// this function are different, then the component that is wrapped is re-rendered.
function mapStateToProps(state: any) {
  const { locale, messages } = state.app.Language.current;
  return { locale, messages };
}

export default connect(mapStateToProps)(IntlProvider);