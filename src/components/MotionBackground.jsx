import React from 'react';
import { Truck, Package, Leaf, Flag, Megaphone, Handshake, Send } from 'lucide-react';
// Decorative motion only. Content remains readable and pointer interactions pass through.
export default function MotionBackground(){
 return <div className="motion-atmosphere" aria-hidden="true"><div className="atmosphere-grid"/>
 <svg className="ambient-route" viewBox="0 0 600 220" fill="none" preserveAspectRatio="xMidYMid meet"><path d="M-40 180H165Q225 180 225 120T300 60H650" stroke="currentColor" strokeWidth="30" opacity=".12"/><path className="ambient-route-dashes" d="M-40 180H165Q225 180 225 120T300 60H650" stroke="currentColor" strokeWidth="2" strokeDasharray="9 12"/></svg>
 <span className="ambient-mini-truck"><Truck size={32}/></span>
 <span className="ambient-token token-cargo"><Package/></span>
 <span className="ambient-token token-leaf"><Leaf/></span>
 <span className="ambient-token token-page"><Flag className="motif-story"/><Megaphone className="motif-news"/><Handshake className="motif-people"/><Send className="motif-contact"/><Truck className="motif-fleet"/></span><div className="atmosphere-glow glow-blue"/><div className="atmosphere-glow glow-gold"/>{Array.from({length:6},(_,i)=><span className="atmosphere-line" key={i} style={{'--line-position':`${12+i*15}%`,'--line-duration':`${9+i*2}s`,'--line-delay':`${-i*3}s`}}/>)}</div>;
}
