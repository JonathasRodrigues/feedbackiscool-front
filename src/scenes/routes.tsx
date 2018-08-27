import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import MyLayout from 'components/MyLayout';
import Home from 'scenes/Home';
import Information from 'scenes/School/Information';
import School from 'scenes/Admin/School';
import Profile from 'scenes/Profile';
import Review from 'scenes/Review';
import { drawer } from 'store/Authentication/actions';
import ScrollToTop from 'components/ScrollToTop';

const Routes = ({ store }: any) => {
  return (
    <Provider store={store}>
        <BrowserRouter>
        <ScrollToTop>
            <Switch>
            <MyLayout>
              <Route exact path='/' component={Home} />
              <Route path='/information/:id' component={Information} />
              <PrivateRoute path='/admin' component={School} store={store} />
              <PrivateRoute path='/profile' component={Profile} store={store}/>
              <PrivateRoute path='/review/:id?' component={Review}  store={store} />
            </MyLayout>
          </Switch>
        </ScrollToTop>
        </BrowserRouter>
    </Provider>
  );
};

const PrivateRoute = ({ component: Component, path, store }: any) => {
  const isAuthenticated = Boolean(localStorage.getItem('acessToken'));
  let goto;
  if (isAuthenticated) {
    goto = (
      <Route path={path}
        render={
          props =>
            <Component {...props} />
        }
      />
    );
  } else {
    goto = (
      <Route path={path}
        render={
          props => {
            if (path === props.location.pathname) {
              store.dispatch(drawer(true));
            }
            return (
              <Redirect to={{
                pathname: '/',
                state: { from: props.location }
              }} />
            );
          }
        }
      />
    );
  }
  return goto;
};

export default Routes;