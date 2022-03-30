import {aesGcmCreateKey, aesGcmDecrypt, aesGcmEncrypt} from "./aesGcm.mjs";

if (typeof window !== 'undefined' && 'lowdefy' in window) {
    const {lowdefy: {registerJsAction}} = window;
    registerJsAction('aesGcmCreateKey', (ctx) => aesGcmCreateKey());
    registerJsAction('aesGcmDecrypt', (ctx, cipher, key) => aesGcmDecrypt(cipher, key));
    registerJsAction('aesGcmEncrypt', (ctx, message, key) => aesGcmEncrypt(message, key));
}
