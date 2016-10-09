/**
 * @author Alex Bennett
 * @license MIT
 * @version 0.0.1
 */

'use strict'

const dotenv = require('dotenv').load()

const config = {
  name: process.env.NAME,
  secrect: process.env.SECRET
}

/**
 * Create new instance of codebird API and uses it to query
 * the twitter API
 * @param config object
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

/**
 * Grabs the value of the input form
 * and uses that value to query the user search endpoint
 * @param promise of user tweets
 * @return void
 */

$(`#search`).click((userEvent) => {

  userEvent.preventDefault()
  $(`.tweets`).empty()

  return (() => {
    getTweets().then((data) => {
      console.log('yo data: ', data);
      data.forEach((tweet, index) => {
        // if(tweet.entities.hashtags[0]) {
          $(`.tweets`).append(`
            <li class="list-group-item">
              <p>${ tweet.text }</p>
              <hr>
              <div class='entities'>
                <p><span class="glyphicon glyphicon-retweet" aria-hidden="true"></span>  ${ tweet.retweet_count }</p>
                <p>${ tweet.created_at }</p>
                <p><span class=""><span class="glyphicon glyphicon-heart" aria-hidden="true"></span></span> ${ tweet.favorite_count }</p>
              </div>
            </li>`
          )
        // } else {
// <p>#${ tweet.entities.hashtags[0].text }</p>
          // do something else?

        // }
      })
    })
  }).call(config)
})
