import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './state';

import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';

import 'antd/dist/antd.less';

import PrivateRoute from './utils/privateRoute';

import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import BuyerLogin from './components/pages/Login/BuyerLogin.js';
import AdminLogin from './components/pages/Login/AdminLogin.js';
import BuyerRegistration from './components/pages/Register/BuyerRegister';
import AdminRegistration from './components/pages/Register/AdminRegister';

import Dashboard from './components/Dashboard/Dashboard';
import { HomePage } from './components/pages/Home';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import OrderDetailsContainer from './components/Dashboard/OrderList/OrderDetailsContainer';
import BuyerOrderForm from './components/orders/BuyerOrderForm';
import GuestOrderForm from './components/orders/GuestOrderForm';
import Stripe from './components/Stripe/StripeOrder';
import OrderConfirmation from './components/orders/OrderConfirmation';

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <Security {...config} onAuthRequired={authHandler}>
      <Switch>
        <Route path="/login" component={BuyerLogin} />
        <Route path="/register" component={BuyerRegistration} />
        <Route exact path="/admin" component={AdminLogin} />
        <Route exact path="/admin/register" component={AdminRegistration} />
        <Route path="/implicit/callback" component={LoginCallback} />
        <Route path="/orders" component={BuyerOrderForm} />
        <Route path="/guest" component={GuestOrderForm} />
        <Route path="/checkout" component={Stripe} />
        <Route path="/confirmation" component={OrderConfirmation} />
        <Route path="/order_details/:id">
          <OrderDetailsContainer />
        </Route>
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <SecureRoute
          path="/"
          exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <SecureRoute path="/example-list" component={ExampleListPage} />
        <SecureRoute path="/profile-list" component={ProfileListPage} />
        <SecureRoute path="/datavis" component={ExampleDataViz} />
        <Route component={NotFoundPage} />
      </Switch>
    </Security>
  );
}
