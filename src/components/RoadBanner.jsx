import React from 'react';
import {ArrowDown} from 'lucide-react';
import MotionBackground from './MotionBackground';
import PageScene from './PageScene';
export default function RoadBanner({eyebrow,title,accent,description,sign='NATIONWIDE TRANSPORT',variant='mint',artwork,children}){
 return <section className={'road-banner '+variant}>
 <MotionBackground/>
 <div className="road-banner-copy"><span className="road-label">{eyebrow}</span><h1>{title}<br/><em>{accent}</em></h1><p>{description}</p>{children}</div>
 {artwork || <PageScene label={sign}/>}
 <div className="opening-footer"><span>ALZHEN TRUCKING SERVICES</span><span>Explore below <ArrowDown size={14}/></span></div>
 </section>;
}
