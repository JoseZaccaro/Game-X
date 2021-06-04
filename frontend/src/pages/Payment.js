import { useState }  from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import buyActions from '../redux/actions/buyActions'
import CreditCard from '../components/CreditCard'
import Paypal from "../components/Paypal"
import Header from '../components/Header'
import { NavLink } from 'react-router-dom'


const Payment = (props) =>{


    const token = localStorage.getItem('token')

    const [newForm , setNewForm] = useState({
        firstName: "",
        lastName: "",
        city: "",
        cellphone: "",
        direction: ""
    })
    const [creditCard, setCreditCard]= useState(null)
    const [nextStep, setNextStep] = useState("")

    const readInput = (e) =>{
        setNewForm({
            ...newForm,
            [e.target.name]: e.target.value
        })
    }
    const send = (e)=>{
        e.preventDefault()
        if (newForm.firstName!== '' && newForm.lastName!== '' && newForm.city!== '' && newForm.cellphone!=='' && newForm.direction!=='') {
            setNextStep('creditCard')
        }else{
            swal('All fields are required', 'Please, complete the required information', 'error')
        }
        
    }
    const sendBuy = async (e) =>{
        e.preventDefault()
        const userId= props.userLogged.id
        const dataToSend = {...creditCard, ...newForm, ...props.finishedOrder,userId}
        const respuesta = await props.createOrder(dataToSend, token)
        respuesta.success && swal('Your buy was completed!', 'Thanks for trust in Game-X!', 'success')
        .then(props.history.push('/'))

    }



    if (!props.finishedOrder) {
        props.history.push('/')
    }
    return(
        <>      
            <div className="contenedorFormulario">
                {nextStep=== "" &&
                <div className='formularioBasicInformation animate__animated animate__fadeIn '>
                    <div className="divPasosFormularios">
                        <h2 className='pasoActivoInfoFormulario'>01 - Basic Information</h2>
                        <h2 className='pasoNoActivoInfoFormulario'>02 - Credit Card Information</h2>
                        <h2 className='pasoNoActivoInfoFormulario'>03 - Verify Information</h2>
                        <NavLink to='/'><div className='botonHomeFormulario'>Back To Home</div></NavLink>
                    </div>  
                    <div className="itemsContenedor">
                        <div className='divLabelInputForm'>
                            <label>First Name:</label>
                            <input className='inputFormularioBasicInfo' type="text" name="firstName" placeholder="Please, enter your first name"onChange={readInput}></input>                        
                        </div>
                        <div className='divLabelInputForm'>
                            <label>Last Name:</label>                                                  
                            <input className='inputFormularioBasicInfo' type="text" name="lastName" placeholder="Please, enter your lastName" onChange={readInput}></input>
                        </div>
                        <div className='divLabelInputForm'>
                            <label>City:</label>
                            <input className='inputFormularioBasicInfo' type="text" name="city" placeholder="Please, enter your city" onChange={readInput}></input>             
                        </div>
                        <div className='divLabelInputForm'>
                            <label>Cellphone number:</label>
                            <input className='inputFormularioBasicInfo' type="number" name="cellphone" placeholder="Please, enter your cellphone number" onChange={readInput}></input>   
                        </div>
                        <div className='divLabelInputForm'>
                            <label>Direction:</label>
                            <input className='inputFormularioBasicInfo' type="text" name="direction" placeholder="Please, enter your direction" onChange={readInput}></input>              
                        </div>
                        <button className="nextBotonFormulario" onClick={send}>Next</button>
                    </div>
                
                </div>}
                {nextStep === 'creditCard' &&
                <div className='contenedorInfoTarjeta'>
                    <div className='contentFormularioInforCard animate__animated animate__fadeIn '>   
                        <CreditCard setCreditCard={setCreditCard} setNextStep={setNextStep}/>
                        <Paypal compra={{concepto: 'Membresia VIP', monto: 300}} />
                    </div> 
                </div>}
                {nextStep === 'verifyOrder' &&
                <div className='formOrderReview animate__animated animate__fadeIn'>
                    
                    <div className='divContentOrderReview'>                  
                        <div className='tercerFormCreditCard'>
                            <h1 className='tituloFormularioTresPrincipal'>This is your order information:</h1>
                            <h3 className='tituloFormTerceroCompraras'>You will buy</h3>
                            <div>{props.finishedOrder.products.map(product =>{
                                return  <div className='listadoProductosTercerForm'>
                                            <h3>Product Name: </h3> <p>{product.title ? product.title : product.productName}</p>
                                            <h3>Unit price: </h3><p>${product.discount ? (-product.price * product.discount / 100 + product.price).toFixed(0) : product.price}</p>
                                        </div>
                            })}</div>
                            <div className='divTotalPriceTercerForm'>
                                <h1 className='totalPriceFormTres'>Total price: </h1><p>${props.finishedOrder.total}</p>
                            </div>
                            <div className='infoCompraFormTercero'>
                                <div className='cadaDivInfoCompraTres'>
                                    <h3>With yout card finished in: </h3><p>{creditCard.number.slice(12,16)}</p>
                                </div>
                                <div className='cadaDivInfoCompraTres'>
                                    <h3>To deliver in: </h3><p>{newForm.direction} - {newForm.city}</p>
                                </div>
                                <div className='cadaDivInfoCompraTres'>
                                    <h3>Contact Number: </h3><p>{newForm.cellphone}</p>
                                </div>
                                <div className='cadaDivInfoCompraTresNombre'>
                                    <h3>This could only be recieved by <span>{newForm.firstName} {newForm.lastName}</span> or other person who validates his identity with ID and sign the delivery order.</h3>
                                    <h3>If you agree with this terms, and all this information seems correct, please click the "Buy" button to finish the process.</h3>
                                </div>
                            </div>
                        </div>
                        <div className='ladoPasosFormularioTres'>
                            <h2 className='pasoNoActivoInfoFormulario'>01 - Basic Information</h2>
                            <h2 className='pasoNoActivoInfoFormulario'>02 - Credit Card Information</h2>
                            <h2 className='pasoActivoInfoFormulario'>03 - Verify Information</h2>
                        </div>  
                    </div> 
                    <div className='divContenidoBotonesTercerForm'>
                        <NavLink to='/'><div className='botonCancelFormulario'>Cancel</div></NavLink>
                        <button className='nextBotonFormulario' onClick={sendBuy}>Buy</button>
                    </div>
                </div>}
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        finishedOrder: state.cartReducer.finishedOrder,
        userLogged: state.userReducer.userLogged
    }
}
const mapDispatchToProps = {
    createOrder: buyActions.createOrder
}

export default connect (mapStateToProps, mapDispatchToProps)(Payment)