import {runTests} from "../runTests.mjs";
import {aesGcmCreateKey, aesGcmDecrypt, aesGcmEncrypt, base64Sha1} from "../public/aesGcm.mjs";

const allAscii = 'AAECAwQFBgcICQoLDAoODxAREhMUFRYXGBkaGxwdHh8gISIjJCUmJygpKissLS4vMDEyMzQ1Njc4OTo7PD0+P0BBQkNERUZHSElKS'
    + '0xNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AgYKDhIWGh4iJiouMjY6PkJGSk5SVlpeYmZqbnJ2en'
    + '6ChoqOkpaanqKmqq6ytrq+wsbKztLW2t7i5uru8vb6/wMHCw8TFxsfIycrLzM3Oz9DR0tPU1dbX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8'
    + '/T19vf4+fr7/P3+/w=='; // bytes 0x00 through 0xff

runTests([
    (await aesGcmCreateKey()).length === 22,
    await (async key => await aesGcmDecrypt(await aesGcmEncrypt('Hello World!', key), key))(await aesGcmCreateKey()) === 'Hello World!',
    await (async key => await aesGcmEncrypt('Hello World!', key) !== await aesGcmEncrypt('Hello World!', key))(await aesGcmCreateKey()),
    await base64Sha1(allAscii) === '910eb6ba17903db7edfcb957359ba4f7454b7749',
]);
