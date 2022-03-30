export const hexToBase64Url = hex => new Array(Math.ceil(hex.length / 6)).fill(0).map(
    (_, i) => (v => [0xfc0000, 0x3f000, 0xfc0, 0x3f].map((m, j) =>
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.charAt((v & m) >> (18 - 6 * j))
    ).join('').substr(0, hex.substr(6 * i, 6).length / 2 + 1))(parseInt(hex.substr(6 * i, 6).padEnd(6, '0'), 16))
).join('');

export const base64UrlToHex = url => (r => r.substr(0, 2 * (r.length >> 1)))(((u, m) => u.map(
    (b, i, a) => i % 2 ? '' : (m.indexOf(b) << 6 | m.indexOf(a[i + 1] || 'A')).toString(16).padStart(3, '0')
).join('').substr(0, (3 * u.length) >> 1))(
    url.replace(/=+/, '').split(''),
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
));

export const base64UrlXor = (u1, u2) => {
    if (u1.length !== u2.length) throw new Error('URLs have different lengths');
    return (m => u1.split('').map((c, i) => m.charAt(m.indexOf(c) ^ m.indexOf(u2.charAt(i)))).join(''))(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    );
};
