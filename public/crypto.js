// https://github.com/mdn/dom-examples/blob/master/web-crypto/encrypt-decrypt/aes-gcm.js
// https://stackoverflow.com/questions/793812/javascript-aes-encryption
if (typeof window !== 'undefined' && 'lowdefy' in window && 'crypto' in window && 'subtle' in window.crypto) {
    const [algo, usages] = [{name: 'AES-GCM'}, ['encrypt', 'decrypt']];
    const {atob, btoa, crypto, lowdefy: {registerJsAction}} = window;
    const b64ToUrl = d => d.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
    const bufferToUrl = buffer => b64ToUrl(btoa(String.fromCharCode(...new Uint8Array(buffer))));
    const importRawKey = async key => await crypto.subtle.importKey('raw', key, algo, true, usages);
    const urlToB64 = u => u.replaceAll('_', '/').replaceAll('-', '+')
    const urlToBuffer = url => Uint8Array.from(atob(urlToB64(url)).split('').map(c => c.charCodeAt(0))).buffer;

    registerJsAction(
        'aesGcmCreateKey',
        async ctx => bufferToUrl(
            await crypto.subtle.exportKey('raw', await crypto.subtle.generateKey({...algo, length: 128}, true, usages))
        )
    );

    registerJsAction(
        'aesGcmDecrypt',
        async (ctx, cipher, key) => (
            async (iv, cb, kb) => new TextDecoder().decode(
                await crypto.subtle.decrypt({...algo, iv}, await importRawKey(kb), cb)
            )
        )(...[cipher.substr(0, 16), cipher.substr(16), key].map(urlToBuffer))
    );

    registerJsAction(
        'aesGcmEncrypt',
        async (ctx, message, key) => (
            async (iv, mb, kb) => [
                iv,
                await crypto.subtle.encrypt({...algo, iv}, await importRawKey(kb), mb)
            ].map(bufferToUrl).join('')
        )(crypto.getRandomValues(new Uint8Array(12)), new TextEncoder().encode(message), urlToBuffer(key))
    );
}
