import { useEffect, useState } from "react"
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'

const ProductsBuyed = (props)=>{

    
    return(
        <div className='containerProductBuyed'>
            <div className='divBannerProductBuyed'>
                <div className='bannerProductBuyed' style={{backgroundImage:`url("${props.product.imageBanner}")`}}></div>
            </div>
            <div className='divInfoProductCart'>
                <p>{props.product.title}{props.product.productName}</p>
            </div>
            <div className='divPriceAmountCart'>
                <div className='priceCart'>
                    <div>
                        <p>Precio:</p>
                        <p>${props.product.price}</p>
                    </div>
                    {props.product.discount 
                    ?<div>
                        <p>Discount:</p>
                        <p>{props.product.discount}</p>
                    </div>
                    : null}
                </div>
                <div className='amountCart'>
                </div>
                <div className='divTotalCartProduct'>
                    <p>Total:</p>
                    <p>${props.product.discount 
                        ? (( props.product.price - props.product.price * props.product.discount / 100)).toFixed(0)
                        :props.product.price }
                    </p>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = {
    deleteToCart: cartActions.deleteToCart
}
export default connect(null, mapDispatchToProps)(ProductsBuyed)