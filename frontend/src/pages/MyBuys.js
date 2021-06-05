import React from "react"
import { connect } from "react-redux"
import Header from "../components/Header";
import buyActions from "../redux/actions/buyActions";
import Loader from '../components/Loader';
import ProductBuyed from "../components/ProductBuyed";
import { NavLink } from 'react-router-dom'


class MyBuys extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    token= localStorage.getItem('token')

    
    componentDidMount(){
        this.toTop()
        this.props.loadBuys(this.props.userLogged.id, this.token)
    }

    
    render() {
            if (!this.props.buyList) {
                return <Loader/>
                
            } else{
            
            return(
                <>
                    <Header props={this.props.history}/>
                    <div className='containerMyBuys animate__animated animate__fadeIn'>
                        {this.props.buyList.length 
                        ? this.props.buyList.map(buy => {
                            return  <div key={buy._id} className='cadaDivArticulosComprados'>                               
                                            <div className='infoPrincipalDeLaCompra'>
                                                <h1>Date: {buy.date.slice(5,10)}-{buy.date.slice(0,4)} at {buy.date.slice(11,19)} Hs</h1>
                                                <h1>Total: ${buy.totalPrice}</h1>
                                            </div>
                                            <div className='infoDelivetyDeLaCompra'>
                                                <h1 className='tituloInfoDelivery'>Delivery information: </h1>
                                                <div className='divContenidoInfoDelivery'>
                                                    <div className='infoPersonalDisplay'>
                                                        <h3>Name: </h3><p>{buy.deliverInformation[0].firstName} {buy.deliverInformation[0].lastName}</p>
                                                    </div>
                                                    <div className='infoPersonalDisplay'>
                                                        <h3>Direction: </h3><p>{buy.deliverInformation[0].direction} - {buy.deliverInformation[0].city}</p>
                                                    </div>
                                                    <div className='infoPersonalDisplay'>
                                                        <h3>Cellphone Number: </h3><p>{buy.deliverInformation[0].cellphone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='infoProductosDeLaCompra'>
                                                <h2 className='tituloProductosComprados'>Products adquired:</h2>
                                                    {buy.products.map(product =>{
                                                        return <ProductBuyed key={product._id} product={product}/>
                                                    })}                              
                                            </div>
                                    </div>
                        })
                        :<div className='divContainerMyBuysSinCompras'>
                            <h1>Your list of buys is empty</h1> 
                            <div>
                                <NavLink to='/games'><p className='botonIrAGamesBuy'>Games</p></NavLink>
                                <NavLink to='/hardware'><p className='botonIrAHardwareBuy'>Hardwares</p></NavLink>
                                <NavLink to='/'><p className='botonIrAHomeBuy'>Home</p></NavLink>
                            </div>
                        </div>                 
                        }
                    </div> 
                </>       
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged,
        buyList: state.userReducer.buyList
    }
}
const mapDispatchToProps = {
    loadBuys: buyActions.loadBuys,
}


export default connect(mapStateToProps, mapDispatchToProps)(MyBuys)
