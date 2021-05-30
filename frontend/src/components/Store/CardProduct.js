import { NavLink } from 'react-router-dom'
const CardProduct = (props) => {
    const { image, title, idGame } = props
    return (
        <>
        {<NavLink to={`/product/${idGame}`}>
                <figure className="card">
                    <div className="cardImageProduct" style={{backgroundImage: `url("${image}")`}}></div>
                    <figcaption>{title}</figcaption>
                </figure>
        </ NavLink>}       
        </>
    );
}

export default CardProduct;