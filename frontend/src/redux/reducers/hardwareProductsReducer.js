const initialState = {
    hardwareProducts: [],
    preLoader: true
}

const hardwareProductsReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'LOAD_HARDWARES':
            console.log(action.payload)
            return {
                ...state, 
                hardwareProducts: action.payload,
                preLoader: false
            }
        default:
            return state
    }
}

export default hardwareProductsReducer