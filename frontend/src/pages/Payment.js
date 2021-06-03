import { useState }  from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import buyActions from '../redux/actions/buyActions'
import CreditCard from '../components/CreditCard'
import Paypal from "../components/Paypal"
import Header from '../components/Header'


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
    console.log(props.finishedOrder)

    if (!props.finishedOrder) {
        props.history.push('/')
    }
    return(
        <>     
            <Header props={props.history}/>   
            <div className="contenedorFormulario">
                {nextStep=== "" &&
                <>
                <div className="titulo">
                    <h2>Basic Information</h2>
                </div>  
                    <div className="itemsContenedor">
                        <label>First Name:</label>
                        <div className="item">
                            <input type="text" name="firstName" placeholder="Please, enter your first name"onChange={readInput}></input>
                        </div>
                        <label>Surname:</label>
                        <div className="item">                        
                            <input type="text" name="lastName" placeholder="Please, enter your lastName" onChange={readInput}></input>
                        </div>
                        <label>City:</label>
                        <div className="item">                        
                            <input type="text" name="city" placeholder="Please, enter your city" onChange={readInput}></input>
                        </div>
                        <label>Cellphone number:</label>
                        <div className="item">                        
                            <input type="number" name="cellphone" placeholder="Please, enter your cellphone number" onChange={readInput}></input>
                        </div>
                        <label>Direction:</label>
                        <div className="item">
                            <input type="text" name="direction" placeholder="Please, enter your direction" onChange={readInput}></input> 
                        </div>
                        <button className="btn" onClick={send}>Send</button>
                    </div>
                
                </>}
                {nextStep === 'creditCard' &&
                <>
                <CreditCard/>
                <Paypal compra={{concepto: 'Membresia VIP', monto: 300}} />
                </>}
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        finishedOrder: state.cartReducer.finishedOrder
    }
}
const mapDispatchToProps = {
    crearCompra: buyActions.crearCompra
}

export default connect (mapStateToProps, mapDispatchToProps)(Payment)