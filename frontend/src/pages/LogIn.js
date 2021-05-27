import React from "react"


class LogIn extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    
    componentDidMount(){
        this.toTop()
    }

    render() {
         
        return(
            <div >
                <h1>LogIn</h1>
            </div>        
        )
    }
}

export default LogIn
