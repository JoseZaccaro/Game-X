import React from "react"


class Home extends React.Component{

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
                <h1>Home</h1>
            </div>        
        )
    }
}

export default Home
