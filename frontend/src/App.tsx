import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RequestBoard from './pages/RequestBoard';
import NewRequest from './pages/NewRequest';
import EditRequest from './pages/EditRequest';
import RequestDetails from './pages/RequestDetails';
import UserDetails from './pages/UserDetails';
import NotificationList from './pages/NotificationList';
import MessageRoomList from './pages/MessageRoomList';
import MessageRoom from './pages/MessageRoom';

import './custom.css'

const App = () => (
    <Layout>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/requests/new' component={NewRequest} />
            <Route path='/requests/edit/:id' component={EditRequest} />
            <Route exact path='/notifications' component={NotificationList} />
            <Route path='/requests/:id' component={RequestDetails} />
            <Route exact path='/requests' component={RequestBoard} />
            <Route path='/users/:id' component={UserDetails} />
            <Route path='/messages/:id' component={MessageRoom} />
            <Route exact path='/messages' component={MessageRoomList} />
        </Switch>
    </Layout>
);

export default App;
