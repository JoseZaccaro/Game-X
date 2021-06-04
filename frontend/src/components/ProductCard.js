import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'

const ProductCard = (props)=>{
    
    const [cantidadAMostrar, setCantidadAMostrar] = useState(1)

    const deleteProductCart = ()=>{
        props.deleteToCart(props.articulo._id)
    }

    const removeOneUnit = () =>{
        props.setTotal(parseInt(props.total) - parseInt(precioUnitario))
        setCantidadAMostrar(cantidadAMostrar-1)
    }

    const addOneUnit = () =>{
        props.setTotal(parseInt(props.total) + parseInt(precioUnitario))
        setCantidadAMostrar(cantidadAMostrar+1)
    }

    const precioUnitario = props.articulo.discount ? (-props.articulo.price * props.articulo.discount / 100 + props.articulo.price).toFixed(0) : props.articulo.price
    const precioUnitarioFinal= (precioUnitario * cantidadAMostrar).toFixed(0)



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
                    <p>${precioUnitario}</p>
                </div>
                <div className='amountCart'>
                    <p>Cantidad:</p>
                    <p className='buttonSumCart' onClick={addOneUnit} >+</p>
                    <p>{cantidadAMostrar}</p>
                    {cantidadAMostrar > 1 
                        ? <p className='buttonRestCart' onClick={removeOneUnit} >-</p>
                        : <p className='buttonRestCartBloq'>-</p>
                    }
                    
                </div>
                <div className='divTotalCartProduct'>
                    <p>Total:</p>
                    <p>${precioUnitarioFinal}</p>
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