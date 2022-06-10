import { getData } from './getData';

jest.mock('./someModule', () => ({
    returnSomething: jest.requireActual('./someModule').returnSomething,
    api: ()=>'foo'
}));

describe('getData', () => {
    it('returns an object', async () => {
        const result = await getData();
        expect(result).toEqual({
            data: 'foo',
            somethingElse: 'something',
        });
    });
});
