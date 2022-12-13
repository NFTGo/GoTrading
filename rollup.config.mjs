import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import fs from 'fs';

export default defineConfig([
  {
    input: {
      index: 'src/index.ts',
    },
    output: [
      {
        entryFileNames: 'index.esm.js',
        format: 'esm',
        dir: 'dist',
      },
      {
        entryFileNames: 'index.js',
        format: 'cjs',
        dir: 'dist',
      },
    ],
    plugins: [
      json(),
      external(),
      commonjs(),
      nodeResolve({}),
      typescript({ tsconfig: 'tsconfig.json', useTsconfigDeclarationDir: true, exclude: ['__test__'] }),
    ],
    context: 'globalThis',
  },
  {
    input: 'dist/declaration/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts(), clearTargetPlugin()],
  },
]);

function clearTargetPlugin() {
  return {
    buildEnd() {
      fs.rmSync('dist/declaration', { recursive: true });
    },
  };
}
