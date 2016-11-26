const express = require('express')
const app = express()
const Ranka = require('ranka')
const config = require('config')
const chrono = require('chrono-node')
const moment = require('moment-timezone')
const nlp = require('nlp_compromise')
const gemoji = require('gemoji')
/**
 * Initializes Ranka
 * @type {Ranka}
 */
const ranka = new Ranka({
  validationToken: config.get('validationToken'),
  pageAccessToken: config.get('pageAccessToken')
})

app.get('/', function (req, res) {
  res.send('Webhook for Facebook')
})

// Passes `ranka` instance into rankaRouter
app.use('/webhook', Ranka.router({
  ranka: ranka
}))

ranka.on('message', (req, res) => {
  const loc = req.getLocation()
  if (req.isThumbsUp()) {
    res
      .sendText('Thumbs up to you too!')
      .exec()
  } else if (loc) {
    res
      .sendText(`lat: ${loc.payload.coordinates.lat}, long: ${loc.payload.coordinates.long}`)
      .exec()
  } else if (req.message.text === 'hi') {
    res.sendQuickReplies('Please share your location:', [
      {
        content_type: 'location'
      }
    ]).exec()
  } else if (req.message.text.toLowerCase().startsWith('i have')) {
    // i have a pen
    // i have an 🍎
    // i have a 🐂
    const terms = nlp.sentence(req.message.text).terms
    const last = terms[terms.length - 1]
    let output = ''
    if (last.tag === '?') {
      const description = gemoji.unicode[last.text].description
      output = `You have ${nlp.noun(description).article()} ${description} ${last.text}!`
    } else {
      output = `You have a ${last.text}!`
    }
    res.sendText(output).exec()
  } else if (req.message.text.match(/(arrange|book|reserve).*(appointment)/i)) {
    // Book 1 appointment tomorrow at 4 PM
    // Book an appointment next thursday at noon
    const datetimes = nlp.sentence(req.message.text).terms.filter((term) => {
      return term.tag === 'Date'
    })
    if (datetimes) {
      const parsed = chrono.parseDate(datetimes[0].text)
      res.sendText(moment.tz(parsed, 'Asia/Singapore').format('LLLL zz')).exec()
    } else {
      res.sendText('No date or time found!').exec()
    }
  } else {
    res
      .sendText(`mm...`)
      .typing()
      .wait(3000)
      .sendText(`Did you say "${req.message.text}"?`)
      .sendImage('http://i.giphy.com/FdQj4yMGloVMI.gif')
      .exec()
  }
})
ranka.on('read', (req, res) => {
  console.log('READ!')
})
ranka.on('message-echo', (req, res) => {
  console.log('ECHO!')
})

app.listen(8955, function () {
  console.log('Example app listening on port 8955!')
})
