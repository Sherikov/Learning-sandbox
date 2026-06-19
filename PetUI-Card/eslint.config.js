import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
        rules: {
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'no-undef': 'warn',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },
    {
        ...pluginReact.configs.flat.recommended,
        files: ['src/**/*.{js,jsx}'],
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...pluginReact.configs.flat.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
    },
    {
        files: ['src/**/*.{js,jsx}'],
        plugins: {
            'react-hooks': reactHooks,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
        },
    },
    eslintConfigPrettier,
]);
