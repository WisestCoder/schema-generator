import commonjs from 'rollup-plugin-commonjs';

export default {
  esm: 'rollup',
  cjs: 'rollup',
  extraRollupPlugins: [
    commonjs({
      include: 'node_modules/**',
    }),
  ],
};
