import { useState } from "react";
import { SHOP } from "../data/shop";
import { PRICES, REPAIRS } from "../data/prices";
import { waLink } from "../utils/links";

export default function Estimator() {
  const brands = Object.keys(PRICES);
  const [brand, setBrand] = useState(brands[0]);
  const [repair, setRepair] = useState(REPAIRS[0].k);
  const price = PRICES[brand][repair];
  const label = REPAIRS.find((r) => r.k === repair).label;
  const msg = `Hello ${SHOP.name}, I need ${label} for my ${brand} phone. Please confirm the exact price.`;
  return (
    <div className="est">
      <label>Phone brand
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {brands.map((b) => <option key={b}>{b}</option>)}
        </select>
      </label>
      <label>Repair needed
        <select value={repair} onChange={(e) => setRepair(e.target.value)}>
          {REPAIRS.map((r) => <option key={r.k} value={r.k}>{r.label}</option>)}
        </select>
      </label>
      <div className="est-result">
        <span>Approximate price</span>
        <strong>{price}</strong>
        <small>Final price depends on your exact model. Checkup is free.</small>
      </div>
      <a className="btn wa" href={waLink(msg)} target="_blank" rel="noreferrer">Confirm price on WhatsApp</a>
    </div>
  );
}
