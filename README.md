# Hairdye

This is a helper library which facilitates escaping strings.

## Before using this library

Make sure you know the alternatives. For example, if you are dealing with SQL
queries, the most appropriate ways are using parametrized queries or prepared
statements, instead of manually inserting escape functions into every param you
have.

However, we know that from time to time, we cannot do this easily. We end up
escaping every param which can cause a lot of mistakes. There are two major
types of flaws: forgetting to escape params, and escaping them more than once.

### Example

Suppose we have an `escape-html` utility, and we want to escape the params, we
can do something like converting

```javascript
const text = `<span style="color: red; ">${email}, ${name}, ${count}</span>`;
```

to

```javascript
const text = `<span style="color: red; ">${escapeHtml(email)}, ${
  escapeHtml(name)
}, ${count}</span>`;
```

. But then we have to insert `escapeHtml` to every param that we need to
escape...and how about `count`? If it is a number, then most likely we don't
have to escape it. However, when the string complexity grows, sooner or later we
may mix things up or forget to escape the params.

### Example

Suppose we have something like

```javascript
const content = `<span style="color: red; ">{escapeHtml(email)}</span>`;
const text = `<div style="color: blue">${content}</span>`; // oh, do we have to escape here?
```

We have such a question here because the escape operation is not idempotent. If
we do not put the escape operation in `content`, we may end up forgetting to
ecape the email. However, if we put the escape in `text`, we are still stuck
because we will incorrectly escape the `span`.

Some people may mistakenly think that we can unescape the string repeatedly
until it does not change, and then re-escape it. It actually does not work,
because if the param contains escaped character, we still have to show it by
escaping it, instead of just keeping that copy.

## Usage

We can simply use

```javascript
const { escape, escaped } = createEscapeHelper(escapeHtml);
const email = "your.email@provider.com";
const text = escape`<span style="color: red; ">${email}</span>`;
const content = escape`<div style="color: blue; ">${text} ${"injectedName"} ${
  escaped(3)
}</div>`;

console.log(`${content}`);
```

Then both `email` and `"injectedName"` will be escaped once, except `3`. We can
pass `content` around until we need to convert it to a string.
