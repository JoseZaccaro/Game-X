import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import Messages from './Messages' 
import {AiOutlineUsergroupAdd, AiOutlineUserDelete,AiOutlineUsergroupDelete} from 'react-icons/ai'
import {BsPersonPlus} from 'react-icons/bs'
import {BiChat} from 'react-icons/bi'
import {GiSplitCross} from 'react-icons/gi'
import chatActions from '../redux/actions/chatActions'
import swal from 'sweetalert'
import Tooltip from '@material-ui/core/Tooltip';


const Chat = (props) => {

    const [chats, setChats] = useState([])
    const [leftHide, setLeftHide] = useState(true)
    const [rightHide, setRightHide] = useState(true)
    const [chatToView, setChatToView] = useState({})
    const [inputValue,setInputValue] = useState({ inputValue:""})
    const [list, setList] = useState ({ beAFriendList:[]})
    const [viewSearchBar, setViewSearchBar]  = useState(false)
    const [friendList, setFriendList] = useState([])

    const setInput = (e) => {
        const valor = e.target.value
        setInputValue({inputValue:valor})
    }

    useEffect(()=>{
        const windowListener = window.addEventListener('keydown',(e)=>{
            if(e.key === "Escape"){ 
                e.preventDefault()
            }
            switch (e.key){
                case "Escape":
                        setRightHide(true)
                    break;
                }
        })
        return ()=>{
            window.removeEventListener('keydown',windowListener)
        }
    },[])

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
            const res = await props.searchUsers(inputValue.inputValue)
            setList({beAFriendList:res})
        }
        if(inputValue.inputValue.trim() !== "" && inputValue.inputValue.trim() !== " "){
            buscarAmigos()
        } 
        // eslint-disable-next-line
    },[inputValue])    
   
    const changeViewSearchBar = ()=>{
        setViewSearchBar(!viewSearchBar)
        setInputValue({inputValue:""})
      }


    const addFriend = async(person)=>{
        setFriendList([...friendList,person])
        const newChatOfFriendToAdd = await props.chat(person._id)
        setFriendList(newChatOfFriendToAdd)

    }
    const deleteFriend =async (person) =>{

        setFriendList(friendList.filter(friend => friend.id !== person.id))
        await props.deleteFriend(person.id)
        if(chatToView.friend && chatToView.friend.id === person.id){
            setLeftHide(true)
        }
    }
    const openFriendChat = async(friend)=>{

        const chat = await props.chat(friend.id)
        setChatToView({...chat,friend})      
        if(chat){
            setLeftHide(false)
        }
    }

    const searchBarStyle = ( rightHide && viewSearchBar ? {transform: "translate(20rem,0)", opacity:'0',transition: ".7s"}: rightHide && !viewSearchBar ? {transform: "translate(20rem,3rem)", opacity:'0',transition: ".7s"} : !viewSearchBar ? {transform: "translate(0,3rem)",transition: ".7s", opacity:'0'} : {transition: ".7s"} )
    const innerContainerRightSideStyle = ( rightHide ?
        {transform: "translate(20rem, 0)",transition: ".7s" , opacity:'0'} 
        : !viewSearchBar && !rightHide ? {transform: "translate(0, 0)",transition: ".7s", borderTopLeftRadius:'10px'}  : {transform: "translate(0, 0)",transition: ".7s", opacity:'1'} ) 
        

    return (<>
        <div className="extContainer">
            <Tooltip title="Send Message" placement="top-start">
                <div className="chatIconContainer">
                    <BiChat onClick={()=> setRightHide(!rightHide)} style={!leftHide ? {transition:'.7s',transform:'translate(-18rem,1rem)'} : !rightHide ? {transition:'.7s',opacity:'0'}:{transition:'.7s'}} className="chatIcon"/>
                </div>
            </Tooltip>
            <button onClick={()=> setLeftHide(!leftHide)}>Left</button>
            <div style={searchBarStyle} className="searchBarFriend">
                <input style={searchBarStyle, {transition:"all 0.7s ease 0.5s"}}  className="searchBarInput" onChange={setInput}  value={inputValue.inputValue} placeholder="Add new friends"/>
            </div>

            <Messages props={{ userLogged:props.userLogged, leftHide, setLeftHide, rightHide, chatToView, setChatToView}}/>

            { !inputValue.inputValue.length  ? 
            <div className="innerContainerRightSide" style={innerContainerRightSideStyle }>
                <div className="containerRight">
                    <div className="titleContainer">
                       { !viewSearchBar ? <AiOutlineUsergroupAdd onClick={changeViewSearchBar} className="iconoAddFriends" />
                        :<AiOutlineUserDelete onClick={changeViewSearchBar} className="iconoAddFriends" />}
                        <h1 className="chatTitle">Chats
                        </h1>
                    <GiSplitCross onClick={()=>setRightHide(!rightHide)} className="iconoAddFriends" />

                    </div>
                    <div className="friendCardsContainer">

                        {friendList.map((friend,i)=>{
                        return( 
                        <div key={i} className="friendContainer">
                            <div className="friendUserImage" onClick={()=> openFriendChat(friend)} style={{backgroundImage:`url(${friend.avatar})`}}></div>
                            <p className="userName" onClick={()=> openFriendChat(friend)} >{friend.userName.split('@')[0]}</p>
                            <div className="addFriend">
                                <AiOutlineUsergroupDelete onClick={()=>deleteFriend(friend)} className="iconoAddFriends" style={{width:'60%',height:'40%',border:'none'}}/>
                            </div>
                        </div>)
                        })}
                    </div>

                </div>
            </div>
            : <div className="innerContainerRightSide">
                <div className="containerRight">
                    <div className="titleContainer">
                    <AiOutlineUserDelete onClick={changeViewSearchBar} className="iconoAddFriends" />
                        <h1 className="chatTitle">
                            People
                            </h1>
                    </div>
                    <div className="friendCardsContainer">
                        {list.beAFriendList.map((person,i) => {
                            if(person.userName !== props.userLogged.userName && !props.userLogged.friends.find(friend => person._id === friend.id)){
                                return (
                                    <div key={i} className="friendContainer">
                                <div className="friendUserImage" style={{backgroundImage:`url(${person.avatar})`}}></div>
                                <p className="userName">{person.userName.split('@')[0]}</p>
                                <div className="addFriend">
                                <BsPersonPlus onClick={()=>addFriend(person)} className="iconoAddFriends" style={{width:'80%', border:'none'}}/>
                                </div>
                            </div>)
                            }else{
                                return null
                            }
                        })}
                    </div>
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

    searchUsers : userActions.searchUsers,
    chat : chatActions.getChatOfUser,
    getFriendList: chatActions.getFriendList,
    deleteFriend: chatActions.deleteFriend
    
  }
  

export default  connect(mapStateToProps,mapDispatchToProps)(Chat)