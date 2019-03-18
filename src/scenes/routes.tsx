import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import MyLayout from 'components/MyLayout';
import Home from 'scenes/Home';
import Information from 'scenes/School/Information';
import School from 'scenes/Admin/School';
import Profile from 'scenes/Profile';
import Review from 'scenes/Review';
import Authentication from 'scenes/Authentication';
import About from 'scenes/About';
import Result from 'scenes/Result';
import { drawer } from 'store/Authentication/actions';
import ScrollToTop from 'components/ScrollToTop';
//import NotFound from 'components/NotFound';

const Routes = ({ store }: any) => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <MyLayout>
            <Route exact path='/' component={Home} />
            <Route path='/result/:cityId?' component={Result} />
            <Route path='/information/:id' component={Information} />
            <Route path='/about' component={About} />
            <Route path='/tlogin' component={Authentication} />
            <PrivateRoute path='/broadleaf' component={School} store={store} />
            <PrivateRoute path='/profile' component={Profile} store={store}/>
            <PrivateRoute path='/review/:id?' component={Review}  store={store} />
            {/* <Route path='*' component={NotFound} /> */}
          </MyLayout>
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
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
            //if (path === props.location.pathname) {
              store.dispatch(drawer(true));
            //}
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