import { useEffect, useState } from "react";
import "./styles.css";
import { SHOP, TRUST } from "./data/shop";
import { SERVICES } from "./data/services";
import useShopData from "./hooks/useShopData";
import { REVIEWS } from "./data/reviews";
import { waLink, telLink } from "./utils/links";
import EnquiryButtons from "./components/EnquiryButtons";
import OfferBanner from "./components/OfferBanner";
import ShopPhoto from "./components/ShopPhoto";
import Estimator from "./components/Estimator";
import BookingForm from "./components/BookingForm";
import Stars from "./components/Stars";
import ProductCards from "./components/ProductCards";

export default function App() {
  const { products, offers } = useShopData();
  const [model, setModel] = useState("");

  // Coming back from a "More" page: jump to the products section
  useEffect(() => {
    if (window.location.hash === "#products") document.getElementById("products")?.scrollIntoView();
  }, []);

  const quoteMsg = `Hello ${SHOP.name}, my phone model is ${model || "(not entered)"}. I need a repair quote.`;

  return (
    <div className="app">

      <OfferBanner offers={offers} />

      <div className="strip">
        <span>{SHOP.hours}</span>
        <a href={telLink}>Call {SHOP.display}</a>
      </div>

      <header className="top">
        <a className="brand" href="#top">
          <span className="mark">M</span>
          <span className="brand-name">{SHOP.name}</span>
        </a>
        <nav>
          <a href="#services">Repair</a>
          <a href="#price">Price</a>
          <a href="#products">Accessories</a>
          <a href="#book">Book</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="top" className="hero">
        <div className="hero-text">
          <h1>Mobile repair you can trust, accessories you need.</h1>
          <p>
            {SHOP.tagline}. Screen, battery and body replacement with quality parts, clear pricing and warranty.
          </p>
          <div className="quote">
            <input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Your phone model, e.g. Redmi Note 12"
              aria-label="Phone model"
            />
            <a className="btn wa" href={waLink(quoteMsg)} target="_blank" rel="noreferrer">
              Get quote on WhatsApp
            </a>
          </div>
          <a className="textlink" href={telLink}>Or call us: {SHOP.display}</a>
        </div>
        <ShopPhoto />
      </section>

      <section className="trust">
        {TRUST.map((x) => (
          <div key={x.t}>
            <b>{x.t}</b>
            <span>{x.d}</span>
          </div>
        ))}
      </section>

      <section id="services" className="block">
        <h2>Mobile repairing services</h2>
        <p className="sub">Tell us the problem. We check it free and quote before we start.</p>
        <div className="grid">
          {SERVICES.map((s) => (
            <article className="card" key={s.id}>
              <img className="service-img" src={s.image} alt="" loading="lazy" />
              <div className="icon" aria-hidden="true">{s.icon}</div>
              <h3>{s.name}</h3>
              <p>{s.note}</p>
              <span className="time">Usual time: {s.time}</span>
              <EnquiryButtons subject={`${s.name} (repair)`} small />
            </article>
          ))}
        </div>
      </section>

      <section id="price" className="block alt">
        <h2>Check repair price</h2>
        <p className="sub">Pick your phone brand and repair to see an approximate price.</p>
        <Estimator />
      </section>

      <section id="products" className="block">
        <h2>Accessories and parts in stock</h2>
        <p className="sub">Cables, audio, protection and replacement parts for all major brands.</p>
        <ProductCards products={products} />
      </section>

      <section id="reviews" className="block alt">
        <h2>What customers say</h2>
        <div className="grid">
          {REVIEWS.map((r) => (
            <article className="card" key={r.id}>
              <Stars n={r.stars} />
              <p>“{r.text}”</p>
              <b>{r.name}</b>
            </article>
          ))}
        </div>
      </section>

      <section id="book" className="block">
        <h2>Book a repair</h2>
        <p className="sub">Fill this in and it opens WhatsApp with your details ready to send.</p>
        <BookingForm />
      </section>

      <section id="contact" className="block contact">
        <div>
          <h2>Visit {SHOP.name}</h2>
          <p>{SHOP.address}</p>
          <p>{SHOP.hours}</p>
          <p>Phone: {SHOP.display}</p>
        </div>
        <div className="contact-cta">
          <EnquiryButtons subject="general enquiry" />
          <a className="btn map" href={SHOP.map} target="_blank" rel="noreferrer">Get directions on Google Maps</a>
        </div>
      </section>

      <a className="float" href={waLink(`Hello ${SHOP.name}, I have an enquiry.`)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        WhatsApp us
      </a>

      <footer>© {new Date().getFullYear()} {SHOP.name}. All brand names belong to their owners. <a href="#/admin">Admin</a></footer>
    </div>
  );
}
