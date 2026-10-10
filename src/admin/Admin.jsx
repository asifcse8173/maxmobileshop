import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductsAdmin from "./ProductsAdmin";
import OffersAdmin from "./OffersAdmin";

export default function Admin() {
  const [session, setSession] = useState(undefined);
  const [tab, setTab] = useState("products");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) { setSession(null); return; }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!supabase) {
    return (
      <div className="adm"><div className="adm-box">
        <h1>Admin setup needed</h1>
        <p>Add your Supabase URL and key in the <code>.env</code> file (see README), then restart <code>npm run dev</code>.</p>
        <a href="#/">Back to website</a>
      </div></div>
    );
  }
  if (session === undefined) return <div className="adm"><p>Loading…</p></div>;

  if (!session) {
    const login = async (e) => {
      e.preventDefault();
      setBusy(true); setErr("");
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr("Wrong email or password.");
      setBusy(false);
    };
    return (
      <div className="adm"><form className="adm-box" onSubmit={login}>
        <h1>Admin login</h1>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" required />
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn call" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        <a href="#/">Back to website</a>
      </form></div>
    );
  }

  return (
    <div className="adm">
      <header className="adm-top">
        <strong>Max Mobile Shop admin</strong>
        <div>
          <a href="#/">View website</a>
          <button className="adm-btn" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
      </header>
      <div className="adm-tabs">
        <button className={tab === "products" ? "chip on" : "chip"} onClick={() => setTab("products")}>Products</button>
        <button className={tab === "offers" ? "chip on" : "chip"} onClick={() => setTab("offers")}>Offers</button>
      </div>
      {tab === "products" ? <ProductsAdmin /> : <OffersAdmin />}
    </div>
  );
}
