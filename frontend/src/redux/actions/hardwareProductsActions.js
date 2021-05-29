import axios from 'axios'

const hardwareProductsActions = {
    loadHardwareProducts: () => {
        return async (dispatch, getState) => {
            //codigo asincrono
            try {
                const response = await axios.get('http://localhost:4000/api/hardware')
                console.log(response.data.response);
                dispatch({type: 'LOAD_HARDWARES', payload: response.data.response})
            } catch (error) {             
                console.log(error);
                alert('error en hardware action')
            }        
        }
    }
}
export default hardwareProductsActions