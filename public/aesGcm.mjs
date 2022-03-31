// https://github.com/mdn/dom-examples/blob/master/web-crypto/encrypt-decrypt/aes-gcm.js
// https://stackoverflow.com/questions/793812/javascript-aes-encryption

const [algo, usages] = [{name: 'AES-GCM'}, ['encrypt', 'decrypt']];
const {atob, btoa, crypto} = window;
const b64ToUrl = d => d.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
const bufferToUrl = buffer => b64ToUrl(btoa(String.fromCharCode(...new Uint8Array(buffer))));
const importRawKey = async key => await crypto.subtle.importKey('raw', key, algo, true, usages);
const urlToB64 = u => u.replaceAll('_', '/').replaceAll('-', '+')
const urlToBuffer = url => Uint8Array.from(atob(urlToB64(url)).split('').map(c => c.charCodeAt(0))).buffer;

export const aesGcmCreateKey = async () => bufferToUrl(
    await crypto.subtle.exportKey('raw', await crypto.subtle.generateKey({...algo, length: 128}, true, usages))
);

export const aesGcmDecrypt = async (cipher, key) => (
    async (iv, cb, kb) => new TextDecoder().decode(
        await crypto.subtle.decrypt({...algo, iv}, await importRawKey(kb), cb)
    )
)(...[cipher.substr(0, 16), cipher.substr(16), key].map(urlToBuffer));

export const aesGcmEncrypt = async (message, key) => (
    async (iv, mb, kb) => [
        iv,
        await crypto.subtle.encrypt({...algo, iv}, await importRawKey(kb), mb)
    ].map(bufferToUrl).join('')
)(crypto.getRandomValues(new Uint8Array(12)), new TextEncoder().encode(message), urlToBuffer(key));

export const base64Sha1 = async (data) => [...new Uint8Array(await crypto.subtle.digest("SHA-1", urlToBuffer(data)))]
    .map(c => c.toString(16).padStart(2, '0')).join('');
