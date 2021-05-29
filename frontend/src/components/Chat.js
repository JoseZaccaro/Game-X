import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import Messages from './Messages' 
import {AiOutlineUsergroupAdd, AiOutlineUserDelete} from 'react-icons/ai'


const Chat = (props) => {

    const [chats, setChats] = useState([])
    const [leftHide, setLeftHide] = useState(true)
    const [rightHide, setRightHide] = useState(true)
    const [chatToView, setChatToView] = useState({messages:[], user:{name:"jose"}})
    const [inputValue,setInputValue] = useState({ inputValue:""})
    const [list, setList] = useState ({ beAFriendList:[]})
    const [viewSearchBar, setViewSearchBar]  = useState(false)
    const setInput = (e) => {
        const valor = e.target.value
        setInputValue({inputValue:valor})
    }
    useEffect(()=>{
        const buscarAmigos = async()=>{
            const res = await props.searchUser(inputValue.inputValue)
            setList({beAFriendList:res})
        }
        buscarAmigos()
        // eslint-disable-next-line
    },[inputValue])

      console.log(list.beAFriendList)
   
      const changeViewSearchBar = ()=>{
        setViewSearchBar(!viewSearchBar)
        setInputValue({inputValue:""})
      }
    const searchBarStyle = ( rightHide && !viewSearchBar ? {transform: "translate(20rem,0)", opacity:'0',transition: ".7s"}: rightHide && viewSearchBar ? {transform: "translate(20rem,3rem)", opacity:'0',transition: ".7s"} : viewSearchBar ? {transform: "translate(0,3rem)",transition: ".7s", opacity:'0'} : {transition: ".7s"} )

    const innerContainerRightSideStyle = ( rightHide ?
    {transform: "translate(20rem, 0)",transition: ".7s" , opacity:'0'} 
    : viewSearchBar && !rightHide ? {transform: "translate(0, 0)",transition: ".7s", borderTopLeftRadius:'10px'}  : {transform: "translate(0, 0)",transition: ".7s", opacity:'1'} ) 
    return (<>
        <div className="extContainer">
            <button onClick={()=> setLeftHide(!leftHide)}>Left</button>
            <button onClick={()=> setRightHide(!rightHide)}>Right</button>
            <div style={searchBarStyle} className="searchBarFriend">
                <input style={searchBarStyle, {transition:"all 0.7s ease 0.5s"}}  className="searchBarInput" onChange={setInput}  value={inputValue.inputValue} placeholder="Add new friends"/>
            </div>

            <Messages props={{ leftHide, setLeftHide, rightHide, chatToView, setChatToView}}/>
            { !inputValue.inputValue.length ? 
            <div className="innerContainerRightSide" style={innerContainerRightSideStyle }>
                <div className="containerRight">
                    <div className="titleContainer">
                        <h1 className="chatTitle">Chats
                        </h1>
                       { viewSearchBar ? <AiOutlineUsergroupAdd onClick={changeViewSearchBar} className="iconoAddFriends" />
                        :<AiOutlineUserDelete onClick={changeViewSearchBar} className="iconoAddFriends" />}
                    </div>
                    <div className="friendContainer">
                        <div className="friendUserImage" style={{backgroundImage:'url("../assets/fondo.png")'}}></div>
                        <p className="userName">Friend UserName</p>
                    </div>
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

                    {list.beAFriendList.map(person => {
                        return <div className=""></div>
                    })}
                </div>
            </div>
            }
        </div>
    </>)
}



const mapDispatchToProps = {

    searchUser : userActions.searchUser
  
  }
  

export default  connect(null,mapDispatchToProps)(Chat)