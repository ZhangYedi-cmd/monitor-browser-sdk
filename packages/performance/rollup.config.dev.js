import { iifePackage } from '../../rollup.config.base';

// 本地调试开启sourcemap
iifePackage.output = {
    ...iifePackage.output,
    sourcemap: true
};

export default [iifePackage];