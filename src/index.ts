import Escaper from "./Escaper.ts";
import EscapableResult from "./EscapableResult.ts";
import ArrayEscapableValue from "./ArrayEscapableValue.ts";
import SafeEscapableValue from "./SafeEscapableValue.ts";
import ToBeEscapedValue from "./ToBeEscapedValue.ts";

const createEscapeHelper = (escapeFn: Escaper): {
  escapeFn: Escaper;
  escaped(input: string): EscapableResult;
  escape(
    literals: TemplateStringsArray,
    ...params: Array<string | number | EscapableResult>
  ): EscapableResult;
} => {
  return {
    escapeFn,
    escaped(input: string | number | EscapableResult): EscapableResult {
      return new ToBeEscapedValue(input, new Set([escapeFn]));
    },
    escape(
      literals: TemplateStringsArray,
      ...params: Array<string | number | EscapableResult>
    ): EscapableResult {
      const escapedResults: Array<EscapableResult> = [];
      for (let i = 0; i < literals.length; i++) {
        escapedResults.push(new SafeEscapableValue(literals[i]));
        if (i !== literals.length - 1) {
          const param = params[i];
          escapedResults.push(new ToBeEscapedValue(param, new Set([])));
        }
      }
      return new ArrayEscapableValue(escapedResults).escape(escapeFn);
    },
  };
};

export type { Escaper, EscapableResult };
export default createEscapeHelper;
