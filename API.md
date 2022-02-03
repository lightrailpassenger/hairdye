# APIs

## Types
### `Escaper`
```javascript
type Escaper = (input: string | number) => string;
```

### `EscapableResult`
```javascript
interface EscapableResult {
  escape(fn: Escaper): EscapableResult;
  toString(): string;
}
```

## Methods
### `createEscapeHelper`
#### Param 1
`escaper: Escaper`: A function that escapes the params.
#### Return value
An object which contains

`escapeFn`: The input

`escaped`: A function that marks the input to be safe and will never be processed by any escaper

`escape`: Tagged template literal which, when called, will escape every param passed as literal params. The escape action is idempotent, so params previously marked by `escaped` or has be `escaped` will not be processed again. Literals will be preserved and not escaped. Returns an `EscapableResult` instance.
