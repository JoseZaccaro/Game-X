import { useEffect, useState } from 'react';
import Header from './Header'
import { connect } from 'react-redux';
import hardwareActions from '../redux/actions/hardwareActions';
import gamesActions from '../redux/actions/gamesActions';
import Loader from '../components/Loader';
import userActions from '../redux/actions/userActions';
import { CgPlayListRemove, CgPlayListAdd } from "react-icons/cg";
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import cartActions from '../redux/actions/cartActions';
import { NavLink } from 'react-router-dom';


const Hardware = (props) => {
    
    const [myList, setMyList] = useState({ myList: props.userLogged ? props.userLogged.favouritesList : [], fetching: false })
    const token= localStorage.getItem('token')

    const hardwareId = props.hardware._id
                  
    var hardwareFounded = props.userLogged && myList.myList ? myList.myList.some(hardwareAdded => hardwareAdded.productId === hardwareId): false
                    
    const sendHardwareToList = async(product) =>{
        setMyList({...myList, fetching:true})
        const add = {product, add:true, game:false}
        const remove = {product, add:false, game:false}
        const sendedData = hardwareFounded ? remove : add
        const response = await props.addToMyList(sendedData, token, props.userLogged.id)
          setMyList({myList: response.favouritesList, fetching: false})     
      }
                    
    const [inCart, setInCart]=useState(false)
    const addToCart = ()=>{
        setInCart(!inCart)
        props.addToCart(props.hardware)
    }
    const removeToCart = ()=>{
        setInCart(!inCart)
        props.deleteToCart(props.hardware._id)
    }
    return (
        <div className='cardHardwareIndiv'>
            <div className='allInfoProductHardware'>
                <div className='titleProductHardware'><h2>{props.hardware.productName}</h2></div>
                <div className='descriptionProductHardware'>
                    <p className='pTituloInfoSecHard'>Description: </p>
                    <p className='pDescriptionProductHardware'>{props.hardware.description}</p>
                </div>
                <div>
                    <p className='pTituloInfoSecHard'>Features: </p>
                    {props.hardware.features.map(feature =><p className='pDescriptionProductHardware'>{feature}</p>)}
                </div>
                <div className='priceProductHardware'>
                    <p className='priceHardware'>{props.hardware.price}</p>
                    {!inCart 
                        ? <p className='addToCartHardware' onClick={addToCart}>Add To Cart <FontAwesomeIcon icon={faShoppingCart}/></p>
                        : <p className='addToCartHardware' onClick={removeToCart}>Remove From Cart <FontAwesomeIcon icon={faShoppingCart}/></p>}
                    {!hardwareFounded 
                        ? <Tooltip title="Add to Wishlist" placement="top" > 
                            <div>
                                <CgPlayListAdd  onClick={()=> !myList.fetching ? sendHardwareToList(hardwareId): null} className='addToWishListOnComponentHard'/>
                            </div>
                        </Tooltip>
                        : <Tooltip title="Remove from Wishlist" placement="top" >
                            <div>
                                <CgPlayListRemove  onClick={()=> !myList.fetching ? sendHardwareToList(hardwareId): null} className='removeFromWishListOnComponent'/>
                            </div>
                        </Tooltip>
                    }
                    
                </div>
            </div>
            <div className='imgButtonProductHardware'>
                <div className='imgProductHardwareCard' style={{backgroundImage:`url('${props.hardware.imageBanner}')`}}></div>
            </div>
        </div>
             
    )
}
const mapStateToProps = (state) => {
    return {
        allHardwares: state.hardwareReducer.allHardwares,
        preLoader: state.hardwareReducer.preLoader,
        allGames: state.gamesReducer.allGames,
        preLoaderGames: state.gamesReducer.preLoader,
        userLogged: state.userReducer.userLogged,
        allCart: state.cartReducer.allCart
    }
}
const mapDispatchToProps = {
    loadHardwares: hardwareActions.loadHardwares,
    loadGames: gamesActions.loadGames,
    addToMyList :  userActions.addToMyList,
    addToCart: cartActions.addToCart,
    deleteToCart: cartActions.deleteToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Hardware)