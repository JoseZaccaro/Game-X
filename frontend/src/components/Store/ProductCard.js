import { NavLink } from 'react-router-dom'
const ProductCard = (props) => {
    const { image,  id } = props
    return (
        <>
            {<NavLink to={`/product/${id}`}>
                <div className="card">
                    <div className="productImageCard" style={{ backgroundImage: `url("${image}")` }}></div>
                </div>
            </NavLink>
            }
        </>
    );
}

export default ProductCard;