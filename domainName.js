// www. is removed so that the domain name is the first value in the match array
const domainName = (url) => url.replace('www.', '').match(/[a-z-|0-9]+\./g)[0].replace(/\./g, '');

console.log(domainName('http://google.co.jp'));
