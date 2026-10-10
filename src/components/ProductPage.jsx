import { useEffect } from "react";
import useShopData from "../hooks/useShopData";
import EnquiryButtons from "./EnquiryButtons";

// Opens when the user clicks "More": all products of that one card, as full cards.
export default function ProductPage({ card }) {
  const { products } = useShopData();
  const items = products.filter((p) => p.cat === card);

  useEffect(() => { window.scrollTo(0, 0); }, [card]);

  return (
    <section className="block product-page">
      <a className="back-button" href="#products">← Back</a>
      <h1>{card}</h1>
      <p className="sub">{items.length} product{items.length === 1 ? "" : "s"} available</p>
      {items.length === 0 && <p className="empty">No products in this card yet.</p>}
      <div className="grid">
        {items.map((p) => (
          <article className="card" key={p.id}>
            {p.image && <img className="pimg" src={p.image} alt={p.name} loading="lazy" />}
            <span className="tag">{card}</span>
            {!p.inStock && <span className="oos">Out of stock</span>}
            <h3>{p.name}</h3>
            <p>{p.note}</p>
            <div className="price">{p.price}</div>
            <EnquiryButtons subject={p.name} small />
          </article>
        ))}
      </div>
    </section>
  );
}
