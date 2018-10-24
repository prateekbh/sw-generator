export function regexpParse(regexpString: string): RegExp | null {
  try {
    const parts = /\/(.*)\/(.*)/.exec(regexpString);
    if (parts && parts[1]) {
      return new RegExp(parts[1], parts[2] || '');
    } else {
      console.log(`Regexp ${regexpString} was not parsed successfully`);
    }
    return null;
  } catch (e) {
    return null;
  }
}
