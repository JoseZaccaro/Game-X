import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './baez.css';
import './cuvillier.css';
import './espinoza.css';
import './zaccaro.css';
import './styles.css';
import Home from './pages/Home';
import Access from './pages/Access';
import Store from './pages/Games';
import Payment from './pages/Payment';
import ServerDown from './pages/ServerDown';
import userActions from "./redux/actions/userActions";
import { connect } from 'react-redux';
import Game from './components/Game';
import Loader from './components/Loader';
import AdminPanel from './pages/AdminPanel';
import StoreHardware from './pages/StoreHardware';
import Hardware from './components/Hardware'
import io from 'socket.io-client'
import chatActions from './redux/actions/chatActions'
import CreditCard from './components/CreditCard'

class App extends React.Component{

  componentDidMount() {
                          // https://game-x-arg.herokuapp.com/
                // ACA ABAJO 👇 VA EL LINK DE HEROKU 👆
    this.props.socketChat(io('http://localhost:4000'))

    if (!this.props.userLogged && localStorage.getItem('token')) {  
      const userData = JSON.parse(localStorage.getItem('userLogged'))
      const userLS= {
        token: localStorage.getItem('token'),
        ...userData
      }
      this.props.forcedLoginByLS(userLS)
    }
  }


  render(){

    if (!this.props.userLogged && localStorage.getItem('userLogged') ) {
        <Loader/>
    }


      return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/hardware" component={StoreHardware} />
                <Route exact path="/games" component={Store} />
                <Route path="/payment" component={Payment} />
                <Route path="/serverdown" component={ServerDown} />
                <Route path="/game/:id" component={Game} />
                <Route path="/hardware/:id" component={Hardware} />
                {this.props.userLogged && this.props.userLogged.rol === "admin" ? <Route path="/admin" component={AdminPanel} /> : null}
                {!this.props.userLogged && <Route path="/access" component={Access} />}
                <Redirect to="/" />
            </Switch>
          </BrowserRouter>  
      );
}}

const mapStateToProps = state => {
  return {
      userLogged: state.userReducer.userLogged
  }
}
const mapDispatchToProps = {
  forcedLoginByLS :  userActions.forcedLoginByLS,
  socketChat: chatActions.socketChat
}

export default connect(mapStateToProps,mapDispatchToProps)(App)