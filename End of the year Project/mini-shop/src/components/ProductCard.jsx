function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p>{product.price} DH</p>
      <a href={`/products/${product.id}`}>Voir détail</a>
    </div>
  );
}

export default ProductCard;
