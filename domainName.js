// function domainName(url) {
//     console.log(url);
//     url = url.replace('www.', '');
//     const urlRegex = /[a-z-]+\./g;
//     let urlArray = url.match(urlRegex);
//     console.log(urlArray);
//     url = urlArray[0];
//     url = url.replace(/\./g, '');

//     return url;
// }

// Submitted solution
const domainName = (url) => url.replace('www.', '').match(/[a-z-|0-9]+\./g)[0].replace(/\./g, '');

console.log(domainName('http://google.co.jp'));
