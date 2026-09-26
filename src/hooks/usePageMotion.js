import {useEffect} from 'react';

// Replays content entrances on navigation and observes newly rendered filter results.
export default function usePageMotion(page, enabled){
 useEffect(()=>{
  const root=document.getElementById('main-content');
  if(!root||!enabled)return;
  const selectors='.section, .truck-card, .core-values article, .service-accordions details, .careers-jump a, .ann-feature, .ann-roadside, .form-card, .contact-detail, .purpose-card';
  const tracked=new Set();
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('motion-arrived');observer.unobserve(entry.target)}}},{threshold:.07});
  const register=()=>root.querySelectorAll(selectors).forEach(el=>{if(tracked.has(el))return;tracked.add(el);const siblings=Array.from(el.parentElement.children).filter(n=>n.matches(selectors));el.style.setProperty('--arrival-delay',`${Math.min(siblings.indexOf(el),3)*90}ms`);el.classList.add('motion-item');observer.observe(el)});
  register();
  const changes=new MutationObserver(()=>{for(const el of tracked){if(!root.contains(el)){observer.unobserve(el);tracked.delete(el)}}register()});
  changes.observe(root,{childList:true,subtree:true});
  const interactive='.truck-card, .core-values article, .purpose-card, .ann-feature, .form-card, .page-scene';
  let active=null,frame=0;
  const reset=()=>{cancelAnimationFrame(frame);if(active){active.style.removeProperty('--pointer-x');active.style.removeProperty('--pointer-y');active.style.removeProperty('--rotate-x');active.style.removeProperty('--rotate-y');active=null}};
  const move=e=>{if(e.pointerType!=='mouse'||!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;const card=e.target.closest(interactive);if(!card||!root.contains(card)){reset();return}if(active!==card)reset();active=card;const rect=card.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width,y=(e.clientY-rect.top)/rect.height;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{card.style.setProperty('--pointer-x',`${x*100}%`);card.style.setProperty('--pointer-y',`${y*100}%`);card.style.setProperty('--rotate-x',`${(0.5-y)*3}deg`);card.style.setProperty('--rotate-y',`${(x-0.5)*3}deg`)})};
  root.addEventListener('pointermove',move,{passive:true});root.addEventListener('pointerleave',reset);
  return()=>{reset();observer.disconnect();changes.disconnect();root.removeEventListener('pointermove',move);root.removeEventListener('pointerleave',reset);for(const el of tracked){el.classList.remove('motion-item','motion-arrived');el.style.removeProperty('--arrival-delay')}};
 },[page,enabled]);
}
