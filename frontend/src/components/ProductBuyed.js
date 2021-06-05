import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'

const ProductsBuyed = (props)=>{

    
    return(
        <div className='cadaDivProductoComprado'>
            <div className='divBannerProductBuyed'>
                <div className='bannerProductBuyed' style={{backgroundImage:`url("${props.product.imageBanner}")`}}></div>
            </div>
            <div className='divInfoProductCart'>
                <p>{props.product.title}{props.product.productName}</p>
            </div>
            <div className='divPriceAmountCart'>
                <div className='priceEnProductosComprados'>
                        <p>Unit</p>
                        <p>Price:</p>
                        <p>${props.product.price}</p>
                    {props.product.discount 
                    ?<div className='priceEnProductosComprados'>
                        <p>Discount:</p>
                        <p>{props.product.discount}</p>
                    </div>
                    : null}
                </div>
                <div className='amountCart'>
                </div>
                <div className='priceEnProductosComprados'>
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