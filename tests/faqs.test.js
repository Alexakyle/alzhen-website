import test from 'node:test';
import assert from 'node:assert/strict';
import { faqEntries, findFaq } from '../src/data/faqs.js';
import { normalizeTrucks } from '../src/services/contentRecords.js';
test('every displayed FAQ returns its own answer',()=>{for(const faq of faqEntries)assert.equal(findFaq(faq.question)?.id,faq.id)});
test('specific intents beat generic rates and truck terms',()=>{
 for(const [q,id] of [['VAT inclusive rate','vat'],['extra drops cost','extra-drops'],['truck waiting 12 hours','waiting'],['when will POD be submitted','pod-time'],['truck capacity in CBM','capacity'],['payment terms','payment'],['pickup location','pickup'],['delivery ETA','transit']])assert.equal(findFaq(q)?.id,id);
 assert.equal(findFaq('tell me a joke'),undefined);
});
test('admin type options and custom names share one template',()=>{
 const result=normalizeTrucks([{id:'a',truckType:'6W',volume:'8–15 CBM'},{id:'b',truckType:'L300'},{id:'c',truckType:'OTHER',otherTruckType:'4-Wheeler Closed Van'}]);
 assert.equal(result[0].name,'6-Wheeler Closed Van');assert.equal(result[0].volume,'8–15 CBM');assert.equal(result[1].name,'L300 Van');assert.equal(result[2].name,'4-Wheeler Closed Van');
 assert.throws(()=>normalizeTrucks([{id:'d',truckType:'OTHER',otherTruckType:' '} ]));
});
