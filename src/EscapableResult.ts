import Escaper from "./Escaper.ts";

interface EscapableResult {
  escape(fn: Escaper): EscapableResult;
  toString(): string;
}

export default EscapableResult;
