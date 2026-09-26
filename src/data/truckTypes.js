// Use these values in the admin select and persist the value as truckType.
export const truckTypes = [
 {value:'10W',label:'10-Wheeler Wing Van'},
 {value:'12W',label:'12-Wheeler Wing Van'},
 {value:'6W',label:'6-Wheeler Closed Van'},
 {value:'L300',label:'L300 Van'},
 {value:'OTHER',label:'Other'},
];
export function truckName(record) {
 if(record.truckType === 'OTHER') return typeof record.otherTruckType === 'string' ? record.otherTruckType.trim() : '';
 return truckTypes.find(type=>type.value===record.truckType)?.label || (typeof record.name==='string'?record.name.trim():'');
}
