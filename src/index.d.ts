declare module 'change-case-keys' {
  function changeCaseKeys(
    obj: Record<string, unknown>,
    operation: 'underscored' | 'camelize' | 'dasherize'
  ): Record<string, unknown>;
  export = changeCaseKeys;
}
