import axios from 'axios'
import swal from 'sweetalert'

const buyActions = {
    createOrder : (product, token) => {
        return async () => {
            try {
                const respuesta = await axios.post(`http://localhost:4000/api/buy`,product, {
                headers: {
                    'Authorization': 'Bearer '+ token
                }
            })
                if(!respuesta.data.success){
                    return respuesta.data                   
                }else{
                    return respuesta.data
                }
            } catch(error) {
                return swal("Failed to try to connect with server", "Please try again in a few minutes", "error")
            }           
        }
    },
}

export default buyActions