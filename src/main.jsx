import React, { useEffect, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ProductPage from "./components/ProductPage.jsx";
import { PRODUCT_CARDS } from "./data/products";

const Admin = lazy(() => import("./admin/Admin.jsx"));

// A broken or fake link like #/products/%E0%A4 must never crash the page.
function cardFromHash(hash) {
  try {
    const name = decodeURIComponent(hash.slice("#/products/".length));
    return PRODUCT_CARDS.includes(name) ? name : null;
  } catch {
    return null;
  }
}

// Website at "/", admin panel at "/#/admin"
function Root() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  if (hash.startsWith("#/admin")) return <Suspense fallback={null}><Admin /></Suspense>;
  if (hash.startsWith("#/products/")) {
    const card = cardFromHash(hash);
    if (card) return <ProductPage card={card} />;
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
