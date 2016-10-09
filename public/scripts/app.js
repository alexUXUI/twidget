/**
 * @author Alex Bennett
 * @license MIT
 * @version 0.0.1
 */

'use strict'

const dotenv = require('dotenv').load()

const cb = new Codebird

const config = {
  name: process.env.NAME,
  secrect: process.env.SECRET
}

const searchConfig = [
  `statuses_userTimeline`,
  `screen_name=`
]

const [timeline, user] = searchConfig

const domAPI = {
  searchBtn: $(`#search`),
  tweetContainer: $(`.tweets`),
  queryInput: $(`#input`)
}

/**
 * Create new instance of codebird API and uses it to query
 * the twitter API
 * @param config object
 * @return promise of user tweets
 */

function getTweets(searchTerm) {
  cb.setConsumerKey(config.name, config.secrect)
  let searchItem = domAPI.queryInput.value
  return new Promise ((resolve, reject) => {
    cb.__call(timeline, user + searchItem, (reply) => resolve(reply))
  })
}

/**
 * Grabs the value of the input form
 * and uses that value to query the user search endpoint
 * @param promise of user tweets
 * @return void
 */

domAPI.searchBtn.click((userEvent) => {
  userEvent.preventDefault()
  domAPI.tweetContainer.empty()
  return (() => {
    getTweets().then((data) => {
      data.forEach((tweet, index) => {
        displayTweet(tweet)
      })
    })
  }).call(config)
})

/**
 * Pulls the tweet content out of response object
 * prints it to the DOM
 * @param promise of user tweets
 * @return void
 */

function displayTweet(tweet){
  domAPI.tweetContainer.append(`
    <li class="list-group-item">
      <p>${ tweet.text }</p>
      <hr>
      <div class='entities'>
        <p>
          <span class="glyphicon glyphicon-retweet" aria-hidden="true"></span>
          ${ tweet.retweet_count }
        </p>
        <p>${ tweet.created_at }</p>
        <p>
          <span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
          ${ tweet.favorite_count }
        </p>
      </div>
    </li>`
  )
}

// <p>#${ tweet.entities.hashtags[0].text }</p>
