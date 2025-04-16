// This parse JSON property data from a given object. Return the same object but with the specified field parsed.
class ParsedJsonPropertyMongooseDecorator {
  /**
   *
   * @param {*} data
   * @param {*} field
   */
  constructor(data, field) {
    this.data = data;
    this.field = field;
    if (!this.data || typeof this.data !== 'object') {
      throw new Error('Error while parsing JSON data: Invalid data format. Data should be object.');
    }

    if (!this.field || typeof this.field !== 'string') {
      throw new Error('Error while parsing JSON data: Field name is not provided or not a string.');
    }
  }

  getParsedJsonPropertyData() {
    const fieldData = this.data[this.field];
    if (!fieldData || typeof fieldData !== 'string') {
      throw new Error(`Error while parsing JSON data: Field "${this.field}" is not string.`);
    }

    try {
      let parsedFieldData = JSON.parse(fieldData);
      this.data._doc[this.field] = parsedFieldData;
      return this.data;
    } catch (error) {
      throw new Error(`Error while parsing JSON data: ${error.message}`);
    }
  }
}

module.exports = ParsedJsonPropertyMongooseDecorator;
