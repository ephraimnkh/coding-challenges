function validBraces(braces) {
    let regex = /\{\}|\[\]|\(\)/g;

    while (braces.search(regex) >= 0) braces = braces.replace(regex, '');

    return braces.length > 0 ? false : true;
}

console.log(validBraces('[(})][()]'));
