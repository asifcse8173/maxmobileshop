import { SHOP } from "../data/shop";
import { waLink, telLink } from "../utils/links";

export default function EnquiryButtons({ subject, small }) {
  const msg = `Hello ${SHOP.name}, I want to enquire about: ${subject}. Please share price and availability.`;
  return (
    <div className={`btns ${small ? "small" : ""}`}>
      <a className="btn wa" href={waLink(msg)} target="_blank" rel="noreferrer">WhatsApp</a>
      <a className="btn call" href={telLink}>Call</a>
    </div>
  );
}
