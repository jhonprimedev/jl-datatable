import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'


export default {
    input: 'src/index.js',
    output: {
        name: 'Datatable',
        exports: 'named',
    },
    plugins: [
        vue({
            css: true,
            compileTemplate: true,
            template: {
                isProduction: true,
            },
        }),
        buble({transforms: { forOf: false, asyncAwait: false }})
    ],
}