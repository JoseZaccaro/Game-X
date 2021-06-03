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
    const [hardwareDetails, setHardwareDetails] = useState(null)
    const [aditionalGame, setaditionalGame] = useState(null)
    const [myList, setMyList] = useState({ myList: props.userLogged ? props.userLogged.favouritesList : [], fetching: false })

    useEffect(() => {
        if (props.allHardwares.length === 0) {
            props.history.push('/hardware')
        }
            let hardwareId = props.match.params.id
            let hardwareFilter = props.allHardwares.find(hardware => hardware._id === hardwareId)
            setHardwareDetails({
               ...hardwareFilter
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.match.params.id])

    const token= localStorage.getItem('token')

    const hardwareId = props.match.params.id
  
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
        props.addToCart(hardwareDetails)
    }
    const removeToCart = ()=>{
        setInCart(!inCart)
        props.deleteToCart(hardwareDetails._id)
    }

    return (
        <>
            {!hardwareDetails
                ? <Loader />
                : (
                    <>
                        <Header props={props.history}/>
                        <div className='containGameComp'>
                            <div className='containBoxGame'>
                                <div className='imgBanerBkHardware' style={{ backgroundImage: `url('${hardwareDetails.imagesBackground[0]}')` }}></div>
                                <div className='imgPortadaBkHardware' style={{ backgroundImage: `url('${hardwareDetails.imageBanner}')` }}></div>
                                <div className='infoFastGame'>
                                    <h2 className='titleGameCard'>{hardwareDetails.productName}</h2>
                                </div>
                                <div className='descriptionPriceHardware'>
                                    <div className='divAddCartHardware'>
                                        <p className='priceHardware'>${hardwareDetails.price}</p>
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
                                    <div className='divDescriptionHardwareCard'>
                                        <p className='pDescriptionTitle'>Description:</p>
                                        <p className='pDescriptionContent'>{hardwareDetails.description}</p>
                                    </div>
                                </div>
                                <div className='divInfoSecondCardHardware'>
                                    <div className='cadaDivInfoSecHard'>
                                        <p className='pTituloInfoSecHard'>Brand:</p>
                                        <p className='pTituloInfoSecHard'>{hardwareDetails.brand}</p>
                                    </div>
                                    <div className='cadaDivInfoSecHard'>
                                        <p className='pTituloInfoSecHard'>Stock:</p>
                                        <p className='pTituloInfoSecHard'>{hardwareDetails.stock > 5 ? hardwareDetails.stock + " unities" : !hardwareDetails < 1 ? hardwareDetails.stock+" Last unities" : "Out of Stock"} </p>
                                    </div>
                                    <div className='cadaDivInfoSecHardFeatures'>
                                        <p className='pTituloInfoSecHardFeatures'>Features:</p>
                                        <ul className="featuresUl">
                                            {hardwareDetails.features[0] && <li className="featuresLi">{hardwareDetails.features[0]}</li>}
                                            {hardwareDetails.features[1] && <li className="featuresLi">{hardwareDetails.features[1]}</li>}
                                            {hardwareDetails.features[2] && <li className="featuresLi">{hardwareDetails.features[2]}</li>}
                                            {hardwareDetails.features[3] && <li className="featuresLi">{hardwareDetails.features[3]}</li>}
                                            {hardwareDetails.features[4] && <li className="featuresLi">{hardwareDetails.features[4]}</li>}
                                            {hardwareDetails.features[5] && <li className="featuresLi">{hardwareDetails.features[5]}</li>}
                                            {hardwareDetails.features[6] && <li className="featuresLi">{hardwareDetails.features[6]}</li>}
                                            {hardwareDetails.features[7] && <li className="featuresLi">{hardwareDetails.features[7]}</li>}
                                        </ul>
                                    </div>
                                    {aditionalGame && 
                                        <NavLink to={`/game/${aditionalGame._id}`}>
                                            <div className='imgPortadaBkGameAditional' style={{ backgroundImage: `url('${aditionalGame.imageBanner}')` }}>
                                                
                                            </div>
                                        </NavLink>
                                            }

                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
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