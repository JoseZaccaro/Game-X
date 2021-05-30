import React, { useState } from 'react'
import {VscChromeClose} from 'react-icons/vsc'
import {FaWindowMinimize} from 'react-icons/fa'
import {SiRiotgames} from 'react-icons/si'
import { connect } from 'react-redux'
import chatActions from '../redux/actions/chatActions'

const Messages = (props)=>{

    
    let {leftHide, setLeftHide, rightHide, chatToView, setChatToView} = props.props
    
    const receiving = true
    const [minimized , setMinimized] = useState(false)
    const [newMessage , setNewMessage] = useState("")

    const close = ()=>{
        setChatToView({messages:[],user:{name:null}})
        setLeftHide(!leftHide)
    }
    const minimize = ()=>{
        setMinimized(!minimized)
    }
    const readInput = (e)=>{
        const value = e.target.value
        setNewMessage(value)
    }

    const sendMessage = (e)=>{
        e.preventDefault()
        const validado = newMessage.trim() !== "" && newMessage.trim() !== " " 

        if(validado) {
            props.sendMessage(newMessage,chatToView._id)
            setNewMessage("")
        }
    }
    let leftSideHide 

        if(minimized && !rightHide){
            leftSideHide ={
                height:'3rem',
                transition:".7s",
                 transform:'translate(-20rem,0)',
                 cursor:'pointer'
                }
        }else if(!rightHide && minimized){
            leftSideHide ={
                height:'3rem',
                transition:".7s",
                 transform:'translate(20,0)',
                }
        }else if( minimized && rightHide ){
            
            leftSideHide = {
                height:'3rem',
                transition:".7s",
                 transform:'translate(0,0)',
                 cursor:'pointer'
                }
        }else if (leftHide){

            leftSideHide={
                transform: "translate(20rem, 0)",
                transition: ".7s",
                opacity:'0'
            }
        }else if(!leftHide && !rightHide){

            leftSideHide={
                transform: "translate(-20rem, 0)", 
                transition: ".7s", 
                opacity:'1'
            }
        }else{
            leftSideHide = {
                transform: "translate(0rem, 0)",
                transition: ".7s",
                 opacity:'1'
                }
        }
        const friendUserName = chatToView.friend ? chatToView.friend.userName.slice(0,10) : ""
        const userAvatar = chatToView.friend ? chatToView.friend.avatar : ""
        
     

    return (
            <div className="containerLeftSide"  onClick={ ()=> minimized && minimize()} style={ leftSideHide }>
                <div className="infoUserContainer" style={minimized ? {height:'100%',transition:".7s",borderBottom:'1px solid rgba(0,0,0,0)', marginTop:'10px'}: {transition:'.7s',cursor:'default'}}>
                    <div className="friendUserImage" style={minimized ? {backgroundImage:`url(${userAvatar})`,width:'2rem',transition:".7s", height:'2rem'}:{transition:".7s",backgroundImage:`url(${userAvatar})`,cursor:'default'}}></div>
                    <p className="userName" style={minimized ? {transition:".7s"}: {transition:'.7s',cursor:'default'}}> {friendUserName}</p>
                    <div className="iconoClose" style={minimized ? {marginLeft:'2.5rem'}: null} onClick={minimize}><FaWindowMinimize /></div>
                    { !minimized && <div className="iconoClose" onClick={close}><VscChromeClose className="iconoClose"/></div>}                
                    </div>
                <div className="chatsContainer" style={minimized ? {opacity:"0", height:'0',transition:".7s"}: {transition:'.7s'}}>
                    {/* Mapeo de mensajes */}
                    { chatToView.messages ? chatToView.messages.map((message,index) => {
                        console.log(message)
                        const receiving = message.ownerUserMessage !== props.userLogged.id 
                        return(
                    <div key={index} className="containerMessageContainer" style={receiving ? { justifyContent:'flex-start', margin: "0px 10px 10px 0px" } : { justifyContent:'flex-end', margin: "10px 0px 0px 10px" }}>
                        <div className="messageContainer" style={ receiving ? {borderTopLeftRadius:"0px"}: {borderTopRightRadius:"0px"}}>
                            <p className="messageText"> {message.message}</p>
                        </div>
                    </div>

                        )
                    })
                    : null
                }

                </div>
                <div className="inputContainer" style={minimized ? {opacity:"0", height:'0',transition:".7s"}: null}>
                    <input style={minimized ? {opacity:"0", height:'0',transition:".7s"}: null} value={newMessage} onChange={readInput} type="text" className="inputStyle" ></input>
                    <div className="iconSendContainer" onClick={sendMessage} style={minimized ? {opacity:"0", height:'0',transition:".7s"}: {transition:".7s"}}>
                        <SiRiotgames/>
                    </div>
                </div>
            </div>
    
    )
    
}

const mapStateToProps = state =>{
    return {
        userLogged : state.userReducer.userLogged
    }
}

const mapDispatchToProps = {
    sendMessage: chatActions.sendMessage
}

export default connect (mapStateToProps, mapDispatchToProps) (Messages)