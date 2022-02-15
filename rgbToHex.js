function rgb(r, g, b) {
    if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) return `Each provided value must be between 0 and 255`;
    return r == 0 && g == 0 && b == 0 ? '000000' : `${(r.toString(16) + g.toString(16) + b.toString(16)).toUpperCase()}`;
}

console.log(rgb(74, 207, 10));