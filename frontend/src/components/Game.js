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


const Game = (props) => {
    const [gameDetails, setGameDetails] = useState(null)
    const [myList, setMyList] = useState({ myList: props.userLogged ? props.userLogged.favouritesList : [], fetching: false })

    useEffect(() => {
        if (props.allGames.length === 0) {
            props.history.push('/store')
        }
        if (!gameDetails) {
            let idGame = props.match.params.id
            let gameFilter = props.allGames.find(game => game._id === idGame)
            setGameDetails({
               ...gameFilter
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const token= localStorage.getItem('token')

    const idGame = props.match.params.id
  
    var gameFounded = props.userLogged && myList.myList ? myList.myList.some(gameAdded => gameAdded.gameId === idGame): false
    
    const sendGameToList = async(game) =>{
      setMyList({...myList, fetching:true})
      const add = {game, add:true}
      const remove = {game, add:false}
      const sendedData = gameFounded ? remove : add
      const response = await props.addToMyList(sendedData, token, props.userLogged.id)
        setMyList({myList: response.favouritesList, fetching: false})     
    }
        
    const [inCart, setInCart]=useState(false)
    const addToCart = ()=>{
        setInCart(!inCart)
        props.addToCart(gameDetails)
    }
    const removeToCart = ()=>{
        setInCart(!inCart)
        props.deleteToCart(gameDetails._id)
    }


    return (
        <>
            {!gameDetails
                ? <Loader />
                : (
                    <>
                        <Header props={props.history}/>
                        <div className='containGameComp'>
                            <div className='containBoxGame'>
                                <div className='imgBanerBkGame' style={{ backgroundImage: `url('${gameDetails.imagesBackground[0]}')` }}></div>
                                <div className='imgPortadaBkGame' style={{ backgroundImage: `url('${gameDetails.imageBanner}')` }}></div>
                                <div className='infoFastGame'>
                                    <h2 className='titleGameCard'>{gameDetails.title}</h2>
                                    <p className='yearGameCard'>({gameDetails.year})</p>
                                </div>
                                <div className='divTagsGame'>
                                    {gameDetails.genre.map((genero, i) => {
                                        return <p key={i} className='tag'>{genero}</p>
                                    })}
                                </div>
                                <div className='descriptionPrice'>
                                    <div className='divAddCart'>
                                        <p className='priceGame'>${gameDetails.price}</p>
                                        {!inCart 
                                            ? <p className='addToCartGame' onClick={addToCart}>Add To Cart <FontAwesomeIcon icon={faShoppingCart}/></p>
                                            : <p className='addToCartGame' onClick={removeToCart}>Remove From Cart <FontAwesomeIcon icon={faShoppingCart}/></p>}
                                        {!gameFounded 
                                        ? <Tooltip title="Add to Wishlist" placement="center" > 
                                            <div>
                                                <CgPlayListAdd  onClick={()=> !myList.fetching ? sendGameToList(idGame): null} className='addToWishListOnComponent'/>
                                            </div>
                                        </Tooltip>
                                        : <Tooltip title="Remove from Wishlist" placement="center" >
                                            <div>
                                                <CgPlayListRemove  onClick={()=> !myList.fetching ? sendGameToList(idGame): null} className='removeFromWishListOnComponent'/>
                                            </div>
                                        </Tooltip>
                                        }
                                        
                                    </div>
                                    <div className='divDescriptionGameCard'>
                                        <p className='pDescriptionTitle'>Description:</p>
                                        <p className='pDescriptionContent'>{gameDetails.description}</p>
                                    </div>
                                </div>
                                <div className='divInfoSecondCardGame'>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Plataform:</p>
                                        {gameDetails.platform.map((plataform, i) => {
                                            return <p key={i} className='tagPlataform'>{plataform}</p>
                                        })}
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Pegi:</p>
                                        <p>{gameDetails.PEGI}</p>
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Developer:</p>
                                        <p>{gameDetails.developer}</p>
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Language:</p>
                                        {gameDetails.language.map((lenguaje,i) => {
                                            return <p key={i}>{lenguaje}</p>
                                        })}
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Multiplayer:</p>
                                        {gameDetails.multiplayer ? <p>Yes</p> : <p>No</p>}
                                    </div>
                                    <div className='cadaDivInfoSec'>
                                        <p className='pTituloInfoSec'>Valoration:</p>
                                        <p>{gameDetails.valoration}</p>
                                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Game)