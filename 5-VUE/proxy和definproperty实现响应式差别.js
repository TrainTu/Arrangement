//深度监听的差别

function observer(target) {
    if (typeof target !== 'object' || target == null) {
        return target;
    }
     
    for (let key in target) {
        let value = target[key];
         
        Object.defineProperty(target, key, {
            get() {
                console.log('[Trigger Get]', key);
                return observer(value);
            },
            set(newV) {
                console.log('[Trigger Set]', key, newV);
                value = newV;
            }
        });
    }
    return target;
}
 
var obj = {
    a: {
        b: 1
    }
};
 
observer(obj);
// console.log(obj.a)
console.log(obj.a.b)
// obj.a = 2;