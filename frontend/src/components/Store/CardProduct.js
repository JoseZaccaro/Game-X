const CardProduct = (props) => {
    const {image, title} = props
    return (
        <div className={`card ${title === 'London' ?'ultimasUnidades' : null}`}>
            <div className="productImageCard" style={{ backgroundImage: `url("${image}")` }}></div>
            <div className="card-info">
                <h3>God of War</h3>
            </div>
            <div className="card-hover">
                <p className="description-card">description</p>
            </div>
        </div>
    );
}

export default CardProduct;