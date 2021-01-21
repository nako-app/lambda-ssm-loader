const AWS = require('aws-sdk')
const SSM = require('aws-sdk/clients/ssm')
AWS.config.update({
  region: 'us-east-1'
})

const ssm = new SSM()

module.exports = {
  ssm
}
