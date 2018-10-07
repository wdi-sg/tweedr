module.exports = dbPool => {
  const create = (params, callback) => {
    const queryString =
      'INSERT INTO tweeds (content,author_id) VALUES ($1, $2)';
    const values = [params.content, params.id];

    dbPool.query(queryString, values, (error, queryResult) => {
      // invoke callback function with results after query has executed
      callback(error, queryResult);
    });
  };

  return {
    create
  };
};
