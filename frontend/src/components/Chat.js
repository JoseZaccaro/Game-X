import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import Messages from './Messages' 
import {AiOutlineUsergroupAdd, AiOutlineUserDelete,AiOutlineUsergroupDelete} from 'react-icons/ai'
import {BsPersonPlus} from 'react-icons/bs'
import chatActions from '../redux/actions/chatActions'


const Chat = (props) => {

    const [chats, setChats] = useState([])
    const [leftHide, setLeftHide] = useState(true)
    const [rightHide, setRightHide] = useState(true)
    const [chatToView, setChatToView] = useState({messages:[], user:{name:"jose"}})
    const [inputValue,setInputValue] = useState({ inputValue:""})
    const [list, setList] = useState ({ beAFriendList:[]})
    const [viewSearchBar, setViewSearchBar]  = useState(false)
    const [friendList, setFriendList] = useState([])

    const setInput = (e) => {
        const valor = e.target.value
        setInputValue({inputValue:valor})
    }
    console.log(props.userLogged)
    useEffect(()=>{
        if(props.userLogged && props.userLogged.friends){
            const fetchFriends = async()=>{
                const list = await props.getFriendList(props.userLogged.id)
                setFriendList(list)
            }
            fetchFriends()
        }
    // eslint-disable-next-line
    },[props.userLogged])

    useEffect(()=>{
        const buscarAmigos = async()=>{
            const res = await props.searchUser(inputValue.inputValue)
            setList({beAFriendList:res})
        }
        buscarAmigos()
        // eslint-disable-next-line
    },[inputValue])    
   
    const changeViewSearchBar = ()=>{
        setViewSearchBar(!viewSearchBar)
        setInputValue({inputValue:""})
      }


    const addFriend = (person)=>{
        props.chat(person._id)
    }
    const deleteFriend = async(person) =>{
        const list = await props.deleteFriend(person.id)

    }

    const searchBarStyle = ( rightHide && viewSearchBar ? {transform: "translate(20rem,0)", opacity:'0',transition: ".7s"}: rightHide && !viewSearchBar ? {transform: "translate(20rem,3rem)", opacity:'0',transition: ".7s"} : !viewSearchBar ? {transform: "translate(0,3rem)",transition: ".7s", opacity:'0'} : {transition: ".7s"} )

    const innerContainerRightSideStyle = ( rightHide ?
    {transform: "translate(20rem, 0)",transition: ".7s" , opacity:'0'} 
    : !viewSearchBar && !rightHide ? {transform: "translate(0, 0)",transition: ".7s", borderTopLeftRadius:'10px'}  : {transform: "translate(0, 0)",transition: ".7s", opacity:'1'} ) 


    return (<>
        <div className="extContainer">
            <button onClick={()=> setLeftHide(!leftHide)}>Left</button>
            <button onClick={()=> setRightHide(!rightHide)}>Right</button>
            <div style={searchBarStyle} className="searchBarFriend">
                <input style={searchBarStyle, {transition:"all 0.7s ease 0.5s"}}  className="searchBarInput" onChange={setInput}  value={inputValue.inputValue} placeholder="Add new friends"/>
            </div>

            <Messages props={{ leftHide, setLeftHide, rightHide, chatToView, setChatToView}}/>
            { !inputValue.inputValue.length  ? 
            <div className="innerContainerRightSide" style={innerContainerRightSideStyle }>
                <div className="containerRight">
                    <div className="titleContainer">
                        <h1 className="chatTitle">Chats
                        </h1>
                       { !viewSearchBar ? <AiOutlineUsergroupAdd onClick={changeViewSearchBar} className="iconoAddFriends" />
                        :<AiOutlineUserDelete onClick={changeViewSearchBar} className="iconoAddFriends" />}
                    </div>
                    {friendList.map(friend=>{
                       return( 
                       <div className="friendContainer">
                        <div className="friendUserImage" style={{backgroundImage:`url(${friend.avatar})`}}></div>
                        <p className="userName">{friend.userName}</p>
                        <div className="addFriend">
                            <AiOutlineUsergroupDelete onClick={()=>deleteFriend(friend)} className="iconoAddFriends" style={{width:'60%',height:'50%'}}/>
                        </div>
                    </div>)
                    })}
                </div>
            </div>
            : <div className="innerContainerRightSide">
                <div className="containerRight">
                    <div className="titleContainer">
                        <h1 className="chatTitle">
                            People
                            </h1>
                            <AiOutlineUserDelete onClick={changeViewSearchBar} className="iconoAddFriends" />
                    </div>

                    {list.beAFriendList.map((person,i) => {
                        const isFriend = props.userLogged.friends.find(friendId => person._id === friendId)
                        if(person.userName !== props.userLogged.userName && !isFriend){
                            return (
                                <div key={i} className="friendContainer">
                            <div className="friendUserImage" style={{backgroundImage:`url(${person.avatar})`}}></div>
                            <p className="userName">{person.userName}</p>
                            <div className="addFriend">
                            <BsPersonPlus onClick={()=>addFriend(person)} className="iconoAddFriends" style={{width:'80%'}}/>
                            </div>
                        </div>)
                        }else{
                            return null
                        }
                    })}
                </div>
            </div>
            }
        </div>
    </>)
}

const mapStateToProps = state =>{
    return {
        userLogged : state.userReducer.userLogged
    }
}

const mapDispatchToProps = {

    searchUser : userActions.searchUser,
    chat : chatActions.getChatOfUser,
    getFriendList: chatActions.getFriendList,
    deleteFriend: chatActions.deleteFriend
  
  }
  

export default  connect(mapStateToProps,mapDispatchToProps)(Chat)