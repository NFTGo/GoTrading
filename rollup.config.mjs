import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';
import alias from '@rollup/plugin-alias';
import fs from 'fs';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const absolute = _path => path.resolve(__dirname, _path);
const entries = {
  '@/types': absolute('src/types/index.ts'),
  '@/abi': absolute('src/abi/index.ts'),
  '@/exceptions': absolute('src/exceptions/index.ts'),
  '@/http': absolute('src/http/index.ts'),
  '@/common': absolute('src/common/index.ts'),
};

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
      alias({ entries }),
      external(),
      commonjs(),
      nodeResolve({}),
      typescript({ tsconfig: 'tsconfig.build.json', useTsconfigDeclarationDir: true, exclude: ['__test__'] }),
    ],
    context: 'globalThis',
  },
  {
    input: 'dist/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [alias({ entries }), dts(), clearTargetPlugin()],
  },
]);

function clearTargetPlugin() {
  return {
    buildEnd() {
      fs.rmSync('dist/src', { recursive: true });
    },
  };
}
