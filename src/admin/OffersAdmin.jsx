import { useEffect, useState } from "react";
import { supabase, errText } from "../lib/supabase";
import { OFFERS } from "../data/offers";

export default function OffersAdmin() {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    const { data, error } = await supabase.from("offers").select("*").order("created_at", { ascending: false });
    if (error) setMsg("Could not load offers: " + errText(error));
    else setItems(data);
  };
  useEffect(() => { load(); }, []);

  const add = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const { error } = await supabase.from("offers").insert({ text: text.trim(), active: true });
    if (error) setMsg("Save failed: " + errText(error)); else { setText(""); setMsg("Offer added."); load(); }
  };

  const check = (error) => { if (error) setMsg("Failed: " + errText(error)); else load(); };

  const toggle = async (o) => {
    const { error } = await supabase.from("offers").update({ active: !o.active }).eq("id", o.id);
    check(error);
  };

  const edit = async (o) => {
    const t = window.prompt("Change offer text", o.text);
    if (t && t.trim()) {
      const { error } = await supabase.from("offers").update({ text: t.trim() }).eq("id", o.id);
      check(error);
    }
  };

  const remove = async (o) => {
    if (window.confirm("Delete this offer?")) {
      const { error } = await supabase.from("offers").delete().eq("id", o.id);
      check(error);
    }
  };

  const importSample = async () => {
    const { error } = await supabase.from("offers").insert(OFFERS.map((o) => ({ text: o.text, active: true })));
    check(error);
  };

  return (
    <div className="adm-grid">
      <form className="adm-card" onSubmit={add}>
        <h2>Add offer</h2>
        <input placeholder="e.g. Diwali offer: 10% off on display replacement" value={text} onChange={(e) => setText(e.target.value)} aria-label="Offer text" />
        {msg && <p className="adm-msg" role="status">{msg}</p>}
        <button className="btn call">Add offer</button>
      </form>

      <div className="adm-card">
        <h2>Offers on the website banner</h2>
        <p className="adm-hint">Only offers marked Active are shown. If none are active, the banner is hidden.</p>
        {items.length === 0 && <p>No offers yet. <button className="adm-btn" onClick={importSample}>Import sample offers</button></p>}
        <ul className="adm-list">
          {items.map((o) => (
            <li key={o.id}>
              <div><b>{o.text}</b><span>{o.active ? "Active" : "Hidden"}</span></div>
              <div className="adm-actions">
                <button className="adm-btn" onClick={() => toggle(o)}>{o.active ? "Hide" : "Show"}</button>
                <button className="adm-btn" onClick={() => edit(o)}>Edit</button>
                <button className="adm-btn danger" onClick={() => remove(o)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
