import axios from 'axios'

const hardwareActions = {
    loadHardwares: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/hardware')
                if(response.data.success){
                    dispatch({type: 'LOAD_HARDWARES', payload: response.data.response})
                }else{
                    console.log(response.data.response)
                }
            } catch (error) {             
                console.log(error);
                alert('error en hardware action')
            }        
        }
    }
}
export default hardwareActions