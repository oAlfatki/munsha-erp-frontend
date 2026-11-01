import js from '@eslint/js';
import tseslint from 'typescript-eslint';
export default tseslint.config(
 {ignores:['dist/**','node_modules/**']},
 js.configs.recommended,
 ...tseslint.configs.recommended,
 {files:['src/**/*.{ts,tsx}'],rules:{
  'no-empty':['error',{allowEmptyCatch:true}],
  '@typescript-eslint/no-empty-object-type':['error',{allowInterfaces:'with-single-extends'}],
  '@typescript-eslint/consistent-type-imports':['error',{prefer:'type-imports',fixStyle:'separate-type-imports'}],
  '@typescript-eslint/no-unused-vars':['error',{argsIgnorePattern:'^_',varsIgnorePattern:'^_',caughtErrorsIgnorePattern:'^_'}],
  '@typescript-eslint/no-unused-expressions':['error',{allowShortCircuit:true,allowTernary:true}],
 }}
);
