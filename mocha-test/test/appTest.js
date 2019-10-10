const assert = require('chai').assert;
const { sayHello, addNumber } = require('../app');

describe('App', () => {

    describe('sayHello()', () => {
        it('sayHello should return hello', () => {
            let result = sayHello();
            assert.equal(result, 'hello')
        });

        it('sayHello should return type string', () => {
            let result = sayHello();
            assert.typeOf(result, 'string')
        });
    });

    describe('addNumbers()', () => {
        it('addNumbers should be above 5', () => {
            let result = addNumber(5, 5);
            assert.isAbove(result, 5);
        });

        it('addNumbers should return type number', () => {
            let result = addNumber(5, 5);
            assert.typeOf(result, 'number');
        });
    });
})