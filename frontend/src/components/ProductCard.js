import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'

const ProductCard = (props)=>{
    
    const [cantidadAMostrar, setCantidadAMostrar] = useState(1)
    const deleteProductCart = ()=>{
        props.deleteToCart(props.articulo._id)
    }
    useEffect(()=>{
        props.setSubTotal(props.articulo.price * cantidadAMostrar)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cantidadAMostrar])
    
    return(
        <div className='cadaDivProduct'>
            <div className='divImgPortadaProductCart'>
                <div className='imgPortadaProductCart' style={{backgroundImage:`url("${props.articulo.imageBanner}")`}}></div>
            </div>
            <div className='divInfoProductCart'>
                <p>{props.articulo.title}</p>
            </div>
            <div className='divPriceAmountCart'>
                <div className='priceCart'>
                    <p>Precio:</p>
                    <p>${props.articulo.price}</p>
                </div>
                <div className='amountCart'>
                    <p>Cantidad:</p>
                    <p className='buttonSumCart' onClick={()=>setCantidadAMostrar(cantidadAMostrar+1)}>+</p>
                    <p>{cantidadAMostrar}</p>
                    {cantidadAMostrar > 1 
                        ? <p className='buttonRestCart' onClick={()=>setCantidadAMostrar(cantidadAMostrar-1)} >-</p>
                        : <p className='buttonRestCartBloq'>-</p>
                    }
                    
                </div>
                <div className='divTotalCartProduct'>
                    <p>Total:</p>
                    <p>${props.articulo.price * cantidadAMostrar}</p>
                </div>
            </div>
            <div className='deleteProductCard'>
                <p onClick={deleteProductCart}>Eliminar</p>
            </div>
        </div>
    )
}
const mapDispatchToProps = {
    deleteToCart: cartActions.deleteToCart
}
export default connect(null, mapDispatchToProps)(ProductCard)