import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTrucks, normalizeAnnouncements } from '../src/services/contentRecords.js';

test('multiple trucks retain independent cargo and limit valid images to three', () => {
 const trucks = normalizeTrucks([
  {id:'a',name:'Truck A',images:[{url:'javascript:alert(1)'},...Array.from({length:4},(_,i)=>({url:`/photo-${i}.jpg`}))],commonCargos:[{id:'one',name:'Machinery'}]},
  {id:'b',name:'Truck B',imageUrl:'/legacy.jpg',commonCargos:[]},
 ]);
 assert.equal(trucks.length,2);
 assert.equal(trucks[0].images.length,3);
 assert.equal(trucks[1].images[0].url,'/legacy.jpg');
 assert.equal(trucks[0].commonCargos[0].name,'Machinery');
 assert.deepEqual(trucks[1].commonCargos,[]);
});
test('announcements sort newest first and invalid dates do not reach date rendering', () => {
 const result=normalizeAnnouncements([{id:'bad',title:'Invalid',date:'2026-02-30'}, {id:'old',title:'Old',date:'2026-01-01'}, {id:'new',title:'New',date:'2026-09-25',content:'First\n\nSecond',imageUrl:'javascript:alert(1)'}]);
 assert.deepEqual(result.map(x=>x.id),['new','old','bad']);
 assert.equal(result[2].date,null);
 assert.equal(result[0].content,'First\n\nSecond');
 assert.equal(result[0].imageUrl,'');
});
test('empty collections stay empty and malformed responses fail clearly',()=>{
 assert.deepEqual(normalizeTrucks([]),[]);
 assert.deepEqual(normalizeAnnouncements([]),[]);
 assert.throws(()=>normalizeTrucks({items:[]}));
 assert.throws(()=>normalizeAnnouncements([{id:'same',title:'A'},{id:'same',title:'B'}]));
});
