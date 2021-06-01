import ProductCard from "./ProductCard"
import { connect } from 'react-redux'
import { useEffect, useState } from "react"

const Cart = (props)=>{
    const [total, setTotal]=useState(0)
    const[subTotal, setSubTotal]=useState(0)
    useEffect(()=>{
        setTotal(subTotal)
    },[subTotal])
    return (
        <div className='modalCartContain'>
            <div className='modalCart'>
                <div className='divDisplayProducts'>
                    <div className='divProducts'>
                        {props.allCart.length 
                            ? props.allCart.map((articulo, i) => {
                                return <ProductCard key={i} articulo={articulo} setSubTotal={setSubTotal}/>
                            })
                            :<h1>No has añadido ningun articulo al carrito</h1>}
                    </div>
                    <div className='buttonsCart'>
                        <p className='buttonCloseModalCancel' onClick={props.openCloseModal}>Seguir Comprando</p>
                        <p className='buttonCloseModalBuy'>Realizar Compra</p>
                        <div>
                            <p>TOTAL: </p>
                            <p>${total}</p>
                        </div>
                    </div>
                </div>
                <div className='logoCart'>
                    <div className='gifLogoCart' style={{backgroundImage:'url("../assets/logoGif.gif")'}}>

                    </div>
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