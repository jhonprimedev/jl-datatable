import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'

import styles from "rollup-plugin-styles";
export default {
    input: 'src/index.js',
    output: {
        name: 'JlDatatable',
        exports: 'named',
        assetFileNames: "[name]-[hash][extname]",
    },
    plugins: [
        vue({
            css: true,
            compileTemplate: true,
            template: {
                isProduction: true,
            },
        }),
        buble({transforms: { forOf: false, asyncAwait: false }}),
        styles()
    ],
}