import React, { useState } from 'react'
import {VscChromeClose} from 'react-icons/vsc'
import {FaWindowMinimize} from 'react-icons/fa'
const Messages = (props)=>{

    
    let {leftHide, setLeftHide, rightHide, chatToView, setChatToView} = props.props
    
    const receiving = true
    const [minimized , setMinimized] = useState(false)

    const close = ()=>{
        setChatToView({messages:[],user:{name:null}})
        setLeftHide(!leftHide)
    }
    const minimize = ()=>{
        setMinimized(!minimized)
    }
    
    let leftSideHide 

        if(minimized && !rightHide){
            leftSideHide ={
                height:'3rem',
                transition:".7s",
                 transform:'translate(-20rem,0)'
                }
        }else if(!rightHide && minimized){
            leftSideHide ={
                height:'3rem',
                transition:".7s",
                 transform:'translate(20,0)'
                }
        }else if( minimized && rightHide ){
            
            leftSideHide = {
                height:'3rem',
                transition:".7s",
                 transform:'translate(0,0)'
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

        if(!chatToView.user.name){
            return null
        }

    return (
            <div className="containerLeftSide" style={ leftSideHide }>
                <div className="infoUserContainer" style={minimized ? {height:'100%',transition:".7s",borderBottom:'1px solid rgba(0,0,0,0)', marginTop:'10px'}: null}>
                    <div className="friendUserImage" style={minimized ? {backgroundImage:'url(../assets/fondo.png)',width:'2rem', height:'2rem'}:{backgroundImage:'url(../assets/fondo.png)'}}></div>
                    <p className="userName"> UserName</p>
                    <div className="iconoClose" style={minimized ? {marginLeft:'2.5rem'}: null} onClick={minimize}><FaWindowMinimize /></div>
                    { !minimized && <div className="iconoClose" onClick={close}><VscChromeClose className="iconoClose"/></div>}                
                    </div>
                <div className="chatsContainer" style={minimized ? {opacity:"0", height:'0',transition:".7s"}: null}>
                    {/* Mapeo de mensajes */}
                    {chatToView.messages.map((message,index) => {
                        return(
                    <div key={index} className="containerMessageContainer" style={receiving ? { justifyContent:'flex-start', margin: "0px 10px 10px 0px" } : { justifyContent:'flex-end', margin: "10px 0px 0px 10px" }}>
                        <div className="messageContainer" style={ receiving ? {borderTopLeftRadius:"0px"}: {borderTopRightRadius:"0px"}}>
                            <p className="messageText"> {message}</p>
                        </div>
                    </div>

                        )
                    })}

                </div>
                <div className="inputContainer" style={minimized ? {opacity:"0", height:'0',transition:".7s"}: null}>
                    <input style={minimized ? {opacity:"0", height:'0',transition:".7s"}: null} type="text" className="inputStyle" ></input>
                    <input className="sendButton" type="submit" value="send" style={minimized ? {opacity:"0", height:'0',transition:".7s"}: null}></input>
                </div>
            </div>
    
    )
    
}

export default Messages