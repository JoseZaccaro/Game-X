import React from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { NavLink } from "react-router-dom"
import userActions from "../redux/actions/userActions";
import { connect } from "react-redux"
import swal from 'sweetalert'
import GoogleLogin from 'react-google-login';
import axios from "axios";


class SignUp extends React.Component{
    toTop= () => {window.scroll({
        top:0, 
        left:0,
        behavior:"smooth"
    })}

    state={
        countries:[],
        userInfo:{
            userName: "",
            country: "",
            password:"",
            avatar: "",
            email: "",
        },
        validator:{
            userName: "",
            country: "",
            password:"",
            avatar: "",
            email: "",
        },
    }

    
    loadImage = e => {
        this.setState({
            ...this.state,
            userInfo:{...this.state.userInfo,
            avatar: e.target.files[0]}
        })
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
       const formData = new FormData()
       formData.append('userName', this.state.userInfo.userName)
       formData.append('avatar', this.state.userInfo.avatar) 
       formData.append('country', this.state.userInfo.country)
       formData.append('email', this.state.userInfo.email)
       formData.append('password', this.state.userInfo.password)
       let userInfo= e ? formData : googleUser
            const respuesta = await this.props.newUser(userInfo)
                if (!respuesta) {
                    return this.props.history.push('/serverdown') 
                }else if (respuesta.message) {
                    swal(respuesta.message,"", "error")                
                } else {
                    switch(respuesta){
                        case 'The E-mail is already in use':
                            swal("The E-mail is already in use", "Try another one!", "error")
                            break
                        case 'There was an error in the register.':
                            swal("There was an error in the register.", "Please verify all the required fields are completed.", "error")
                            break
                        default:
                            return swal("Signed Up!", respuesta, "success")
                    }
                }                     
    }  

    
    validate = (e) => {
        const field = e.name
        var message = null
        var expression;
        var invalid = "is-invalid"
        var valid = " is-valid"
        if (e.value.length !== 0) {
            switch(field){
                case 'userName' :
                    expression= /^[a-z ']{2,14}$/i
                    message= !e.value.match(expression) 
                    break
                case 'lastName':
                    expression= /^[a-z ']{2,14}$/i
                    message= !e.value.match(expression) 
                    break
                case 'email':
                    expression= (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/)
                    message= !e.value.match(expression)   
                    break
                case 'password':
                    expression= /(?=.*\d)(?=.*[A-z])/
                    message = e.value.length < 6 || !e.value.match(expression)
                    break
                case 'avatar':
                    message= e.value.length === 0 || e.value.length <=3
                    break  
                default:
                    return null
            }
        }        
        this.setState({
            ...this.state,
            validator:{...this.state.validator,
                [field]:  message === null ? "" : !message ? valid : invalid}
        })
    }
    
    componentDidMount(){  
        this.toTop()
        axios.get(`https://restcountries.eu/rest/v2/all`)
        .then(response => this.setState({...this.state, countries: response.data}))
        .catch(error => this.props.history.push('/serverdown'))      
    }    
    responseGoogle = (response) => {
        if (response.error) {
            swal("The Google popup was closed too early!", "Try again!", "error")
        } else{
        const {email, googleId, imageUrl } = response.profileObj
        this.send(null, {userName: email, email: email, password: "matias"+googleId, imageUrl: imageUrl, country: "null", avatar:imageUrl})
        }
    }

    
    render() {
        return(
            <div>
                <div className="granContenedor">
                    <Header/>
                    <main className= "backgroundSign" style={{backgroundImage: "url('./img/backgroundSign.jpg')"}}>
                        <div className="animate__animated animate__fadeInDown formCard">
                            <h2>Join to our World of Adventures!</h2>
                            <h4>Already have an account?<NavLink exact to="/login"> Log in!</NavLink></h4>
                            <form className="needs-validation">
                                <div>
                                    <input className={`form-control ${this.state.validator.userName}`} onBlur={(e) => this.validate(e.target)} type="text" placeholder="Choose your Username" name="userName" value={this.state.userInfo.userName} onChange={this.readInput} ></input>  
                                </div>                              
                                <div>
                                    <input className={`form-control ${this.state.validator.email}`} onBlur={(e) => this.validate(e.target)} type="text" placeholder="E-Mail" name="email" value={this.state.userInfo.email} onChange={this.readInput} ></input>
                                </div>
                                <div>
                                    <input id="password" autoComplete="off" className={`form-control ${this.state.validator.password}`} onBlur={(e) => this.validate(e.target)} type="password" placeholder="Password" name="password" value={this.state.userInfo.password} onChange={this.readInput}></input>                                    
                                    <p className="aclaration">Password must have min. 6 characters and at least 1 letter and 1 number </p>
                                </div>
                                <div>
                                    <input className={`form-control ${this.state.validator.avatar}`} onBlur={(e) => this.validate(e.target)} type="file" name="avatar" id="avatar"  onChange={this.loadImage}></input>
                                </div>      
                                <div className="country">
                                    <select className={`form-control ${this.state.validator.country}`} onClickCapture={(e) => this.validate(e.target)} type="select" placeholder="Country" name="country" value={this.state.userInfo.country} onChange={this.readInput}>
                                        <option disabled value="">Choose your Country</option>
                                        {this.state.countries.length && 
                                         this.state.countries.map((country, index) =>{
                                            return <option key={index}>{country.name}</option>
                                        })}
                                </select>  
                                </div>
                                <div className="submitYGoogle">
                                    <button className="submit" onClick={(e)=>this.send(e)}>Create Account</button> 
                                    <GoogleLogin
                                        clientId="768453080794-ldth5cg2rmpvlb0k55f08gdigaba5nj0.apps.googleusercontent.com"
                                        render={renderProps => (
                                            <button className="googleButton" onClick={renderProps.onClick} disabled={renderProps.disabled}><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>Sign up with Google</button>
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
    newUser: userActions.newUser
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)