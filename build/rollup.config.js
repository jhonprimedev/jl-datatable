import vue from 'rollup-plugin-vue'
// import buble from 'rollup-plugin-buble'

import styles from "rollup-plugin-styles";

// import externalGlobals from "rollup-plugin-external-globals";
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
        assetFileNames: "[name]-[hash][extname]",
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
        // buble({transforms: { forOf: false, asyncAwait: false }}),
        // buble(),
        styles(),
        // externalGlobals({})
    ],
}