import Escaper from "./Escaper.ts";
import EscapableResult from "./EscapableResult.ts";

class ToBeEscapedValue implements EscapableResult {
  private _escapedFnSet: Set<Escaper>;
  private _value: string | number | EscapableResult;

  constructor(
    value: string | number | EscapableResult,
    escapedFnSet: Set<Escaper>,
  ) {
    this._value = value;
    this._escapedFnSet = escapedFnSet;
  }

  toString(): string {
    return `${this._value}`;
  }

  escape(fn: Escaper): EscapableResult {
    if (this._escapedFnSet.has(fn)) {
      return this;
    } else {
      return new ToBeEscapedValue(
        typeof this._value === "number" || typeof this._value === "string"
          ? fn(this._value)
          : (this._value as EscapableResult).escape(fn),
        this._escapedFnSet.add(fn),
      );
    }
  }
}

export default ToBeEscapedValue;
