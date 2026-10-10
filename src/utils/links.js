import { SHOP } from "../data/shop";

export const waLink = (text) => `https://wa.me/${SHOP.phone}?text=${encodeURIComponent(text)}`;
export const telLink = `tel:+${SHOP.phone}`;
