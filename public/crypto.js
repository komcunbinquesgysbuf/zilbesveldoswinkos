// https://github.com/mdn/dom-examples/blob/master/web-crypto/encrypt-decrypt/aes-gcm.js
// https://stackoverflow.com/questions/793812/javascript-aes-encryption
if (typeof window !== 'undefined' && 'lowdefy' in window && 'crypto' in window && 'subtle' in window.crypto) {
    const bufferToBase64Url = b => window.btoa(Array.from(new Uint8Array(b)).map(c => String.fromCharCode(c)).join(''))
        .replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
    const base64UrlToBuffer = u => Uint8Array
        .from(window.atob(u.replaceAll('_', '/').replaceAll('-', '+')).split('').map(c => c.charCodeAt(0)))
        .buffer;
    const importKey = k => window.crypto.subtle.importKey('raw', k, {name: 'AES-GCM'}, true, ['encrypt', 'decrypt']);
    window.lowdefy.registerJsAction('aesGcmCreateKey', async (ctx) => bufferToBase64Url(
        await window.crypto.subtle.exportKey(
            'raw',
            await window.crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt'])
        )
    ));
    window.lowdefy.registerJsAction('aesGcmEncrypt', async (ctx, m, k) => {
        console.log(m, k);
        return (async iv => [
                iv,
                await window.crypto.subtle.encrypt(
                    {name: 'AES-GCM', iv},
                    await importKey(base64UrlToBuffer(k)),
                    new TextEncoder().encode(m)
                )
            ].map(bufferToBase64Url).join('')
        )(window.crypto.getRandomValues(new Uint8Array(12)));
    });
    window.lowdefy.registerJsAction('aesGcmDecrypt', async (ctx, c, k) => (async (iv, cb, kb) => new TextDecoder()
            .decode(await window.crypto.subtle.decrypt({name: 'AES-GCM', iv}, await importKey(kb), cb))
    )(...[c.substr(0, 16), c.substr(16), k].map(base64UrlToBuffer)));
}
