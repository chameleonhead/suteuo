import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RequestBoard from './pages/RequestBoard';
import NewRequest from './pages/NewRequest';
import RequestDetails from './pages/RequestDetails';
import UserDetails from './pages/UserDetails';

import './custom.css'

const App = () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/requests/new' component={NewRequest} />
            <Route path='/requests/:id' component={RequestDetails} />
            <Route exact path='/requests' component={RequestBoard} />
            <Route path='/users/:id' component={UserDetails} />
        </Switch>
    </Layout>
);

export default App;
