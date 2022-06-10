export const api = (endpoint) => {
    return fetch(endpoint).then((res) => res.json());
};

export const returnSomething = () => {
    return 'something';
};