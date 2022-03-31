import {aesGcmCreateKey, aesGcmDecrypt, aesGcmEncrypt, base64Sha1} from "./aesGcm.mjs";
import {base64UrlXor} from "./base64.mjs";

if (typeof window !== 'undefined' && 'lowdefy' in window) {
    const {lowdefy: {registerJsAction}} = window;
    registerJsAction('aesGcmCreateKey', (ctx) => aesGcmCreateKey());
    registerJsAction('aesGcmDecrypt', (ctx, cipher, key) => aesGcmDecrypt(cipher, key));
    registerJsAction('aesGcmEncrypt', (ctx, message, key) => aesGcmEncrypt(message, key));
    registerJsAction('base64Sha1', (ctx, base64String) => base64Sha1(base64String));
    registerJsAction('base64UrlXor', (ctx, initiatorKey, participantKey) => base64UrlXor(initiatorKey, participantKey));
}
