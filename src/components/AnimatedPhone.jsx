
export default function AnimatedPhone() {
  return (
    <div className="anim" aria-hidden="true">
      <svg viewBox="0 0 160 210" width="100%" role="img">
        <g className="float-a">
          <circle cx="22" cy="40" r="9" fill="#f5a623" />
          <circle cx="40" cy="48" r="9" fill="#f5a623" />
          <path d="M22 49 v14 M40 57 v14" stroke="#f5a623" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="float-b">
          <rect x="120" y="150" width="30" height="16" rx="3" fill="#1d4ed8" />
          <rect x="150" y="155" width="4" height="6" rx="1" fill="#1d4ed8" />
          <path d="M131 154 l-4 8 h6 l-4 6" stroke="#fff" strokeWidth="2" fill="none" />
        </g>
        <g className="phone">
          <rect x="35" y="15" width="90" height="180" rx="14" fill="#0b1f3a" />
          <rect x="42" y="30" width="76" height="150" rx="6" fill="#e8eefc" />
          <rect x="68" y="21" width="24" height="4" rx="2" fill="#586678" />
          <g className="crack" stroke="#0b1f3a" strokeWidth="1.6" fill="none" strokeLinecap="round">
            <path d="M92 30 L80 70 L96 90 L78 125 L90 180" />
            <path d="M80 70 L52 78 M96 90 L116 100 M78 125 L55 140" />
          </g>
          <g className="fixed">
            <circle cx="80" cy="105" r="26" fill="#16a34a" />
            <path d="M67 105 l9 10 l17 -20" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </svg>
      <span className="anim-label">Fixed in minutes</span>
    </div>
  );
}
