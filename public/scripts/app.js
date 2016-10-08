/*
 * @author Alex Bennett
 *
 * @license MIT
 *
 * @version 0.0.1
 *
 */

'use strict'

const dotenv = require('dotenv').load()

const config = {
  name: process.env.NAME,
  secrect: process.env.SECRET
}

/*
 * Create new instance of codebird API and uses it to query
 * the twitter API
 *
 * @param config object
 *
 * @return promise of user tweets
 */

function getTweets(searchTerm) {

  let cb = new Codebird
  cb.setConsumerKey(config.name, config.secrect)
  let searchItem = document.getElementById(`input`).value

  return new Promise ((resolve, reject) => {
    cb.__call(`statuses_userTimeline`, `screen_name=` + searchItem, (reply) => resolve(reply))
  })
}

/*
 * Grabs the value of the input form
 * and uses that value to query the user search endpoint
 *
 * @input promise of user tweets
 *
 * @return void
 *
 */

$(`#search`).click((userEvent) => {

  userEvent.preventDefault()
  $(`.tweets`).empty()

  return (() => {
    getTweets().then((data) => {
      data.forEach((tweet, index) => {
        $(`.tweets`).append(`<li> ${ tweet.text } </li>`)
      })
    })
  }).call(config)
})
