const ParsedJsonPropertyMongooseDecorator = require('./ParsedJsonPropertyMongooseDecorator');

// This parse JSON property data from a given object. Return the same object but with the specified field parsed.
class ParsedJsonPropertyDataListDecorator {
  constructor(dataList, field) {
    this.dataList = dataList;
    this.field = field;
    if (!this.dataList || !Array.isArray(this.dataList)) {
      throw new Error('Error while parsing JSON data list: Invalid data list format. Data should be an array.');
    }

    if (!this.field || typeof this.field !== 'string') {
      throw new Error('Error while parsing JSON data: Field name is not provided or not a string.');
    }
  }

  getParsedJsonPropertyDataList() {
    return this.dataList.map((data, index) => {
      try {
        return new ParsedJsonPropertyMongooseDecorator(data, this.field).getParsedJsonPropertyData();
      } catch (error) {
        throw new Error(`Error while parsing JSON data from list with index ${index}: ${error.message}`);
      }
    });
  }
}

module.exports = ParsedJsonPropertyDataListDecorator;
