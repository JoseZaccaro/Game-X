import { NavLink } from 'react-router-dom'
import { CgPlayListRemove, CgPlayListAdd } from "react-icons/cg";
import { connect } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';


const CardProduct = (props) => {
    const { image, title, idGame } = props

    const [myList, setMyList] = useState({ myList: props.userLogged ? props.userLogged.favouritesList : [], fetching: false })


    const token= localStorage.getItem('token')
  
    var gameFounded = props.userLogged && myList.myList ? myList.myList.some(gameAdded => gameAdded.gameId === idGame): false
    
    const sendGameToList = async(game) =>{
      setMyList({...myList, fetching:true})
      const add = {game, add:true}
      const remove = {game, add:false}
      const sendedData = gameFounded ? remove : add
      const response = await props.addToMyList(sendedData, token, props.userLogged.id)
        setMyList({myList: response.favouritesList, fetching: false})     
    }
        

    return (
            <>
                {!gameFounded 
                ? <Tooltip title="Add to Wishlist" placement="top-end" className='tooltipWishlist'> 
                    <div>
                      <CgPlayListAdd  onClick={()=> !myList.fetching ? sendGameToList(idGame): null} className='addToWishlist'/>
                    </div>
                  </Tooltip>
                : <Tooltip title="Remove from Wishlist" placement="top-end" className='tooltipWishlist'>
                    <div>
                      <CgPlayListRemove  onClick={()=> !myList.fetching ? sendGameToList(idGame): null} className='removeFromWishList'/>
                    </div>
                  </Tooltip>
                }
                {<NavLink to={`/game/${idGame}`}>
                        <figure className="card contentRibbon">
                            {props.discount && <div class="ribbon"><span>OFFER</span></div>}
                            <div className="cardImageProduct" style={{backgroundImage: `url("${image}")`}}></div>
                            <figcaption>{title}</figcaption>
                        </figure>
                </ NavLink>}       
            </>
    );
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged
    }
  }
  const mapDispatchToProps = {
    addToMyList :  userActions.addToMyList,
  
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(CardProduct)