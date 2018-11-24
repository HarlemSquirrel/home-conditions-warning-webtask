const hoursToLookBack = 3
const request = require('request')

function highestHumidity(data) {
  console.log('highestHumidity data: ' + typeof data)
  return data['temps'].map(function (row) { return Number(row['humidity']) }).sort().reverse()[0]
}

function highestTemp(data) {
  return data['temps'].map(function (row) { return Number(row['tempC']) }).sort().reverse()[0]
}

function humidityWarning(percent) {
  if (percent > 90)
    return '⚠ ' + percent + '% humidity! Is there now a pool down there?';
  if (percent > 80)
    return '⚠ ' + percent + '% humidity! Are the walls sweating?';
  if (percent > 70)
    return '⚠ ' + percent + '% humidity! Get out your golashes.';
  if (percent > 65)
    return percent + '% humidity. Getting a little sticky.';
}

function tempWarning(degreesC) {
  if (degreesC < 0)
    return '⚠ ' + degreesC + '℃! Kiss your pipes goodbye.';
  if (degreesC < 5)
    return '⚠ ' + degreesC + '℃! Winter is coming.';
  if (degreesC < 10)
    return '⚠ ' + degreesC + '℃! Save the wine!';
}

function warningMessages(data) {
  return [humidityWarning(highestHumidity(data)),
          tempWarning(highestTemp(data))]
    .join("\n")
}

module.exports = function (ctx, done) {
  let key = ctx.data.HOME_CONDITIONS_API_KEY
  let url = ctx.data.HOME_CONDITIONS_SERVER_URL
  if (typeof key == 'undefined') { return done('API key is missing!', null) }

  let requestOptions = {
    url: url,
    qs: { hoursago: hoursToLookBack, key: key, other: 'blah' }
  }

  request(requestOptions, function (error, response, body) {
    if (error) {
      done(error, 'Woops, that did not work!');
    } else {
      console.log('Body: ' + body)
      data = JSON.parse(body)
      message = warningMessages(data)
      done(null, message);
    }
  })
}
