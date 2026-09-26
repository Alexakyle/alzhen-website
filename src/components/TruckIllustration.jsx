import React from "react";
export default function TruckIllustration({ variant = "orange" }) {
  return (
    <svg
      className={"wing-illustration " + variant}
      viewBox="0 0 400 190"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="205" cy="167" rx="170" ry="10" fill="currentColor" opacity=".08" />
      <g className="wing-body">
        <path
          d="M40 48Q40 40 48 40H277V142H40Z"
          fill="var(--truck-box,#fff6d0)"
          stroke="#213554"
          strokeWidth="3"
        />
        <path d="M49 51H267V119H49Z" fill="var(--truck-wing,#f6db71)" />
        <path
          d="M60 53V118M90 53V118M120 53V118M150 53V118M180 53V118M210 53V118M240 53V118"
          stroke="#213554"
          opacity=".2"
          strokeWidth="2"
        />
        <path d="M49 124H267M49 135H267" stroke="#213554" opacity=".4" />
        <text
          x="91"
          y="90"
          fontFamily="Arial,sans-serif"
          fontSize="25"
          fontWeight="900"
          fill="#213554"
          letterSpacing="3"
        >
          ALZHEN
        </text>
        <path
          d="M280 75H333L366 116V147H280Z"
          fill="var(--truck-cab,#edce50)"
          stroke="#213554"
          strokeWidth="3"
        />
        <path d="M294 84H327L348 111H294Z" fill="#253d60" />
        <path d="M300 87H322L310 109H300Z" fill="#a6bcdc" opacity=".7" />
        <path d="M295 122H309" stroke="#213554" strokeWidth="3" strokeLinecap="round" />
        <path d="M352 122H365V131H352Z" fill="#ffeca0" />
        <path d="M30 143H373V151H30Z" fill="#213554" />
      </g>
      {[85, 126, 325].map((x) => (
        <g key={x}>
          <circle cx={x} cy="151" r="18" fill="#182c4a" />
          <circle cx={x} cy="151" r="9" fill="#a3b5cf" />
          <circle cx={x} cy="151" r="3" fill="#182c4a" />
        </g>
      ))}
    </svg>
  );
}
