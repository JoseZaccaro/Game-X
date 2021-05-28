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
import Administrator from './pages/Administrator';
import userActions from "./redux/actions/userActions";
import { connect } from 'react-redux';
import Product from './pages/Product';


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


      return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/store" component={Store} />
                <Route path="/payment" component={Payment} />
                <Route path="/administrator" component={Administrator} />
                <Route path="/serverdown" component={ServerDown} />
                <Route path="/product/:id" component={Product} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={LogIn} />
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

}

export default connect(mapStateToProps,mapDispatchToProps)(App)