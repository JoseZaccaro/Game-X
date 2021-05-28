import {NavLink} from 'react-router-dom'
const Header = () =>{ 
    return(
        <div className='containHeader'>
            <div className='logoHeader'>
                <div className='gifLogo' style={{backgroundImage:'url("../assets/logoGif.gif")'}}></div>
                <h1 className='nameLogoHeader'>Game-X</h1>
            </div>
            <div className='navHeader'>
                <NavLink to='/'><p className='linkHeaderNav'>Home</p></NavLink>
                <NavLink to='/store'><p className='linkHeaderNav'>Store</p></NavLink>
                <NavLink to='/access'><p className='linkHeaderNav'>Access</p></NavLink>
            </div>
        </div>       
    )
}

export default Header