import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions"
import swal from 'sweetalert'
import GoogleLogin from 'react-google-login';


class LogIn extends React.Component{
    toTop= () => {window.scroll({
        top:0, 
        left:0,
        behavior:"smooth"
    })}
    
    state={
        userInfo:{
            password:"",
            userName: "",
        }
        
    }

    readInput = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            userInfo:{...this.state.userInfo,
            [field]: value}
        })
    })


    send = async (e = null, googleUser = null) => {
        e && e.preventDefault()
        let userInfo= e ? this.state.userInfo : googleUser
        const respuesta = await this.props.logUser(userInfo)
        if (!respuesta) {
            return this.props.history.push('/serverdown')            
        } else if (respuesta.error) {
            swal(respuesta.error, "Verify and try again!", "error")
        } else {
            swal("Loged in correctly!", respuesta, "success")
        }   
    }
    
        
    responseGoogle = (response) => {
        if (response.error) {
            swal("The Google popup was closed too early!", "Try again!", "error")
        } else{
        const {email, googleId} = response.profileObj
        this.send(null,{userName: email, password: "matias"+googleId, country: "null"})
        }
    }

    componentDidMount(){  
        this.toTop()             
    }   

    render() {
        return(
            <div>
                <div className="granContenedor">
                    <Header/>
                    <main className= "backgroundSign" style={{backgroundImage: "url('./img/backgroundSign.jpg')"}}>
                        <div className="animate__animated animate__fadeInDown formCard logIn">
                            <h2>Log In with your account!</h2>
                            <h4>Don't have an account?<NavLink exact to="/signup"> Sign up!</NavLink></h4>
                            <form>
                                <div>
                                    <input type="text" placeholder="Username" name="userName" value={this.state.userInfo.userName} onChange={this.readInput} ></input>
                                </div>                                
                                <div>
                                    <input autoComplete="off" type="password" placeholder="Password" name="password" value={this.state.userInfo.password} onChange={this.readInput}></input> 
                                </div> 
                                <div className="submitYGoogle">                               
                                    <button className="submit" onClick={this.send}>Log In</button> 
                                    <GoogleLogin
                                            clientId="768453080794-ldth5cg2rmpvlb0k55f08gdigaba5nj0.apps.googleusercontent.com"
                                            render={renderProps => (
                                                <button className="googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>Log in with Google</button>
                                              )}
                                            onSuccess={this.responseGoogle}
                                            onFailure={this.responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                    /> 
                                </div>                      
                            </form>                          
                        </div>
                        
                    </main>
                    <Footer className="footer"/>
                </div>  
            </div>      
        )
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged
    }
}
const mapDispatchToProps = {
    logUser: userActions.logUser
}


export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
