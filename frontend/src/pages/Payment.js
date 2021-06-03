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

    // if (!props.products) {
    //     props.history.push('/')
    // }
    return(
        <>     
            <Header props={props.history}/>   
            <div className="contenedorFormulario">
                {nextStep=== "" &&
                <div className='formularioBasicInformation'>
                    <div className="divPasosFormularios">
                        <h2 className='pasoActivoInfoFormulario'>01 - Basic Information</h2>
                        <h2 className='pasoNoActivoInfoFormulario'>02 - Credit Card Information</h2>
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
                    <div className='contentFormularioInforCard'>   
                        <CreditCard/>
                        <Paypal compra={{concepto: 'Membresia VIP', monto: 300}} />
                    </div> 
                </div>}
            </div>
        </>
    )
}

const mapDispatchToProps = {
    crearCompra: buyActions.crearCompra
}

export default connect (null  , mapDispatchToProps)(Payment)