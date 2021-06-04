import React from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions";
import swal from 'sweetalert'
import Header from "../components/Header";
import buyActions from "../redux/actions/buyActions";
import Loader from '../components/Loader';
import ProductBuyed from "../components/ProductBuyed";


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
            console.log(this.props.buyList)
            if (!this.props.buyList) {
                return <Loader/>
                
            } else{
            
            return(
                <>
                    <Header props={this.props.history}/>
                    <div className='containerMyBuys animate__animated animate__fadeIn'>
                        {this.props.buyList 
                        ? this.props.buyList.map(buy => {
                            return  <div key={buy._id} className='containerOrder'>
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <div>
                                                <h1>Date: {buy.date.slice(5,10)}-{buy.date.slice(0,4)} at {buy.date.slice(11,19)} Hs</h1>
                                                <h1>Total: ${buy.totalPrice}</h1>
                                            </div>
                                            <div>
                                                <h1>Deliver information: </h1>
                                                <h3>Name: {buy.deliverInformation[0].firstName} {buy.deliverInformation[0].lastName}</h3>
                                                <h3>Direction: {buy.deliverInformation[0].direction} - {buy.deliverInformation[0].city}</h3>
                                                <h3>Cellphone Number: {buy.deliverInformation[0].cellphone}</h3>
                                            </div>
                                        </div>
                                        <h2>Products acquired:</h2>
                                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'90%'}}>
                                            {buy.products.map(product =>{
                                                return <ProductBuyed key={product._id} product={product}/>
                                            })}
                                        </div>    
                                    </div>
                        })
                        :<h1>your list of buys is empty</h1>                    
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
