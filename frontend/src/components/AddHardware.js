
import React from "react"
import swal from "sweetalert"
import { connect } from "react-redux"
import ProductActions from "../redux/actions/ProductActions";




class AddHardware extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    token= localStorage.getItem('token')

    state={
        aditionals:false,
        infoHardware:{
            productName:'',
            price:'',
            brand:'',
            description:'',
            features:'',
            stock:'',
            // aditionals:{
            //     productId:'',
            //     gameId:''
            // },
            imageBanner:'',
            imagesBackground:'',
        }
    }
    readInput = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            infoHardware:{...this.state.infoHardware,
            [field]: value}
        })
    })
    
    arrayConverter = (e) =>{
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            infoHardware:{...this.state.infoHardware,
            [field]: value.split(',' || '}')}
        })
    }

    objectConverter = (e) =>{
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            infoHardware:{...this.state.infoHardware,
                aditionals:{...this.state.infoHardware.aditionals,
                [field]: {value}}}
        })

    }

    selectOptionAditionals = (e, value) => { 
        e.preventDefault()      
        this.setState({...this.state, aditionals: value})
    }

    confirm = (e) =>{
        e.preventDefault()
        swal({
            title: `You are about to add "${this.state.infoHardware.productName}"`,
            text: "Is that ok?",
            icon: "info",
            buttons: true,
            dangerMode: true,
          })
          .then((ok) => {
            if (ok) {
              this.send()
            } 
          });
    } 


    send = async (e) => {
        e && e.preventDefault()
        const respuesta = await this.props.addHardware(this.state.infoHardware, this.token)        
        if (respuesta.error) {
            swal(respuesta.error,'', "error")           
        } else {
            swal("Product added correctly!", '', "success")
            this.setState({infoHardware:{ productName:'', price:'', brand:'', description:'', features:'', stock:'', imageBanner:'', imagesBackground:''}})
        }   
    }

    componentDidMount(){
        this.toTop()
    }

    render(){

        return(

            <form className='formGames'>
                <input type="text" placeholder="productName" name="productName" value={this.state.infoHardware.productName} onChange={this.readInput} />
                <input type="text" placeholder="price" name="price" value={this.state.infoHardware.price} onChange={this.readInput} />
                <input type="text" placeholder="brand" name="brand" value={this.state.infoHardware.brand} onChange={this.readInput} />
                <input type="text" placeholder="description" name="description" value={this.state.infoHardware.description} onChange={this.readInput} />
                <input type="text" placeholder="features" name="features" value={this.state.infoHardware.features} onChange={this.arrayConverter} />
                <input type="text" placeholder="stock" name="stock" value={this.state.infoHardware.stock} onChange={this.readInput} />
                {/* <input type="text" placeholder="aditionals" name="aditionals" value={this.state.infoHardware.aditionals} onChange={this.arrayConverter} /> */}
{/*                 
                   
                    {this.state.aditionals ?
                    <div>
                        <div>
                            <input type="text" placeholder="Product ID" name="productId" value={this.state.infoHardware.aditionals.productId} onChange={this.objectConverter} />
                            <input type="text" placeholder="Game ID" name="gameId" value={this.state.infoHardware.aditionals.gameId} onChange={this.objectConverter} />
                        </div>
                        <button onClick={(e, value=false )=> this.selectOptionAditionals(e, value)}>Cancel</button>
                    </div>
                    :   <div >
                            <label htmlFor="yes" className="l-radio">
                                <input type="radio" id="yes" name="aditionals" onChange={(e, value=true) => this.selectOptionAditionals(e, value)} tabIndex="1"></input>
                                    <span>Yes</span>                                
                            </label>
                            <label htmlFor="no" className="l-radio">
                                <input type="radio" id="no" name="aditionals"  onChange={(e, value=false) => this.selectOptionAditionals(e, value)} tabIndex="2"></input>
                                <span>No</span>
                            </label>
                        </div>
                    }
                                 */}
                <input type="text" placeholder="imageBanner" name="imageBanner" value={this.state.infoHardware.imageBanner} onChange={this.readInput} />
                <input type="text" placeholder="imagesBackground" name="imagesBackground" value={this.state.infoHardware.imagesBackground} onChange={this.arrayConverter} />
                <button onClick={(e)=>this.confirm(e)}>Send</button>
            </form>       
        )
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged
    }
}
const mapDispatchToProps = {
    addHardware: ProductActions.addHardware,
}


export default connect(mapStateToProps, mapDispatchToProps)(AddHardware)