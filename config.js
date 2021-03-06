const { snakeCase } = require("change-case");
const { ssm } = require("./aws");

const initializeConfig = async (prefix) => {
  let nextToken = null;
  let hasNext = true;

  while (hasNext) {
    const params = {
      NextToken: nextToken,
      Path: prefix,
      Recursive: true,
      WithDecryption: true,
    };

    const parameters = await ssm.getParametersByPath(params).promise();

    parameters.Parameters.forEach((p) => {
      process.env[snakeCase(p.Name.replace(prefix, "")).toUpperCase()] =
        p.Value;
    });

    hasNext = parameters.NextToken != null;
    nextToken = parameters.NextToken;
  }
};

module.exports = {
  initializeConfig,
};
