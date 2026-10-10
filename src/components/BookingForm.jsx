import { useState } from "react";
import { SHOP } from "../data/shop";
import { waLink } from "../utils/links";

export default function BookingForm() {
  const [f, setF] = useState({ name: "", phone: "", model: "", problem: "", time: "Today" });
  const [err, setErr] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.phone.trim()) {
      setErr("Please enter your name and phone number.");
      return;
    }
    setErr("");
    const msg = `New repair booking for ${SHOP.name}\nName: ${f.name}\nPhone: ${f.phone}\nModel: ${f.model || "-"}\nProblem: ${f.problem || "-"}\nVisit time: ${f.time}`;
    window.open(waLink(msg), "_blank", "noopener");
  };
  return (
    <form className="book" onSubmit={send} noValidate>
      <input placeholder="Your name" value={f.name} onChange={set("name")} aria-label="Your name" />
      <input placeholder="Phone number" inputMode="tel" value={f.phone} onChange={set("phone")} aria-label="Phone number" />
      <input placeholder="Phone model" value={f.model} onChange={set("model")} aria-label="Phone model" />
      <select value={f.time} onChange={set("time")} aria-label="Visit time">
        <option>Today</option><option>Tomorrow</option><option>Home pickup needed</option>
      </select>
      <textarea placeholder="What is the problem?" rows={3} value={f.problem} onChange={set("problem")} aria-label="Problem" />
      {err && <p className="err" role="alert">{err}</p>}
      <button className="btn wa" type="submit">Book on WhatsApp</button>
    </form>
  );
}
