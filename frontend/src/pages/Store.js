import React from "react"
import { connect } from 'react-redux';
import CardProduct from "../components/Store/CardProduct";
import hardwareProductsActions from '../redux/actions/hardwareProductsActions';


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
                src: 'https://i.imgur.com/JueO6Qo.jpg',
                header: 'Ushuaia',
                id: 1,
                price: 250
            },
            {
                src: 'https://cdn.gamer-network.net/2021/articles/2021-03-18-22-24/best-ps5-games-20261-1616106266172.jpg/EG11/thumbnail/1920x1078/format/jpg/quality/80',
                header: 'London',
                id: 3,
                price: 350
            },
            {
                src: 'https://as.com/meristation/imagenes/2020/06/12/noticias/1591952507_470156_1591952814_noticia_normal_recorte1.jpg',
                header: 'New York',
                id: 5,
                price: 150
            },
            {
                src: 'https://tagmag.news/assets/artikels/_height350/God-of-War-2.jpg',
                header: 'Sydney',
                id: 6,
                price: 650
            },
            {
                src: 'https://i.imgur.com/7CApOUG.jpg',
                header: 'Shanghai',
                id: 8,
                price: 550
            },
            {
                src: 'https://i.imgur.com/sBrjv2i.jpg',
                header: 'Seattle',
                id: 7,
                price: 250
            },
            {
                src: 'https://i.imgur.com/8OXZEVs.jpg',
                header: 'Sydney',
                id: 6,
                price: 650
            },
            {
                src: 'https://i.imgur.com/7CApOUG.jpg',
                header: 'Shanghai',
                id: 8,
                price: 550
            },
        ]
    }

    componentDidMount() {
        this.toTop()
        this.props.loadHardwareProducts()
    }

    render() {

        return (
            <div className="containerStore">
                <div className="parent">
                    <div className="div1" style={{ backgroundImage: `url("${this.state.products[0].src}")` }}> </div>
                    <div className="div2" style={{ backgroundImage: `url("${this.state.products[2].src}")` }}> </div>
                    <div className="div3" style={{ backgroundImage: `url("${this.state.products[3].src}")` }}> </div>
                    <div className="div4" style={{ backgroundImage: `url("${this.state.products[4].src}")` }}> </div>
                    <div className="div5" style={{ backgroundImage: `url("${this.state.products[5].src}")` }}> </div>
                </div>

                <div className="cards containerCards">
                    {this.state.products.map((product, index) => {
                        return (
                            <CardProduct image={product.src} title={product.header} id={product.id} />
                        )
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        hardwareProducts: state.hardwareProductsReducer.hardwareProducts,
        preLoader: state.hardwareProductsReducer.preLoader,
    }
}
const mapDispatchToProps = {
    loadHardwareProducts: hardwareProductsActions.loadHardwareProducts
}
export default connect(mapStateToProps, mapDispatchToProps)(Store)
