import test from 'node:test';
import assert from 'node:assert/strict';
import handler, {validateInquiry, mailjetMessage} from '../api/inquiry.js';
const client = {inquiry:'Client', fullName:'Test Client', email:'client@example.com', phone:'09123456789', units:{'10-Wheeler Wing Van':2,'L300 Van':1}, message:'Cargo details'};
const env = {MAILJET_FROM_EMAIL:'sender@example.com', INQUIRY_TO_EMAIL:'inbox@example.com'};

test('client mail has fixed destination and visitor reply address', () => {
  const data = validateInquiry({...client, to:'attacker@example.com'});
  const message = mailjetMessage(data, env).Messages[0];
  assert.equal(message.To[0].Email, 'inbox@example.com');
  assert.equal(message.ReplyTo.Email, 'client@example.com');
  assert.match(message.TextPart, /Cargo details/);
  assert.match(message.TextPart, /10-Wheeler Wing Van: 2/);
  assert.match(message.TextPart, /L300 Van: 1/);
  assert.match(message.TextPart, /Total units: 3/);
});
test('partner mail recomputes units and includes custom truck type', () => {
  const data = validateInquiry({...client, inquiry:'Partner', garageCity:'Taguig', units:{'10-Wheeler Wing Van':3, Others:2}, otherTruck:'Refrigerated van', numberOfUnits:999});
  const message = mailjetMessage(data, env).Messages[0];
  assert.match(message.TextPart, /Total units: 5/);
  assert.match(message.TextPart, /Refrigerated van: 2/);
});
test('server rejects missing, malformed and oversized fields', () => {
  for(const body of [{...client,email:'invalid'}, {...client, fullName:'bad\nname'}, {...client,message:'a'.repeat(3001)}, {...client,units:{Others:1}}, {...client,inquiry:'Partner',garageCity:'Taguig',units:{}}, {...client,inquiry:'Partner',garageCity:'Taguig',units:{Others:1.5}}, {...client,inquiry:'Partner',garageCity:'Taguig',units:{'Unknown':1}}]) assert.throws(()=>validateInquiry(body));
});
const response = () => ({code:0, data:null, setHeader(){}, status(code){this.code=code;return this;}, json(data){this.data=data;return this;}});
test('endpoint rejects other origins and methods', async()=> {
  let res=response(); await handler({method:'GET',headers:{}},res); assert.equal(res.code,405);
  res=response(); await handler({method:'POST',headers:{origin:'https://other.example'}},res); assert.equal(res.code,403);
});
test('endpoint handles provider acceptance and failure without leaking details', async()=> {
  const oldFetch=global.fetch;
  const keys=['MAILJET_API_KEY','MAILJET_SECRET_KEY','MAILJET_FROM_EMAIL','INQUIRY_TO_EMAIL'];
  const old=Object.fromEntries(keys.map(key=>[key,process.env[key]]));
  Object.assign(process.env,{...env,MAILJET_API_KEY:'test',MAILJET_SECRET_KEY:'test'});
  const req={method:'POST',headers:{origin:'https://alzhen-website.vercel.app','content-type':'application/json','x-forwarded-for':'test'},body:{...client,website:'https://autofilled.example'}};
  try {
    global.fetch=async url=>({ok:true,json:async()=>url.includes('/sender?')?{Data:[{Email:env.MAILJET_FROM_EMAIL,Status:'Active'}]}:{Messages:[{Status:'success'}]}});
    let res=response(); await handler(req,res); assert.equal(res.code,200); assert.equal(res.data.ok,true);
    global.fetch=async()=>({ok:false,json:async()=>({ErrorMessage:'private provider detail'})});
    res=response(); await handler(req,res); assert.equal(res.code,502); assert.doesNotMatch(res.data.error,/private provider detail/);
    delete process.env.MAILJET_SECRET_KEY;
    res=response(); await handler(req,res); assert.equal(res.code,503);
  } finally {
    global.fetch=oldFetch;
    for(const key of keys) if(old[key]===undefined) delete process.env[key]; else process.env[key]=old[key];
  }
});

test('HTML email escapes visitor content and includes partner fleet details', () => {
  const message=mailjetMessage(validateInquiry({...client,company:'<script>alert(1)</script>'}),env).Messages[0];
  assert.match(message.HTMLPart,/&lt;script&gt;/);
  assert.doesNotMatch(message.HTMLPart,/<script>/);
  assert.match(message.HTMLPart,/New client inquiry/);
});

test('client quantities reject empty, zero, negative and fractional requests', () => {
  for (const units of [{}, {'L300 Van':0}, {'L300 Van':-1}, {'L300 Van':1.5}, {'L300 Van':true}]) {
    assert.throws(() => validateInquiry({...client, units}));
  }
});
