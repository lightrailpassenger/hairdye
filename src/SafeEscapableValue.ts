import EscapableResult from "./EscapableResult.ts";

class SafeEscapableValue implements EscapableResult {
  private _value: string | number;

  constructor(value: string | number) {
    this._value = value;
  }

  toString(): string {
    return `${this._value}`;
  }

  escape(): EscapableResult {
    return this;
  }
}

export default SafeEscapableValue;
