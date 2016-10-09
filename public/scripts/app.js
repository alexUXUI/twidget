/**
 * @author Alex Bennett
 * @license MIT
 * @version 0.0.1
 */

'use strict'

/* environment variable handler */
const dotenv = require('dotenv').load()

/* library that abstracts communication with twitter */
const cb = new Codebird

/* twitter credentials */
const config = {
  name: process.env.NAME,
  secrect: process.env.SECRET
}

/* request object for twitter API */
const searchConfig = [
  `statuses_userTimeline`,
  `screen_name=`
]

/* destructures request obj */
const [timeline, user] = searchConfig

/* cached set of DOM elements for easy access */
const domAPI = {
  searchBtn: $(`#search`),
  tweetContainer: $(`.tweets`),
  queryInput: $(`#input`)
}

/**
 * Passes credentials to codebird. Grabs the value
 * of the input form and uses that to query the user
 * search endpoint, which returns a promise of tweets.
 *
 * @param config object
 * @return promise of user tweets
 */

function getTweets(searchTerm) {
  cb.setConsumerKey(config.name, config.secrect)
  let searchItem = document.getElementById(`input`).value
  return new Promise ((resolve, reject) => {
    cb.__call(timeline, user + searchItem, function(reply){

      var withMedia = []
      var withoutMedia = []

      var total = {
        with: withMedia,
        without: withMedia
      }

      console.log('yo reply', reply);
      reply.forEach(function(tweet, index){
        if(tweet.entities.media[0].media_url === undefined){
          console.log('theres not an IMAGE :()');
          withoutMedia.push(tweet)
        } else {
          console.log('there is an image?');
          withMedia.push(tweet)
        }
      })
      resolve(reply)
    })
  })
}

/**
 * On click seach btn, the getTweets function is called,
 * and the promise object is then passed to the displayTweet
 * function, which calls  displayTweet on each user
 * tweet, printing all of the users tweets to the DOM.
 *
 * @param promise of user tweets
 * @return void
 */

domAPI.searchBtn.click((userEvent) => {
  userEvent.preventDefault()
  domAPI.tweetContainer.empty()
  return (() => {
    getTweets().then((data) => {
      console.log('tweets: ', data);
      data.forEach((tweet, index) => {
        displayTweet(tweet)
      })
    })
  }).call(config)
})

/**
 * Pulls the content out of twitter
 * response and prints it to the DOM.
 *
 * @param promise of user tweets
 * @return void
 */

function displayTweet(tweet){

  domAPI.tweetContainer.append(`
    <li class="list-group-item">
      <p>${ tweet.text }</p>
      <img src="${ tweet.entities.media[0].media_url }" />
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
