function rgb(r, g, b) {
    if (r < 0) r = 0;
    if (g < 0) g = 0;
    if (b < 0) b = 0;
    if (r > 255) r = 255;
    if (g > 255) g = 255;
    if (b > 255) b = 255;
    if (r == 0 && g == 0 && b == 0) return '000000';
    r = r.toString(16).length === 1 ? r.toString(16).padStart(2, '0') : r.toString(16);
    g = g.toString(16).length === 1 ? g.toString(16).padStart(2, '0') : g.toString(16);
    b = b.toString(16).length === 1 ? b.toString(16).padStart(2, '0') : b.toString(16);
    return `${(r + g + b).toUpperCase()}`;
}

console.log(rgb(292, 81, 4));