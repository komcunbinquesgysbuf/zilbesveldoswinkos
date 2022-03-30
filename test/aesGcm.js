import {runTests} from "../runTests.mjs";
import {aesGcmCreateKey, aesGcmDecrypt, aesGcmEncrypt} from "../public/aesGcm.mjs";

runTests([
    (await aesGcmCreateKey()).length === 22,
    await (async key => await aesGcmDecrypt(await aesGcmEncrypt('Hello World!', key), key))(await aesGcmCreateKey()) === 'Hello World!',
    await (async key => await aesGcmEncrypt('Hello World!', key) !== await aesGcmEncrypt('Hello World!', key))(await aesGcmCreateKey())
]);
