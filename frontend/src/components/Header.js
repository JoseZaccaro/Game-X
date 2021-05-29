import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import swal from 'sweetalert'
import userActions from '../redux/actions/userActions'


const Header = (props) =>{ 


    const logOut=(()=> {
        swal({
            title: "Are you sure that you want to Log Out?",
            text: "You can Log in again, anyway",
            icon: "warning",
            buttons: ["No Way!", "I'm Sure!"],
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                props.removeUserInfo()
                swal("Okay then, see you later!", {
                    icon: "success",
              });
            } 
          });
    })
    
    let image = ""
    
    if ( props.userLogged  && props.userLogged.imageUrl) {
        image = props.userLogged.imageUrl
    } else if ( props.userLogged && !props.userLogged.imageUrl && props.userLogged.avatar) {
        image = "/client/build/assets/60b2c7b6723fdb1630b75246.jpg"        
    } else {
        image = "assets/generic-user-icon.jpg"
    }
    

    return(
        <div className='containHeader'>
            <div className='logoHeader'>
                <div className='gifLogo' style={{backgroundImage:'url("../assets/logoGif.gif")'}}></div>
                <h1 className='nameLogoHeader'>Game-X</h1>
            </div>
            <div className='navHeader'>
                <NavLink to='/'><p className='linkHeaderNav'>Home</p></NavLink>
                <NavLink to='/store'><p className='linkHeaderNav'>Store</p></NavLink>
                {props.userLogged && props.userLogged.rol === "admin" && <NavLink to='/admin'><p className='linkHeaderNav'>Adm Panel</p></NavLink>}
                {!props.userLogged && <NavLink to='/access'><p className='linkHeaderNav'>Access</p></NavLink>}
            </div>
            <div className='profileBody'>
                <div className="nav">
                    <input type="checkbox"/>
                    <div style={{backgroundImage: `url("${image}")`}} className="avatarHeader" ></div>
                        <div className="menu">
                            <li onClick={(e)=>logOut(e.target)}>LogOut</li>
                        </div>
                </div>
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
    removeUserInfo :  userActions.removeUserInfo,
  
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Header)