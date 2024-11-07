import { Basket } from '@/components/basket';
import { Footer, Navigation } from '@/components/common';
import * as ROUTES from '@/constants/routes';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import * as view from '@/views';
import AdminRoute from './AdminRoute';
import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';
import Menu from '@/components/Menu/Menu';
import Sidebar from '@/components/Menu/Sidebar';
import Bottomnav from '@/components/common/Bottomnav';



// Revert back to history v4.10.0 because
// v5.0 breaks navigation
export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <>
    
      <Navigation />
      <Basket />
      <Bottomnav />
      <Switch>
        
        <Route
          component={view.Search}
          exact
          path={ROUTES.SEARCH}
        />
        <Route
          component={view.Home}
          exact
          path={ROUTES.HOME}
        />
        <Route
          component={view.Shop}
          exact
          path={ROUTES.SHOP}
        />
        <Route
          component={view.FeaturedProducts}
          exact
          path={ROUTES.FEATURED_PRODUCTS}
        />
        <Route
        component={view.Privacy}
        exact
        path={ROUTES.PRIVACY}
         />
         <Route
         component={view.Terms}
         exact
         path={ROUTES.TERMS}
          />
          <Route
         component={view.Apple}
         exact
         path={ROUTES.APPLE}
          />
          <Route
         component={view.Epic}
         exact
         path={ROUTES.EPIC}
          />
          <Route
         component={view.Steam}
         exact
         path={ROUTES.STEAM}
          />
          <Route
         component={view.Microsoft}
         exact
         path={ROUTES.MICROSOFT}
          />
          <Route
         component={view. Playstation}
         exact
         path={ROUTES.PLAYSTATION}
          />
           <Route
         component={view.Netflix}
         exact
         path={ROUTES.NETFLIX}
          />
        <Route
          component={view.RecommendedProducts}
          exact
          path={ROUTES.RECOMMENDED_PRODUCTS}
        />
        <PublicRoute
          component={view.SignUp}
          path={ROUTES.SIGNUP}
        />
        <PublicRoute
          component={view.SignIn}
          exact
          path={ROUTES.SIGNIN}
        />
        <PublicRoute
          component={view.ForgotPassword}
          path={ROUTES.FORGOT_PASSWORD}
        />
        <Route
          component={view.ViewProduct}
          path={ROUTES.VIEW_PRODUCT}
        />
        <ClientRoute
          component={view.UserAccount}
          exact
          path={ROUTES.ACCOUNT}
        />
        <ClientRoute
          component={view.EditAccount}
          exact
          path={ROUTES.ACCOUNT_EDIT}
        />
        <ClientRoute
          component={view.CheckOutStep1}
          path={ROUTES.CHECKOUT_STEP_1}
        />
        <ClientRoute
          component={view.CheckOutStep2}
          path={ROUTES.CHECKOUT_STEP_2}
        />
        <ClientRoute
          component={view.CheckOutStep3}
          path={ROUTES.CHECKOUT_STEP_3}
        />
        <AdminRoute
          component={view.Dashboard}
          exact
          path={ROUTES.ADMIN_DASHBOARD}
        />
        <AdminRoute
          component={view.Products}
          path={ROUTES.ADMIN_PRODUCTS}
        />
        <AdminRoute
          component={view.AddProduct}
          path={ROUTES.ADD_PRODUCT}
        />
        <AdminRoute
          component={view.EditProduct}
          path={`${ROUTES.EDIT_PRODUCT}/:id`}
        />
        <AdminRoute
        component={view.Users}
        path={ROUTES.ADMIN_USERS}
        />
        <AdminRoute
        component={view.Orders}
        path={ROUTES.ADMIN_ORDERS}
         />
        <PublicRoute component={view.PageNotFound} />
      </Switch>
      
     
      
    </>
    
    <Footer />
  </Router>
  
);

export default AppRouter;
