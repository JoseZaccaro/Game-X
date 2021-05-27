import React from "react"


class Administrator extends React.Component{

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
                <h1>Administrator</h1>
            </div>        
        )
    }
}

export default Administrator
