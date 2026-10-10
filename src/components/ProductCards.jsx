import { PRODUCT_CARDS } from "../data/products";
import { SHOP } from "../data/shop";
import { waLink } from "../utils/links";

export const LIMIT = 4;

export const enquiryLink = (p) =>
  waLink(`Hello ${SHOP.name}, I want to enquire about: ${p.name}. Please share price and availability.`);

// 16 fixed cards. Each shows only the first 4 products (newest first) + a More button.
export default function ProductCards({ products }) {
  return (
    <div className="product-cards">
      {PRODUCT_CARDS.map((card) => {
        const items = products.filter((p) => p.cat === card);
        return (
          <article className="product-card" key={card}>
            <h3>{card}</h3>
            <div className="product-buttons">
              {items.slice(0, LIMIT).map((p) => (
                <a key={p.id} className="product-button" href={enquiryLink(p)} target="_blank" rel="noreferrer">
                  <span>{p.name}</span>
                  <small>{p.price}</small>
                </a>
              ))}
              {items.length === 0 && <p className="product-empty">No products yet</p>}
              {items.length > LIMIT && (
                <a className="more-button" href={`#/products/${encodeURIComponent(card)}`}>More</a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
