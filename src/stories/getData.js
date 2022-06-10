import { api, returnSomething } from './someModule';

export const getData = () => {
    const data = api('/some-endpoint');
    return {
        data: data,
        somethingElse: returnSomething(),
    };
};