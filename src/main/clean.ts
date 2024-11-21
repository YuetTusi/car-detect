export const disable4G2G = (): void => {
  Promise.all([
    fetch('http://127.0.0.1:8989/api/v1/disable2GRF', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      mode: 'cors',
    }),
    fetch('http://127.0.0.1:8989/api/v1/disable4GRF', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf8' },
      mode: 'cors',
    }),
  ]);
};
