import { SHOP } from "../data/shop";

export const waLink = (text) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;
export const telLink = `tel:+${SHOP.phone}`;
