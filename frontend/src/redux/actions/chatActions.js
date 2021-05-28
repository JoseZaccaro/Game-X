import axios from 'axios'

const chatActions = {
    getChatOfUser: ()=>{
        return async(dispatch, getState)=>{
            const token = localStorage.getItem('token')
            axios.get('http://localhost:4000/api/chats/'+"getChats",{
                headers:{
                    'Authorization':'Bearer '+ token
                }
            })
        }
    },
    postChatOfuser: (userId)=>{
        return async(dispatch, getState)=>{
            const token = localStorage.getItem('token')
            axios.post('http://localhost:4000/api/chats/' + userId,{
                headers:{
                    'Authorization':'Bearer '+ token
                }
            })
        }
    }

}

export default chatActions