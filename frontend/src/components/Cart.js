import ProductCard from "./ProductCard"
import { connect } from 'react-redux'
import { useState } from "react"

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
    console.log(props.allCart)
    props.allCart.length && props.allCart.map(art=> arraySubTotales.push({id:art._id, subtotal:art.price}))
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
                                <h1>No has añadido ningun articulo al carrito</h1>
                                <p className='botonStoreCart'>Store</p>
                            </div>}
                    </div>
                    <div className='buttonsCart'>
                        <p className='buttonCloseModalCancel' onClick={props.openCloseModal}>Seguir Comprando</p>
                        <p className='buttonCloseModalBuy'>Realizar Compra</p>
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
        allCart: state.cartReducer.allCart
    }
}
export default connect(mapStateToProps)(Cart)