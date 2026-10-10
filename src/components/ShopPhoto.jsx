import { useState } from "react";
import { SHOP } from "../data/shop";
import AnimatedPhone from "./AnimatedPhone";

export default function ShopPhoto() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="photo-wrap">
    <figure className="photo">
      {failed ? (
        <div className="photo-empty">
          <strong>Add your shop photo</strong>
          <span>Save it as <code>public/shop.jpg</code></span>
        </div>
      ) : (
        <img src={SHOP.photo} alt={`${SHOP.name} storefront`} onError={() => setFailed(true)} />
      )}
      <figcaption>{SHOP.address}</figcaption>
    </figure>
    <AnimatedPhone />
    </div>
  );
}
