import { serializeObject } from '../../lib/builder/serialize';

describe('serializeObject', () => {
  it('should serialize given object with regexp', () => {
    const obj = {
      regexp: [/http:\/\/google.com\//, /https:\/\/cdn.ampproject.org/],
    };
    const serializedValue = serializeObject(obj);
    expect(obj).to.deep.equal(
      wrapSerializedValueIntoFunction(serializedValue)(),
    );
  });
  it('should serialize given object with mixed data types', () => {
    const obj = {
      regexp: [1, '2', /a/g],
    };
    const serializedValue = serializeObject(obj);
    expect(obj).to.deep.equal(
      wrapSerializedValueIntoFunction(serializedValue)(),
    );
  });
  it('should serialize object within objects', () => {
    const obj = {
      child: {
        key: {
          subkey: 'value',
          indexes: [0, 4, 5],
        },
      },
    };
    const serializedValue = serializeObject(obj);
    expect(obj).to.deep.equal(
      wrapSerializedValueIntoFunction(serializedValue)(),
    );
  });
});

function wrapSerializedValueIntoFunction(serializedValue) {
  return eval(`() => {return ${serializedValue}}`);
}
