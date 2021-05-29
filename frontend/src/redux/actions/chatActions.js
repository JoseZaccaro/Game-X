import axios from 'axios'

const chatActions = {
    getChatOfUser: (friendId)=>{
        return async(dispatch, getState)=>{
            const token = localStorage.getItem('token')
            const oldChat = await axios.get('http://localhost:4000/api/chats/'+friendId,{
                headers:{
                    'Authorization':'Bearer '+ token
                }
            })
            console.log(oldChat.data)
            if(oldChat.data.success && oldChat.data.response){
                return oldChat.data.response
            }else{
                const friend = await axios.put(`http://localhost:4000/api/user/addFriend/${friendId}`,null,{
                headers:{
                    'Authorization': 'Bearer '+ token
                }
            })
            console.log(friend.data)
            if(friend.data.success){
                return friend.data.response
            }
            }
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
    },
    getFriendList: (userId)=>{
        return async(dispatch,getState)=>{
            const friendList = await axios.get('http://localhost:4000/api/friends/'+userId)            
            if(friendList.data.success){
                return friendList.data.response
            }else{
                console.log(friendList.data.response)
            }
        }
    },
    deleteFriend: (userId)=>{
        return async(dispatch,getState)=>{

            const friendList = await axios.delete('http://localhost:4000/api/friends/'+userId)            
            if(friendList.data.success){
                return friendList.data.response
            }else{
                console.log(friendList.data.response)
            }
        }
    }

}

export default chatActions