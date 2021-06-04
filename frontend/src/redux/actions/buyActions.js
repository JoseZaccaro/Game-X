import axios from 'axios'
import swal from 'sweetalert'

const buyActions = {
    createOrder : (product, token) => {
        return async () => {
            try {
                const respuesta = await axios.post(`https://game-x-arg.herokuapp.com/api/buy`,product, {
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
    loadBuys: (userId, token) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(`https://game-x-arg.herokuapp.com/api/buy/${userId}`, {
                    headers: {
                        'Authorization': 'Bearer '+ token
                    }
                })
                dispatch({type: 'LOAD_BUYS', payload: response.data.respuesta})
            } catch (error) {             
                console.log(error);
                alert('error en obtener buys')
            }        
        }
    },
}

export default buyActions