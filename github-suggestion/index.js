import R from 'ramda';
import Rx from 'rxjs';
import fetch from 'whatwg-fetch';

// DOMs
const $refresh = document.querySelectorAll('.refresh');
const $closes = document.querySelectorAll('.close');
const $suggestions = document.querySelectorAll('.suggestion');

// 点击刷新流
const refreshClick$ = Rx.Observable.fromEvent($refresh, 'click');

// 请求刷新流，来自于点击刷新流产生
const requestOnRefresh$ = refreshClick$
    .startWith('startup click')
    .map(() => R.concat('https://api.github.com/users?since=', Math.floor(Math.random() * 500)));

// 响应流，来自于请求
const response$ = requestOnRefresh$
    .flatMap(url => Rx.Observable.fromPromise(fetch(url).then(resp => resp.json())));

const getRandomUser = users => {
    console.log('users', users);
    return users[Math.floor(Math.random() * users.length)];
}

const renderSuggestion = R.curry((index, user) => {
    const $suggestion = R.nth(index, $suggestions);
    $suggestion.style.visibility = 'visible';
    const $username = $suggestion.querySelector('.username');
    const $avatar = $suggestion.querySelector('img');
    $username.href = user.html_url;
    $username.textContent = user.login;
    $avatar.src = user.avatar_url;
});

const renderEmpty = R.curry((index, user) => {
    const $suggestion = R.nth(index, $suggestions);
    $suggestion.style.visibility = 'hidden';
});

const render = (user, index) => R.ifElse(R.isNil, renderEmpty(index), renderSuggestion(index))(user);

const createSuggestionStream = ($closes) => {
    const closes$ = R.map($close => Rx.Observable.fromEvent($close, 'click'), $closes);
    // 关闭流和响应流 emit 值时，都会引起推荐
    const suggestions$ = R.map(close$ =>
        close$.startWith('startup click')
        .combineLatest(response$, (click, users) => getRandomUser(users))
        .merge(refreshClick$.map(R.always(null)))
        .startWith(null), closes$);
    return suggestions$;
};

// 创建推荐流
const suggestions$ = createSuggestionStream($closes);
// 订阅推荐
suggestions$.forEach((suggestion$, index) => suggestion$.subscribe(user => render(user, index)));
