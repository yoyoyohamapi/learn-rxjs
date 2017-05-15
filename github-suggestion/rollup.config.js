import commonjs from 'rollup-plugin-commonjs';
import resolver from 'rollup-plugin-node-resolve';

export default {
    entry: 'index.js',
    dest: 'bundle.js',
    format: 'umd',
    moduleName: 'github-suggestion',
    external: ['ramda', 'rxjs', 'whatwg-fetch'],
    plugins: [
        resolver(),
        commonjs({
            include: './node_modules/**'
        })
    ]
};
