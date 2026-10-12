import { PRODUCT_CARDS } from "../data/products";
import EnquiryButtons from "./EnquiryButtons";

export const LIMIT = 1;

// 16 fixed cards. Each shows only the newest product and a More button when needed.
export default function ProductCards({ products }) {
  return (
    <div className="product-cards">
      {PRODUCT_CARDS.map((card) => {
        const items = products.filter((p) => p.cat === card);
        const product = items[0];
        return (
          <article className="product-card" key={card}>
            <span className="tag">{card}</span>
            <div className="product-buttons">
              {product && (
                <>
                  {product.image ? (
                    <img className="pimg" src={product.image} alt={product.name} loading="lazy" />
                  ) : (
                    <div className="pimg" aria-label="Product image unavailable" />
                  )}
                  {!product.inStock && <span className="oos">Out of stock</span>}
                  <h3>{product.name}</h3>
                  <p>{product.note}</p>
                  <div className="price">{product.price}</div>
                  <EnquiryButtons subject={product.name} small />
                </>
              )}
              {items.length === 0 && <p className="product-empty">No products yet</p>}
            </div>
            {items.length > LIMIT && (
              <a className="more-button" href={`#/products/${encodeURIComponent(card)}`}>More</a>
            )}
          </article>
        );
      })}
    </div>
  );
}
