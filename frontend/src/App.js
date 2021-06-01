import React from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './baez.css';
import './cuvillier.css';
import './espinoza.css';
import './zaccaro.css';
import './styles.css';
import Home from './pages/Home';
import Access from './pages/Access';
import Store from './pages/Store';
import Payment from './pages/Payment';
import ServerDown from './pages/ServerDown';
import userActions from "./redux/actions/userActions";
import { connect } from 'react-redux';
import Game from './components/Game';
import Loader from './components/Loader';
import AdminPanel from './pages/AdminPanel';
import Chat from './components/Chat'

class App extends React.Component{

  componentDidMount() {
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
    console.log(this.props.userLogged)

    if (!this.props.userLogged && localStorage.getItem('userLogged') ) {
        <Loader/>
    }


      return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/store" component={Store} />
                <Route path="/payment" component={Payment} />
                <Route path="/serverdown" component={ServerDown} />
                <Route path="/game/:id" component={Game} />
                {this.props.userLogged && this.props.userLogged.rol === "admin" ? <Route path="/admin" component={AdminPanel} /> : null}
                {!localStorage.getItem('token') && <Route path="/access" component={Access} />}
                <Redirect to="/" />
            </Switch>
            {localStorage.getItem('token') && this.props.userLogged && <Chat />}
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

}

export default connect(mapStateToProps,mapDispatchToProps)(App)