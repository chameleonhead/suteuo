import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RequestBoard from './pages/RequestBoard';
import RequestDetails from './pages/RequestDetails';
import UserDetails from './pages/UserDetails';

import './custom.css'

const App = () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route exact path='/requests' component={RequestBoard} />
        <Route path='/requests/:id' component={RequestDetails} />
        <Route path='/users/:id' component={UserDetails} />
    </Layout>
);

export default App;
