import { useState }  from 'react'


const Formulario = () =>{
    const [newForm , setNewForm] = useState({
        firstName: "",
        surname: "",
        city: "",
        cellphone: "",
        direction: ""
    })
    const handleForm = (e) =>{
        setNewForm({
            ...newForm,
            [e.target.name]: e.target.value
        })
    }
    const handleClick = (e)=>{
        e.preventDefault()
        console.log("formulario" , newForm)
    }
    return(
        <>
        <div className="contenedorFormulario">
            <div className="titulo">
                <h2>Basic Information</h2>
            </div>  
                <div className="itemsContenedor">

                    <label>First Name:</label>
                    <div className="item">
                        <input type="text" name="firstName" placeholder="Please, enter your first name"
                    onChange={handleForm}></input>
                    </div>

                    <label>Surname:</label>
                    <div className="item">
                        
                        <input type="text" name="surname" placeholder="Please, enter your surname" onChange={handleForm}></input>
                    </div>

                    <label>City:</label>
                    <div className="item">
                        
                        <input type="text" name="city" placeholder="Please, enter your city" onChange={handleForm}></input>
                    </div>

                    <label>Cellphone number:</label>
                    <div className="item">
                        
                        <input type="number" name="cellphone" placeholder="Please, enter your cellphone number" onChange={handleForm}></input>
                    </div>
                    <label>Direction:</label>
                    <div className="item">
                        <input type="text" name="direction" placeholder="Please, enter your direction" onChange={handleForm}></input> 
                    </div>
                    <button className="btn" onClick={handleClick}>Send</button>
                </div>
        </div>
        </>
    )
}
/*        <div className="contenedorFormulario">
                <h2 style={{color:"white"}}>Basic Information</h2>
                <div className="itemsContenedor">
                    <div className="item">
                        <label>First Name:</label>
                        <input type="text" name="firstName" placeholder="Please, enter your first name"
                        onChange={handleForm}></input>
                    </div>
                    <div className="item">
                        <label>Surname:</label>
                        <input type="text" name="surname" placeholder="Please, enter your surname"></input>
                    </div>
                </div>
                <div className="itemsContenedor">
                    <div className="item">
                        <label>City:</label>
                        <input type="text" name="city" placeholder="Please, enter your city"></input>
                    </div>
                    <div className="item">
                        <label>Cellphone number:</label>
                        <input type="number" name="cellphone" placeholder="Please, enter your cellphone number"></input>
                    </div>
                </div>
                <div className="itemsContenedor">
                    <label>Direction:</label>
                    <input type="text" name="direction" placeholder="Please, enter your direction"></input>  
                </div> 
        </div>*/

export default Formulario