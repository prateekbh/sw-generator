export function serializeObject(obj: any) {
  let stringified = '';
  for (const key in obj) {
    stringified += `"${key}": ${getStringForObj(obj[key])},`;
  }
  return `{${stringified}}`;
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
