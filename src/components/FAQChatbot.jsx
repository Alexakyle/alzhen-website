import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Truck, MapPin, Coins, ClipboardList, Clock, CirclePlus, ChevronRight, ArrowLeft, Minus, X, Send, Maximize2, Minimize2 } from 'lucide-react';
import { contact } from '../data/profile';
import { faqCategories, faqEntries, findFaq } from '../data/faqs';
import '../styles/faq-assistant.css';
const icons=[Truck,MapPin,Coins,ClipboardList,Clock,CirclePlus];
export default function FAQChatbot(){
 const [open,setOpen]=useState(false);
 const [maximized,setMaximized]=useState(false);
 const [category,setCategory]=useState(null);
 const [answer,setAnswer]=useState(null);
 const [question,setQuestion]=useState('');
 const panel=useRef(null),launcher=useRef(null),body=useRef(null),back=useRef(null);
 const dismiss=(reset=false)=>{setOpen(false);if(reset){setMaximized(false);setCategory(null);setAnswer(null);setQuestion('');}launcher.current?.focus();};
 useEffect(()=>{if(open)panel.current?.focus();},[open]);
 useEffect(()=>{if(body.current)body.current.scrollTop=0;},[category,answer]);
 const topics=()=>{setCategory(null);setAnswer(null);};
 const chooseCategory=value=>{setCategory(value);setAnswer(null);};
 const ask=value=>{const match=findFaq(value);if(match)setCategory(match.category);setAnswer(match||{question:value,answer:'Please choose one of our FAQ topics, or contact Alzhen through Facebook for help with this question.'});setQuestion('');};
 return <>
 <button ref={launcher} className="faq-launcher" aria-label={open?'Minimize Alzhen Assistant':'Open Alzhen Assistant'} aria-expanded={open} aria-controls="alzhen-faq-panel" onClick={()=>open?dismiss():setOpen(true)}><span className="faq-launcher-tip">Need assistance?<br/>Chat with us!</span><MessageCircle size={30}/><i aria-hidden="true"/></button>
 {open&&<section ref={panel} tabIndex={-1} id="alzhen-faq-panel" className={`faq-panel${maximized ? " faq-panel-maximized" : ""}`} role="dialog" aria-label="Alzhen Assistant" onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();if(maximized)setMaximized(false);else dismiss();}}}>
 <div className="faq-panel-head"><img src="/images/alzhen-logo.png" alt=""/><div><strong>Alzhen Assistant</strong><small>Frequently Asked Questions</small></div><button aria-label={maximized ? "Restore chat size" : "Maximize chat"} title={maximized ? "Restore chat size" : "Maximize chat"} aria-pressed={maximized} onClick={()=>setMaximized(value=>!value)}>{maximized ? <Minimize2 size={19}/> : <Maximize2 size={19}/>}</button><button aria-label="Minimize chat" onClick={()=>dismiss()}><Minus size={19}/></button><button aria-label="Close chat and reset" onClick={()=>dismiss(true)}><X size={20}/></button></div>
 <div className="faq-panel-body" ref={body}>
 {(category||answer)&&<button ref={back} className="faq-back" onClick={topics}><ArrowLeft size={16}/> Back to topics</button>}
 {!category&&!answer?<><div className="faq-response"><img src="/images/alzhen-logo.png" alt=""/><p>Welcome to Alzhen Trucking Services! 👋🏻<br/><br/>How can we help you today?<br/>Please select a topic below.</p></div><div className="faq-topic-list">{faqCategories.map((topic,i)=>{const Icon=icons[i];return <button key={topic} onClick={()=>chooseCategory(topic)}><Icon size={22}/><span>{topic}</span><ChevronRight size={17}/></button>})}</div></>:answer?<><p className="faq-user-bubble">{answer.question}</p><div className="faq-response" aria-live="polite"><img src="/images/alzhen-logo.png" alt=""/><p>{answer.answer}</p></div><p className="faq-followup">Would you like to ask another question?</p><div className="faq-answer-actions"><button onClick={()=>{setAnswer(null);}}><MessageCircle size={15}/> Ask another question</button><button onClick={topics}><ArrowLeft size={15}/> Back to topics</button></div></>:<><p className="faq-user-bubble">{category}</p><div className="faq-response"><img src="/images/alzhen-logo.png" alt=""/><p>Here are the common questions about {category.toLowerCase()}.</p></div><div className="faq-question-list">{faqEntries.filter(item=>item.category===category).map(item=><button key={item.id} onClick={()=>ask(item.question)}>{item.question}<ChevronRight size={17}/></button>)}</div></>}
 </div>
 <a className="faq-facebook" href={contact.facebook} target="_blank" rel="noreferrer">Inquire on Facebook ↗</a>
 <form className="faq-compose" onSubmit={e=>{e.preventDefault();if(question.trim())ask(question.trim());}}><input aria-label="Type your question" placeholder="Type a message…" maxLength={500} value={question} onChange={e=>setQuestion(e.target.value)}/><button type="submit" aria-label="Send question" disabled={!question.trim()}><Send size={19}/></button></form>
 </section>}
 </>;
}
