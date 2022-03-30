import {runTests} from "../runTests.mjs";
import {base64UrlToHex, base64UrlXor, hexToBase64Url} from "../public/base64.mjs";

runTests([
    hexToBase64Url('00') === 'AA',
    hexToBase64Url('0000') === 'AAA',
    hexToBase64Url('000000') === 'AAAA',
    hexToBase64Url('ff') === '_w',
    hexToBase64Url('ffff') === '__8',
    hexToBase64Url('ffffff') === '____',
    hexToBase64Url('deadbeef') === '3q2-7w',
    hexToBase64Url('deadbeefc0') === '3q2-78A',
    hexToBase64Url('deadbeefc0ff') === '3q2-78D_',
    hexToBase64Url('deadbeefc0ffee') === '3q2-78D_7g',
    base64UrlToHex('A') === '',
    base64UrlToHex('AA') === '00',
    base64UrlToHex('AAA') === '0000',
    base64UrlToHex('AAAA') === '000000',
    base64UrlToHex('_===') === '',
    base64UrlToHex('__==') === 'ff',
    base64UrlToHex('___=') === 'ffff',
    base64UrlToHex('____') === 'ffffff',
    base64UrlToHex('3q2-78==') === 'deadbeef',
    base64UrlToHex('3q2-78D=') === 'deadbeefc0',
    base64UrlToHex('3q2-78D_') === 'deadbeefc0ff',
    base64UrlToHex('3q2-78D_7') === 'deadbeefc0ff',
    base64UrlToHex('3q2-78D_7g') === 'deadbeefc0ffee',
    (orig => orig.map(base64UrlToHex).map(hexToBase64Url).join() === orig.join())([
        'PFFZUGRjfS56JG1BYkhQS0s4RG98Z3ZQUVIocXx6VGZMXk5xSXUsJjspOXc1ODN3MiFMSl5QbD1nIi5jOTw3OkB9N2onfG07LzBoPg',
        'RlFjZ2s2cylhM15EVSNlKU1tclMvWWhzPVchXGhQLFxaLk1uMCx7Z011KDRKLj0kQGJ9PCJeUkFKQjhIcndifnRQUFlVdiNWe3RENm4',
        'IzBELy9mRUoqcm9TQE1UTn1DLXF2VXtHbiM_NCR0QDhsTkY4bmU9cmROKCJbO1V3fXpKP2hTcVpNWCdINmNJMUk7P1EsTXt8eG4mIXAx',
        'XnxJIy9zXHxqR3wwciozZnhMJD19OWxmfCc2TjFNTllNTmd3YGA8OVhaPnhZcUVzKD5dbiZcUD81LCRWVlYzaHA_K1JqdVVkYEFwLFdfcw',
        'eFx5PkFXWiw4RzhsMjt1eXtAey9rdyV6bV98ekAweU9ddUMjZDFbd2xqbFRTQC5ZaC5kbid5Wms-YEQjTUtSSW90Xi4wQiVjOi0lcDR2Yi4',
        'QUg8XTI-PHtpSlZORnx6M1s5eTdZNW9WJlVCfCNkQmg0YV0kO2JkWSgwTjpwO1ptLCk3PE1rdzE0T1tqek9iSyxYTUwiey02PjUyKmAnSDxv'
    ]),
    (
        (a, b) => ((a, b, c) => base64UrlXor(a, b) === c && base64UrlXor(b, c) === a && base64UrlXor(c, a) === b)(
            ...[a, b, a.map((v, i) => (parseInt(v, 16) ^ parseInt(b[i], 16)).toString(16).padStart(4, '0'))]
                .map(h => hexToBase64Url(h.join('')))
        )
    )(
        '3c51 5950 6463 7d2e 7a24 6d41 6248 504b 4b38 446f 7c67 7650 5152 2871 7c7a 5466'.split(' '),
        '4c5e 4e71 4975 2c26 3b29 3977 3538 3377 3221 4c4a 5e50 6c3d 6722 2e63 393c 373a'.split(' ')
    )
]);
