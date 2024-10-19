
let work = document.getElementById('edit').innerHTML;
// take out all span tags, maintaining the text inside

//let regex = /<span.*?>(.*?)<\/span>/g;
//let result = work.replace(regex, '$1');
let result = work;

let regex1 = /<span.*?>/g;
result = result.replace(regex1, '');
let regex2 = /<\/span>/g;
result = result.replace(regex2, '');


// delete completely svg tags
let regex3 = /<svg.*?<\/svg>/g;
result = result.replace(regex3, '');
console.log(result);

// delete data-* attributes
let regex4 = /data-.*?=".*?"/g;
result = result.replace(regex4, '');
console.log(result);


// delete anchor tags but maintain the text inside
let regex5 = /<a.*?>(.*?)<\/a>/g;
result = result.replace(regex5, '$1');
console.log(result);

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////

// highlight matches with new <span> tags
// <span class= "sn" >...</span>
let sn = [
    'item_1', 
    'item_3'
];
let regexSn = new RegExp(sn.join('|'), 'g');
result = result.replace(regexSn, '<span class="sn">$&</span>');

// <span class= "dx" >...</span>
let dx = [
    'item_1', 
    'item_3'
];
let regexDx = new RegExp(dx.join('|'), 'g');
result = result.replace(regexDx, '<span class="dx">$&</span>');

// <span class= "tto" >...</span>
let tto = [
    'item_1', 
    'item_3'
];

// find all instances of search terms
let regexTto = new RegExp(tto.join('|'), 'g');
result = result.replace(regexTto, '<span class="tto">$&</span>');



// add <table> </table> tags
result = '<table>' + result + '</table>';
console.log(result);
// copy to clipboard


