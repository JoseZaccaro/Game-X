import axios from 'axios'

const chatActions = {
    getChatOfUser: (friendId)=>{
        return async(dispatch, getState)=>{
            try{
                const token = localStorage.getItem('token')
                const oldChat = await axios.get('http://localhost:4000/api/chats/'+friendId,{
                    headers:{
                        'Authorization':'Bearer '+ token
                    }
                })
                if(oldChat.data.success && oldChat.data.response){
                    return oldChat.data.response
                }else{
                    return null
                }
            }catch(e){
                console.log(e)
                }
            }
        },
        addFriend:(friendId)=>{
            return async(dispatch, getState)=>{
                try{
                const token = localStorage.getItem('token')
                    const friend = await axios.put(`http://localhost:4000/api/user/addFriend/${friendId}`,null,{
                        headers:{
                            'Authorization': 'Bearer '+ token
                        }
                    })
                    if(friend.data.success){
                        dispatch({type:"RELOAD_FRIEND_LIST", payload:friend.data.response})
                        return friend.data.response
                    }
                
                }catch(e){
                    console.log(e)
                }
            }
        },
    postChatOfuser: (userId)=>{
        return async(dispatch, getState)=>{
            try{

                const token = localStorage.getItem('token')
                axios.post('http://localhost:4000/api/chats/' + userId,{
                    headers:{
                        'Authorization':'Bearer '+ token
                    }
                })
            }catch(e){

            }
        }
    },
    getFriendList: (userId)=>{
        return async(dispatch,getState)=>{
            try{

                const friendList = await axios.get('http://localhost:4000/api/friends/'+userId)            
                if(friendList.data.success){
                    dispatch({type:"RELOAD_FRIEND_LIST", payload:friendList.data.response})
                    return friendList.data.response
                }else{
                    console.log(friendList.data.response)
                }
            }catch(e){
                console.log(e)
            }
        }
    },
    deleteFriend: (userId)=>{
        return async(dispatch,getState)=>{
            try{
                const token = localStorage.getItem('token')
                const friendList = await axios.delete('http://localhost:4000/api/friends/'+userId,{
                    headers:{
                        'Authorization':'Bearer '+ token
                    }
                })            
                if(friendList.data.success){
                    console.log(friendList.data)
                    dispatch({type:"RELOAD_FRIEND_LIST", payload:friendList.data.response})
                    return friendList.data.response
                }else{
                    console.log(friendList.data.response)
                }
            }catch(e){
                console.log(e)
            }
        }
    },
    sendMessage:(message, friendId)=>{
        return async (dispatch, getState)=>{
            try{    
                const token = localStorage.getItem('token')
                    const savedMessage = await axios.put('http://localhost:4000/api/chats/'+friendId,{message},{
                        headers:{
                            'Authorization':'Bearer '+ token
                        }
                    })
                    if(savedMessage.data.success){
                        return savedMessage.data.response
                    }
            }catch(e){

            }
        }
    },
    socketChat:(socket)=>{
        return (dispatch,getState)=>{
           dispatch({type:'SOCKET_IO',payload:socket})
        }
    },
    reloadMessages:()=>{
        return (dispatch, getState)=>{
            dispatch({type:'RELOAD_MESSAGES'})
        }
    },
    reloadFriendList:()=>{
        return(dispatch, getState)=>{
            dispatch({type:'RELOAD_FRIENDLIST_SOCKET'})
        }
    }
}

export default chatActions