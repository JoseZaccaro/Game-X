import axios from 'axios'

const buyActions = {
    crearCompra : ( nuevaCompra ) => {
        return async (dispatch , getState)=>{
            
            await axios.post('http://localhost:4000/api/buy' , nuevaCompra)
           /* .then(response => dispatch({
                type: "ADD_BUY",
                payload: response.data.response
            }))
            .catch(error => console.log(error))*/
        }
    }
}

export default buyActions