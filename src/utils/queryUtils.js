/**
 *
 * @param {Object} originalFilter
 * @param {string | undefined | null} searchTerm
 * @param {string[]} searchFields
 * @returns {Object}
 */
const buildMongoSearchFilter = (originalFilter, searchTerm, searchFields) => {
  const andConditions = [];

  if (typeof originalFilter === 'object' && Object.keys(originalFilter).length > 0) {
    andConditions.push({ ...originalFilter });
  }

  // Add search condition if searchTerm and searchFields are provided and valid
  if (
    searchTerm &&
    typeof searchTerm === 'string' &&
    searchTerm.trim() !== '' &&
    Array.isArray(searchFields) &&
    searchFields.length > 0
  ) {
    const regex = new RegExp(searchTerm.trim(), 'i'); // Case-insensitive regex, trim whitespace

    // Build the $or condition dynamically based on searchFields
    const orClauses = searchFields.map((field) => ({ [field]: regex }));

    // Only add the $or clause if there are fields to search in
    if (orClauses.length > 0) {
      const searchCondition = { $or: orClauses };
      andConditions.push(searchCondition);
    }
  }

  if (andConditions.length === 0) {
    return {};
  } else if (andConditions.length === 1) {
    return andConditions[0];
  } else {
    return {
      $and: andConditions,
    };
  }
};

module.exports.buildMongoSearchFilter = buildMongoSearchFilter;
