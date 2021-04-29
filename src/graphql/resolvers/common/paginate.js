const { Types } = require('mongoose');

const { encode } = require('../../../utils/buffer');

function resolver(Model, query, cursor, first = 5, sort) {
  const limit = first > 0 ? first : 5;

  try {
    const ascii = decode(cursor);
    const objectId = ascii.split('-')[1];
    if (Types.ObjectId.isValid(objectId)) {
      query._id = { $lt: objectId };
    }
  } catch (e) {}

  return Model.find(query)
    .limit(limit + 1)
    .sort(sort)
    .then((documents) => {
      const hasNextPage = documents.length > limit;

      hasNextPage && documents.pop();

      const totalCount = documents.length;
      const edges = documents.map((node) => ({
        node,
        cursor: encode(`cursor-${node._id}`),
      }));
      const endCursor =
        documents.length === 0
          ? null
          : encode(`cursor-${documents[documents.length - 1]._id}`);

      const pageInfo = {
        hasNextPage,
        endCursor,
      };

      return {
        totalCount,
        pageInfo,
        edges,
      };
    });
}

module.exports = resolver;
