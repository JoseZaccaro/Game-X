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
                    <h1 className='reviewOrder'>This is your order information:</h1>
                    <div className='divContentOrderReview'>
                        <div>
                            <h3>You will buy</h3>
                            <div>{props.finishedOrder.products.map(product =>{
                                return  <div>
                                            <h3>Product Name: {product.title ? product.title : product.productName}</h3>
                                            <h3>Unit price: ${product.discount ? (-product.price * product.discount / 100 + product.price).toFixed(0) : product.price}</h3>
                                        </div>
                            })}</div>
                            <h1>Total price: ${props.finishedOrder.total}</h1>
                            <h3>With yout card finished in: {creditCard.number.slice(12,16)}</h3>
                            <h3>To deliver in: {newForm.direction} - {newForm.city}</h3>
                            <h3>Contact Number: {newForm.cellphone}</h3>
                            <h3>This could only be recieved by {newForm.firstName} {newForm.lastName} or other person who validates his identity with ID and sign the delivery order.</h3>
                            <h3>If you agree with this terms, and all this information seems correct, please click the "Buy" button to finish the process.</h3>
                        </div>
                        <div>
                            <h2 className='pasoNoActivoInfoFormulario'>01 - Basic Information</h2>
                            <h2 className='pasoNoActivoInfoFormulario'>02 - Credit Card Information</h2>
                            <h2 className='pasoActivoInfoFormulario'>03 - Verify Information</h2>
                            <NavLink to='/'><div className='botonHomeFormulario'>Back To Home</div></NavLink>
                        </div>  
                    </div> 
                    <button className='nextBotonFormulario' onClick={sendBuy}>Buy</button>
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