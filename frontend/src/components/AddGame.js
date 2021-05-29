
import React from "react"
import swal from "sweetalert"
import { connect } from "react-redux"
import ProductActions from "../redux/actions/ProductActions";



class AddGame extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    token= localStorage.getItem('token')

    state={
        gotDLC:false,
        DLCInfo:{
            name:"",
            price:"",
            description:"",
            imageBanner:'',
        },
        infoGame:{
            title:'',
            year:'',
            genre:'',
            language:'',
            developer:'',
            online:'',
            platform:'',
            price:'',
            description:'',
            discount:'',
            DLC:[],
            imageBanner:'',
            imagesBackground:'',
            PEGI:'',
        }
    }
    readInput = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            infoGame:{...this.state.infoGame,
            [field]: value}
        })
    })

    selectOptionDLCs = (e, value) => { 
        e.preventDefault()      
        this.setState({...this.state, aditionals: value})
    }

    arrayConverter = (e) =>{
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            infoGame:{...this.state.infoGame,
            [field]: value.split(',')}
        })
    }

    objectConverter = (e) =>{
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
                DLCInfo:{...this.state.DLCInfo,
                [field]: value}
        })
    }

    confirm = (e) =>{
        e.preventDefault()
        swal({
            title: `You are about to add "${this.state.infoGame.title}"`,
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
    addDLC = (e) =>{
        e.preventDefault()
        this.setState({
            ...this.state,
            infoGame:{...this.state.infoGame,
                DLCInfo:{...this.state.infoGame.DLCInfo,
                    DLC: this.state.infoGame.DLC.push(this.state.DLCInfo)}},
        })
        this.setState({...this.state, DLCInfo:{name:"", price:"", description:"", imageBanner:''},})
    }

    send = async (e) => {
        e && e.preventDefault()
        // swal(`You are about to change Rol of ${this.state.userInfoToEdit.userName} to ${this.state.userInfoToEdit.newRol}`, "is that ok?", "info")
        console.log(this.state.infoGame)
        const respuesta = await this.props.addGame(this.state.infoGame, this.token)
        if (respuesta.error) {
            swal(respuesta.error,'', "error")           
        } else {
            swal("Game added correctly!", '', "success")
            this.setState({infoGame:{title:'', year:'', genre:'', language:'', developer:'', online:'', platform:'', price:'', description:'', DLC:[], discount:'', imageBanner:'', imagesBackground:'', PEGI:'', }})
        }   
    }

    componentDidMount(){
        this.toTop()
    }

    render(){
        console.log(this.state.infoGame)
        return(
            <form className='formGames'>
                <div>
                <input type="text" placeholder="title" name="title" value={this.state.infoGame.title} onChange={this.readInput} />
                <input type="text" placeholder="year" name="year" value={this.state.infoGame.year} onChange={this.readInput} />
                </div>
                <input type="text" placeholder="genre" name="genre" value={this.state.infoGame.genre} onChange={this.arrayConverter} />
                <input type="text" placeholder="language" name="language" value={this.state.infoGame.language} onChange={this.arrayConverter} />
                <input type="text" placeholder="developer" name="developer" value={this.state.infoGame.developer} onChange={this.readInput} />
                <div>
                    <span style={{color:'white'}}>is Online?</span>  
                    <label htmlFor="yes" className="l-radio">
                                    <span style={{color:'white'}}>Yes</span>                                
                                    <input type="radio" id="yes" name="online" value={true} onChange={this.readInput} tabIndex="1"></input>
                    </label>
                    <label htmlFor="no" className="l-radio">
                                    <span style={{color:'white'}}>No</span>                                
                                    <input type="radio" id="no" name="online" value={false} onChange={this.readInput} tabIndex="2"></input>
                    </label>
                </div>
                <input type="text" placeholder="platform" name="platform" value={this.state.infoGame.platform} onChange={this.arrayConverter} />
                <input type="text" placeholder="price" name="price" value={this.state.infoGame.price} onChange={this.readInput} />
                <input type="text" placeholder="description" name="description" value={this.state.infoGame.description} onChange={this.readInput} />
                <input type="text" placeholder="discount" name="discount" value={this.state.infoGame.discount} onChange={this.readInput} />
                {/* <input type="text" placeholder="DLC" name="DLC" value={this.state.infoGame.DLC} onChange={this.arrayConverter} /> */}
                {this.state.aditionals 
                    ?<div>
                        <div>
                            <input type="text" placeholder="Name" name="name" value={this.state.DLCInfo.name} onChange={this.objectConverter} />
                            <input type="text" placeholder="Price" name="price" value={this.state.DLCInfo.price} onChange={this.objectConverter} />
                            <input type="text" placeholder="Description" name="description" value={this.state.DLCInfo.description} onChange={this.objectConverter} />
                            <input type="text" placeholder="Image URL (landscape) " name="imageBanner" value={this.state.DLCInfo.imageBanner} onChange={this.objectConverter} />
                        </div>
                        <button onClick={(e, value=false )=> this.selectOptionDLCs(e, value)}>Cancel</button>
                        <button onClick={this.addDLC}>Add DLC</button>
                     </div>
                    :<div >
                            <label htmlFor="yes" className="l-radio">
                                <span style={{color:'white'}}>Has available DLC's?</span>                                
                                <input type="radio" id="yes" name="aditionals" onChange={(e, value=true) => this.selectOptionDLCs(e, value)} tabIndex="1"></input>
                            </label>
                     </div>
                }
                <input type="text" placeholder="imageBanner" name="imageBanner" value={this.state.infoGame.imageBanner} onChange={this.readInput} />
                <input type="text" placeholder="imagesBackground" name="imagesBackground" value={this.state.infoGame.imagesBackground} onChange={this.arrayConverter} />
                <input type="text" placeholder="PEGI" name="PEGI" value={this.state.infoGame.PEGI} onChange={this.readInput} />
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
    addGame: ProductActions.addGame,
}


export default connect(mapStateToProps, mapDispatchToProps)(AddGame)