export const login = form => new Promise((resolve, reject) =>
    setTimeout(() => {
        if (form.username === 'admin' && form.password === 'admin') {
            resolve({ status: 200 });
        } else {
            reject({ status: 400, message: '用户名或密码错误' });
        }
    }, 1500)
);

export const signup = form =>  new Promise((resolve, reject) =>
    setTimeout(() => resolve({ status: 200, id: 2 }), 1500)
);
