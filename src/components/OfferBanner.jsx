import { useState, useEffect } from "react";
import { SHOP } from "../data/shop";
import { waLink } from "../utils/links";

export default function OfferBanner({ offers = [] }) {
  const [i, setI] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (offers.length < 2 || hidden) return;
    const t = setInterval(() => setI((n) => (n + 1) % offers.length), 4000);
    return () => clearInterval(t);
  }, [hidden, offers.length]);

  if (hidden || offers.length === 0) return null;
  const o = offers[i % offers.length];
  return (
    <div className="offer" role="region" aria-label="Current offers">
      <span className="offer-badge">Offer</span>
      <span className="offer-text" aria-live="polite">{o.text}</span>
      <a
        className="offer-link"
        href={waLink(`Hello ${SHOP.name}, I want to claim this offer: ${o.ask}.`)}
        target="_blank"
        rel="noreferrer"
      >
        Claim on WhatsApp
      </a>
      <button className="offer-x" onClick={() => setHidden(true)} aria-label="Close offer banner">×</button>
    </div>
  );
}
