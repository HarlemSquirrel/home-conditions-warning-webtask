// https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// https://developer.twitter.com/en/docs/direct-messages/sending-and-receiving/overview
function sendTwitterDM(key, message) {
  let oauth_nonce = getRandomInt(Math.pow(10,10),Math.pow(10,11)).toString(16)
  let requestOptions = {
    headers: { authorization: 'OAuth oauth_consumer_key="' + YOUR_CONSUMER_KEY + '", oauth_nonce="AUTO_GENERATED_NONCE", oauth_signature="AUTO_GENERATED_SIGNATURE", oauth_signature_method="HMAC-SHA1", oauth_timestamp="AUTO_GENERATED_TIMESTAMP", oauth_token="USERS_ACCESS_TOKEN", oauth_version="1.0"',
               content-type: 'application/json' },
    method: 'POST',
    url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
    body: {
      event: {
        type: 'message_create',
        message_create: {
          target: {
            recipient_id: 'RECIPIENT_USER_ID'
          },
          message_data: { text: message }
        }
      }
    }
  }
  request(requestOptions, function (error, response, body) {
}
