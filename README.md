# lambda-ssm-loader

Utility that will load all available values in the parameter store (following a prefix) and add them as environment variables.

## Add in your project

Add to your package.json `dependencies section the following:

```
"lambda-ssm-loader": "nako-app/lambda-ssm-loader#master"
```

## Example usage

```
const { initializeConfig } = require('lambda-ssm-loader')

exports.lambdaHandler = async (event, context) => {
  try {
    console.log('Loading config')
    await initializeConfig(`/prod/api`)

    console.log(process.env)

    // Let's assume you have a value in the parameter store named
    // /prod/api/database/host, you can access it this way:
    console.log(process.env.DATABASE_HOST);

    return {
      statusCode: 200
    }
  } catch (err) {
    console.log(err)
    return err
  }
}

```

## TODOs

- Release to npm properly
