import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { PRODUCTS } from "../data/products";
import { OFFERS } from "../data/offers";

export const fromRow = (r) => ({
  id: r.id,
  cat: r.card_id || r.category,
  name: r.name,
  note: r.note || "",
  price: r.price || "Ask price",
  image: r.image_url,
  inStock: r.in_stock,
  createdAt: r.created_at,
});

const localProducts = PRODUCTS.map((p, index) => ({ ...p, image: null, inStock: true, createdAt: index }));
const localOffers = OFFERS.map((o) => ({ id: o.id, text: o.text, ask: o.ask }));

// Loads products and offers from Supabase. Falls back to the files in src/data
// when Supabase is not set up (or the products table is still empty).
export default function useShopData() {
  const [data, setData] = useState({ products: localProducts, offers: localOffers });

  useEffect(() => {
    if (!supabase) return;
    let stop = false;
    (async () => {
      const [p, o] = await Promise.all([
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("offers").select("*").eq("active", true).order("created_at", { ascending: false }),
      ]);
      if (stop) return;
      setData({
        products: !p.error && p.data.length ? p.data.map(fromRow) : localProducts,
        offers: !o.error ? o.data.map((r) => ({ id: r.id, text: r.text, ask: r.text })) : localOffers,
      });
    })();
    return () => { stop = true; };
  }, []);

  return data;
}
