import React from "react"
import Header from "../components/Header"
import CardProduct from "../components/Store/CardProduct"


class Store extends React.Component {

    toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
    state = {
        products: [
            {
                src: 'https://thedirect.s3.amazonaws.com/media/article_full/2021games.jpg',
                header: 'Ushuaia',
                id: 1
            },
            {
                src: 'https://cdn.gamer-network.net/2021/articles/2021-03-18-22-24/best-ps5-games-20261-1616106266172.jpg/EG11/thumbnail/1920x1078/format/jpg/quality/80',
                header: 'London',
                id: 3
            },
            {
                src: 'https://as.com/meristation/imagenes/2020/06/12/noticias/1591952507_470156_1591952814_noticia_normal_recorte1.jpg',
                header: 'New York',
                id: 5
            },
            {
                src: 'https://tagmag.news/assets/artikels/_height350/God-of-War-2.jpg',
                header: 'Sydney',
                id: 6
            },
            {
                src: 'https://i.imgur.com/7CApOUG.jpg',
                header: 'Shanghai',
                id: 8
            },
            {
                src: 'https://i.imgur.com/sBrjv2i.jpg',
                header: 'Seattle',
                id: 7
            }
        ]
    }

    componentDidMount() {
        this.toTop()
    }

    render() {

        return (
            <>
            <Header />
                <div className="parent">
                    <div className="div1" style={{ backgroundImage: `url("${this.state.products[0].src}")` }}> </div>
                    <div className="div2" style={{ backgroundImage: `url("${this.state.products[2].src}")` }}> </div>
                    <div className="div3" style={{ backgroundImage: `url("${this.state.products[3].src}")` }}> </div>
                    <div className="div4" style={{ backgroundImage: `url("${this.state.products[4].src}")` }}> </div>
                    <div className="div5" style={{ backgroundImage: `url("${this.state.products[5].src}")` }}> </div>
                </div>
                <div className="gridCard">
                    {this.state.products.map((product, index) =>{
                        return(
                            <CardProduct key={index} image={product.src} title={product.header}/>
                        )
                    })}
                </div>
            </>
        )
    }
}

export default Store
