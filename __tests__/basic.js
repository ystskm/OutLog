/**
 * [OutLog] test/basic.js
 * OutLog の ファンクションテスト
 */
const env = require('./env.json'); // env.json のパスは適宜修正してください
const settings = env.testCase.basic;
const out = require('../index.js')('test/basic.js');
// const out = require('../dist/OutLog.js')('test/basic.js');
// const out = require('../dist/OutLog.min.js')('test/basic.js');
describe('CRUD Operations', () => {

    // Connect (beforeAll)
    beforeAll(async () => {

    });

    // Finalize (afterAll)
    afterAll(async () => {

    });

    describe('Object Condition Test', ()=>{

        // 1. クラスの API (prototype) のチェック
        test('1. Basic API Test', async ()=>{
            funcs().forEach(k=>{ expect(typeof out[k]).toBe('function') });
            expect(out.getLev()).toBe(3);
            expect(out.Log('expect0', 'f').length).toBe(2);
            expect(out.Log('expect1', 'e').length).toBe(2);
            expect(out.Log('expect2', 'w').length).toBe(2);
            expect(out.Log('expect3', 'i').length).toBe(2);
            expect(out.Log('expect4', 'd').length).toBe(0);
            expect(out.Log('expect5', 'v').length).toBe(0);
            expect(out.setLev(4)).toBe(4);
            expect(out.getLev()).toBe(4);
            expect(out.setLev('trace')).toBe(5);
            expect(out.getLev()).toBe(5);
            expect(out.Log('expect0', 'f').length).toBe(2);
            expect(out.Log('expect1', 'e').length).toBe(2);
            expect(out.Log('expect2', 'w').length).toBe(2);
            expect(out.Log('expect3', 'i').length).toBe(2);
            expect(out.Log('expect4', 'd').length).toBe(2);
            expect(out.Log('expect5', 'v').length).toBe(2);
            expect(out.Log('expectX', 'x').length).toBe(2);
            expect(out.setLev(3)).toBe(3);
            expect(out.getLev()).toBe(3);
            expect(out.getTyp()).toBe('i');
            expect(out.setLev('Emergency')).toBe(0);
            expect(out.getLev()).toBe(0);
            expect(out.fatal('expect0').length).toBe(2);
            expect(out.error('expect1').length).toBe(0);
            expect(out.warn ('expect2').length).toBe(0);
            expect(out.info ('expect3').length).toBe(0);
            expect(out.debug('expect4').length).toBe(0);
            expect(out.trace('expect5').length).toBe(0);
            expect(out.Log('expectX', 'x').length).toBe(2);
            console.log('Supported DB functions verified: ' + funcs().join('|'));
        });

    });

    function funcs() {
        return [ 'Log', 'setLev', 'getLev', 'getTyp', 
            'fatal', 'error', 'warn', 'info', 'debug', 'trace', 
            'f', 'e', 'w', 'i', 'd', 'v' ];
    }

}); 