const Twitter = require('twitter-lite')
const TWITTER_DM_PATH = '/direct_messages/events/new'
var twitterClient = null

function directMessageParams(message, recipientID=null) {
  return {
    event: {
      type: 'message_create',
      message_create: {
        message_data: {
          text: message
        },
        target: { recipient_id: (recipientID || process.env.TWITTER_USER_ID) }
      }
    }
  }
}

function loadTwitterClient(data) {
  // Avoid duplicate client initialization
  if (twitterClient !== null) { return twitterClient }
  console.log('Loading Twitter client.');
  twitterClient = new Twitter({
    subdomain: "api",
    consumer_key: data.TWITTER_CONSUMER_KEY,
    consumer_secret: data.TWITTER_CONSUMER_SECRET,
    access_token_key: data.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: data.TWITTER_ACCESS_TOKEN_SECRET
  })
}

module.exports = {
  postDirectMesssage: function (message, credentials=null) {
    let recipientID = null

    if (typeof process.env.TWITTER_CONSUMER_KEY !== 'undefined') {
      // Use enviroment variables to load Twitter client when possible
      console.log('Loading Twitter client using enviroment variables');
      loadTwitterClient(process.env)
    } else if (credentials) {
      // Use provided credentials to load Twitter client
      console.log('credentials', credentials)
      loadTwitterClient(credentials)
      recipientID = credentials.TWITTER_USER_ID
    }

    if (twitterClient === null) throw 'Failed to load Twitter credentials!'

    console.log('Sending direct message...')

    twitterClient
      .post(TWITTER_DM_PATH, directMessageParams(message, recipientID))
      .then(function (results) {
        console.log("Message posted!", results['event']);
      })
      .catch(console.error);
  }
}
