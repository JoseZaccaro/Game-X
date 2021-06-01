import { NavLink } from 'react-router-dom'
const CardProduct = (props) => {
    const { image, title, idGame } = props
    return (
        <>
            {<NavLink to={`/game/${idGame}`}>
                <figure className="card">
                    <div className="cardImageProduct" style={{ backgroundImage: `url("${image}")` }}>
                        <figcaption>{title}</figcaption>
                    </div>
                </figure>
            </ NavLink>}
        </>
    );
}

export default CardProduct;