/**
 * This module serializes the given object into a jS parsable string equivalent.
 * Why we cant use `JSON.stringify`?
 * Thats because often in case of service worker we use RegExp,
 * and RegExp has no JSON representation.
 * e.g. JSON.stringify([/a/,/b/]) gives [{}, {}].
 * Also, why not use RegExp.toString(),
 * then the answer is that we'll converting RegExp into strings which means
 * /a/ will become "/a/", now we'll need something to parse this back
 * RegExp, which is a runtime task. We can optimize this with the below function.
 * Difference b/w `serializeObject` and `JSON.stringify with RegExp as string`
 * JSON.stringify({regexps: [/a/,/b/]}) will be {regexps: ["/a/", "/b/"]}
 * serializeObject({regexps: [/a/,/b/]}) will be {regexps: [/a/, /b/]}
 *
 * Thus we can use the output of `serializeObject` to replace a text in the bundle
 * by any rollup plugin, without any perf loss.
 */

export function serializeObject(obj: any) {
  let stringifiedValue = [];
  if (Array.isArray(obj)) {
    return getStringForObj(obj);
  }
  for (const key in obj) {
    stringifiedValue.push(`${key}: ${getStringForObj(obj[key])}`);
  }
  return `{${stringifiedValue.join(',')}}`;
}

function getStringForObj(obj: any): any {
  if (Array.isArray(obj)) {
    return `[${obj.map(item => getStringForObj(item))}]`;
  } else if (obj instanceof RegExp) {
    return obj.toString();
  } else if (typeof obj === 'number') {
    return obj;
  } else if (typeof obj === 'object') {
    return `${serializeObject(obj)}`;
  } else {
    return `"${obj}"`;
  }
  return null;
}
