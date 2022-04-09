import Escaper from "./Escaper.ts";
import EscapableResult from "./EscapableResult.ts";

class ArrayEscapableValue implements EscapableResult {
  private _escapableValues: Array<EscapableResult>;

  constructor(escapableValues: Array<EscapableResult>) {
    this._escapableValues = escapableValues;
  }

  escape(fn: Escaper): EscapableResult {
    return new ArrayEscapableValue(
      this._escapableValues.map((
        escapableValue,
      ) => (escapableValue.escape(fn))),
    );
  }

  toString(): string {
    return this._escapableValues.map((
      escapableValue,
    ) => (escapableValue.toString())).join("");
  }
}

export default ArrayEscapableValue;
