

var code = "JAVIER;EUDORO;REY;CASTRO;1072718026;O+;M";

var h = code.split('/');

var j = h.slice(0,1);

var k = j.toString();

var obj = Object.assign({}, h);

console.log(h);

console.log(j);

console.log(k);

console.log(obj);

