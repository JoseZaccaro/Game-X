const initialState = {
    allHardwares: [],
    preLoader: true
}

const hardwareReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'LOAD_HARDWARES':
            return {
                ...state, 
                allHardware: action.payload,
                preLoader: false
            }
        default:
            return state
    }
}

export default hardwareReducer