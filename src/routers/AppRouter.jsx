import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import DashboardPage from '../components/DashboardPage';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={DashboardPage} exact />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
