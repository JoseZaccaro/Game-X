import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './baez.css';
import './cuvillier.css';
import './espinoza.css';
import './zaccaro.css';
import './styles.css';
import Home from './pages/Home';
import Store from './pages/Store';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Payment from './pages/Payment';
import ServerDown from './pages/ServerDown';


class App extends React.Component{


  render(){

      return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/store" component={Store} />
                <Route path="/payment" component={Payment} />
                <Route path="/serverdown" component={ServerDown} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={LogIn} />
                <Redirect to="/" />
            </Switch>
          </BrowserRouter>  
      );
}}


export default App