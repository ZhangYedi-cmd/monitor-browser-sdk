import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import size from 'rollup-plugin-sizes';
import esbuild from 'rollup-plugin-esbuild';
import nodePolyfills from 'rollup-plugin-polyfill-node';

const packageDir = path.resolve(__dirname);
const packageDirDist = `${packageDir}/dist`;

const name = path.basename(packageDir);

export const common = {
    input: `${packageDir}/src/index.ts`,
    output: {
        name: `HEIMDALLR_${name.toLocaleUpperCase()}`,
        footer: '/* follow me on Github! @LuciferHuang */'
    },
    plugins: [
        esbuild({
            include: /\.[jt]sx?$/,
            exclude: /node_modules/,
            minify: process.env.NODE_ENV === 'production',
            target: 'es2015',
            jsx: 'transform',
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
            tsconfig: 'tsconfig.json',
            loaders: {
                '.json': 'json',
                '.js': 'jsx'
            }
        }),
        resolve({
            preferBuiltins: true
        }),
        commonjs(),
        nodePolyfills(),
        json(),
        size()
    ]
};

export const umdPackage = {
    ...common,
    output: {
        file: `${packageDirDist}/${name}.umd.js`,
        format: 'umd',
        ...common.output
    }
};

export const esmPackage = {
    ...common,
    output: {
        dir: `${packageDir}/esm/`,
        format: 'esm',
        plugins: [terser()],
        ...common.output
    }
};

export const iifePackage = {
    ...common,
    output: {
        file: `${packageDirDist}/${name}.iife.js`,
        format: 'iife',
        ...common.output
    },
    context: 'window',
    plugins: [
        ...common.plugins,
        // 压缩代码
        terser()
    ]
};