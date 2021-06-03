import ProductCard from "./ProductCard"
import { connect } from 'react-redux'
import { useState } from "react"
import { NavLink } from "react-router-dom"
import swal from "sweetalert"


const Cart = (props)=>{
    const [total, setTotal]=useState(0)   
    const arraySubTotales = []
    const sendSubTotal = (precioSub, idArt)=>{
        arraySubTotales.map(art=> {
            if(idArt === art.id){
                art.subtotal = precioSub
                return art
            }
            return art
        })
        
        var sumSubTotal = 0
        arraySubTotales.map(art =>{
            sumSubTotal += art.subtotal
        })
        setTotal(sumSubTotal)  
    }

    props.allCart.length && props.allCart.map(art=> arraySubTotales.push({id:art._id, subtotal:art.price}))

    const proceedToPayment = ()=>{
        props.userLogged && total
        ? props.props.push('/payment')
        : !props.userLogged 
            ? swal( 'you must be logged to proceed', '', 'error') 
            : swal("you don't have products on your cart", '', 'error')
    }

    
    return (
        <div className='modalCartContain'>
            <div className='modalCart'>
                <div className='divDisplayProducts'>
                    <div className='divProducts'>
                        {props.allCart.length 
                            ? props.allCart.map((articulo, i) => {
                                return <ProductCard key={i} articulo={articulo} sendSubTotal={sendSubTotal}/>
                            })
                            :<div className='divSinArtCart'>
                                <h1>You don't have any product on your cart!</h1>
                                <NavLink to='/games'><p className='botonStoreCart'>Go to Game Store!</p></NavLink>
                                <NavLink to='/hardware'><p className='botonStoreCart'>Go to Hardware Store!</p></NavLink>
                            </div>}
                    </div>
                    <div className='buttonsCart'>
                        <p className='buttonCloseModalCancel' onClick={props.openCloseModal}>Keep looking</p>
                        <p className='buttonCloseModalBuy' onClick={proceedToPayment}>Finish buy</p>
                        <div className='totalPriceCart'>
                            <p>TOTAL: </p>
                            <p>${total}</p>
                        </div>
                    </div>
                </div>
                <div className='logoCart'>
                    <div className='gifLogoCart' style={{backgroundImage:'url("../assets/logoGif.gif")'}}>                 </div>
                </div>
                <p className='closeModalCart' onClick={props.openCloseModal}>X</p>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        allCart: state.cartReducer.allCart,
        userLogged:state.userReducer.userLogged
    }
}
export default connect(mapStateToProps)(Cart)