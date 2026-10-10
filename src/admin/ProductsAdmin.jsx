import { useEffect, useState } from "react";
import { supabase, errText } from "../lib/supabase";
import { PRODUCT_CARDS, PRODUCTS } from "../data/products";

const EMPTY = { id: null, name: "", category: PRODUCT_CARDS[0], note: "", price: "", in_stock: true, image_url: null };

export default function ProductsAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) setMsg("Could not load products: " + errText(error));
    else setItems(data);
  };
  useEffect(() => { load(); }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setMsg("Enter the product name."); return; }
    if (file && (!/^image\/(jpeg|png|webp|gif)$/.test(file.type) || file.size > 2 * 1024 * 1024)) {
      setMsg("Photo must be a JPG, PNG, WebP or GIF under 2 MB."); return;
    }
    setBusy(true); setMsg("");
    let image_url = form.image_url;
    if (file) {
      const path = Date.now() + "-" + file.name.replace(/[^a-z0-9.]/gi, "_");
      const up = await supabase.storage.from("product-images").upload(path, file);
      if (up.error) { setMsg("Photo upload failed: " + errText(up.error)); setBusy(false); return; }
      image_url = supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl;
    }
    const row = { name: form.name.trim(), category: form.category, card_id: form.category, note: form.note, price: form.price, in_stock: form.in_stock, image_url };
    const { error } = form.id
      ? await supabase.from("products").update(row).eq("id", form.id)
      : await supabase.from("products").insert(row);
    if (error) setMsg("Save failed: " + errText(error));
    else { setMsg(form.id ? "Product updated." : "Product added."); setForm(EMPTY); setFile(null); load(); }
    setBusy(false);
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) setMsg("Delete failed: " + errText(error)); else load();
  };

  const toggleStock = async (p) => {
    const { error } = await supabase.from("products").update({ in_stock: !p.in_stock }).eq("id", p.id);
    if (error) setMsg("Update failed: " + errText(error)); else load();
  };

  const importSample = async () => {
    const rows = PRODUCTS.map((p) => ({ name: p.name, category: p.cat, card_id: p.cat, note: p.note, price: p.price, in_stock: true }));
    const { error } = await supabase.from("products").insert(rows);
    setMsg(error ? "Import failed: " + errText(error) : "Sample products imported.");
    load();
  };

  return (
    <div className="adm-grid">
      <form className="adm-card" onSubmit={save}>
        <h2>{form.id ? "Edit product" : "Add product"}</h2>
        <input placeholder="Product name" value={form.name} onChange={set("name")} aria-label="Product name" />
        <select value={form.category} onChange={set("category")} aria-label="Category">
          {PRODUCT_CARDS.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input placeholder="Short note, e.g. 1 m, 3A, braided" value={form.note} onChange={set("note")} aria-label="Note" />
        <input placeholder="Price, e.g. ₹149 or Ask price" value={form.price} onChange={set("price")} aria-label="Price" />
        <label className="adm-check"><input type="checkbox" checked={form.in_stock} onChange={set("in_stock")} /> In stock</label>
        <label className="adm-file">Photo (optional)
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
        </label>
        {form.image_url && !file && <img className="adm-thumb" src={form.image_url} alt="Current product" />}
        {msg && <p className="adm-msg" role="status">{msg}</p>}
        <div className="btns">
          <button className="btn call" disabled={busy}>{busy ? "Saving…" : form.id ? "Save changes" : "Add product"}</button>
          {form.id && <button type="button" className="btn adm-cancel" onClick={() => { setForm(EMPTY); setFile(null); }}>Cancel</button>}
        </div>
      </form>

      <div className="adm-card">
        <h2>All products ({items.length})</h2>
        {items.length === 0 && (
          <p>No products yet. <button className="adm-btn" onClick={importSample}>Import sample products</button></p>
        )}
        <ul className="adm-list">
          {items.map((p) => (
            <li key={p.id}>
              <div>
                <b>{p.name}</b>
                <span>{p.category} · {p.price || "no price"} · {p.in_stock ? "In stock" : "Out of stock"}</span>
              </div>
              <div className="adm-actions">
                <button className="adm-btn" onClick={() => toggleStock(p)}>{p.in_stock ? "Mark out" : "Mark in"}</button>
                <button className="adm-btn" onClick={() => { setForm(p); setFile(null); window.scrollTo(0, 0); }}>Edit</button>
                <button className="adm-btn danger" onClick={() => remove(p)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
