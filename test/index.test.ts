import { assertEquals } from "https://deno.land/std@0.115.1/testing/asserts.ts";

import createEscapeHelper from "../src/index.ts";

Deno.test("Simple escape", () => {
  const { escaped, escape } = createEscapeHelper((input: string | number) =>
    `yellow(${input})`
  );
  assertEquals(
    `${escape`Hello, world, ${escaped("this")} is an ${"escaped"} sentence!`}`,
    "Hello, world, this is an yellow(escaped) sentence!",
  );
});

Deno.test("Idempotent escape", () => {
  const { escaped, escape } = createEscapeHelper((input: string | number) =>
    `yellow(${input})`
  );
  const firstEscaped = escape`Hello, world, ${
    escaped("this")
  } is an ${"escaped"} sentence!`;
  const secondEscaped = escape`${firstEscaped}`;
  assertEquals(
    `${secondEscaped}`,
    "Hello, world, this is an yellow(escaped) sentence!",
  );
});

Deno.test("Multiple escape", () => {
  const { escaped: escapedYellow, escape: escapeYellow } = createEscapeHelper((
    input: string | number,
  ) => `yellow(${input})`);
  const { escaped: escapedPurple, escape: escapePurple } = createEscapeHelper((
    input: string | number,
  ) => `purple(${input})`);
  const escaped = escapePurple`${escapeYellow`Hello, world, ${
    escapedYellow("this")
  } is ${escapedPurple("an")} ${"escaped"} sentence!`}`;
  assertEquals(
    `${escaped}`,
    "Hello, world, purple(this) is yellow(an) purple(yellow(escaped)) sentence!",
  );
});
