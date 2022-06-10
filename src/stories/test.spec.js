//test.js
import {bar, foo} from './test';

// was working for mocking foo, but not bar
jest.mock('./test', ()=>{
    const originalModule = jest.requireActual('./test')
    return {
        ...originalModule,
        // bar: "mocked bar",
        bar: ()=>"mocked bar",
        foo:"mocked foo"
    }
})

// jest.mock('./test', () => {
//     const originalModule = jest.requireActual('./test');
//
//     //Mock the default export and named export 'foo'
//     return {
//         __esModule: true,
//         ...originalModule,
//         default: jest.fn(() => 'mocked baz'),
//         foo: 'mocked foo',
//     };
// });

// describe('test', ()=>{
//     it('stuff', ()=>{
//         expect(true).toBe(true)
//         // const defaultExportResult = defaultExport();
//         // expect(defaultExportResult).toBe('mocked baz');
//         // expect(defaultExport).toHaveBeenCalled();
//         //
//         // expect(foo).toBe('mocked foo');
//         // expect(bar()).toBe('bar');
//     })
// })
//
describe('testing', () => {
    it('mocks foo', () => {
        const arg = foo
        expect(arg).toBe("mocked foo")
    })
    it('mocks bar', () => {
        const arg = bar()
        expect(arg).toBe("mocked bar")
    })
    it('does something else', () => {
        // function forEach(items, callback) {
        //     for (let index = 0; index < items.length; index++) {
        //         callback(items[index]);
        //     }
        // }
        function uSuck() {
            return {
                you: "suck"
            }
        }
        const expected = {you:"do not suck"}
        const mockUSuck = jest.fn(()=>{return expected})
        // forEach([0, 1], mockCallback);
        expect(mockUSuck.mockReturnValueOnce())
// The mock function is called twice
//         expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
//         expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
//         expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
//         expect(mockCallback.mock.results[0].value).toBe(42);
    })
})
// test('should do a partial mock', () => {
//     const arg = foo
//     expect(arg).toBe("mocked foo")

    // expect(bar()).toBe("mocked bar")
    // const defaultExportResult = defaultExport();
    // expect(defaultExportResult).toBe('mocked baz');
    // expect(defaultExport).toHaveBeenCalled();
    //
    // expect(foo).toBe('mocked foo');
    // expect(bar()).toBe('bar');
// });