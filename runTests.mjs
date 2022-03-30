import {webcrypto as crypto} from "crypto";
global.window = ({
    atob: i => Buffer.from(i, 'base64').toString('binary'),
    btoa: i => Buffer.from(i, 'binary').toString('base64'),
    crypto
});
export const runTests = assertions => process.exit(
    assertions.map((t, i) => t || console.error(process.argv[1], '// index', i)).filter(b => !b).length && 1
);
