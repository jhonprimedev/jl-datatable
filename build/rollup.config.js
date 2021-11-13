import vue from 'rollup-plugin-vue'
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
    input: 'src/index.js',
    external: [
        'lodash/debounce',
        'vue',
        'bootstrap/dist/css/bootstrap.min.css'
    ],
    output: {
        name: 'JlDatatable',
        exports: 'named',        
        globals : {
            'lodash/debounce': 'debounce',
            'vue': 'vue'
        },
    },
    plugins: [
        vue({
            css: true,
            compileTemplate: true,
            template: {
                isProduction: true,
            },
        }),
        terser(),
        postcss(),
    ],
}