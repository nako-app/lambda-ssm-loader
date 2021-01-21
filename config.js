const { snakeCase } = require('change-case')
const { ssm } = require('./aws')

const environment = process.env.ENVIRONMENT || 'dev'
const prefix = `/${environment}/api`

const initializeConfig = async () => {
  let nextToken = null
  let hasNext = true

  while (hasNext) {
    const params = {
      NextToken: nextToken,
      Path: prefix,
      Recursive: true,
      WithDecryption: true
    }

    const parameters = await ssm.getParametersByPath(params).promise()

    console.log(parameters)
    parameters.Parameters.forEach(p => {
      process.env[snakeCase(p.Name.replace(prefix, '')).toUpperCase()] = p.Value
    })

    hasNext = parameters.NextToken != null
    nextToken = parameters.NextToken
  }
}

module.exports = {
  initializeConfig
}
