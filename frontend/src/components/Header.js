import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import userActions from '../redux/actions/userActions'
const Header = (props) =>{ 


    return(
        <div className='containHeader'>
            <div className='logoHeader'>
                <div className='gifLogo' style={{backgroundImage:'url("../assets/logoGif.gif")'}}></div>
                <h1 className='nameLogoHeader'>Game-X</h1>
            </div>
            <div className='navHeader'>
                <NavLink to='/'><p className='linkHeaderNav'>Home</p></NavLink>
                <NavLink to='/store'><p className='linkHeaderNav'>Store</p></NavLink>
                {!props.userLogged && <NavLink to='/access'><p className='linkHeaderNav'>Access</p></NavLink>}
            </div>
        </div>       
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged
    }
  }
  const mapDispatchToProps = {
    forcedLoginByLS :  userActions.forcedLoginByLS,
  
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Header)