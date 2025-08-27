import js from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { 
    files: ['**/*.{js,mjs,cjs}'], 
    plugins: { js }, 
    extends: ['js/recommended'] 
  },
  { 
    files: ['**/*.{js,mjs,cjs}'], 
    languageOptions: { 
      globals: globals.browser 
    },
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      semi: 'error',
			'prefer-const': 'error',
    }
  },
  eslintConfigPrettier
]);
