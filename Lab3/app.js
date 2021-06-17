const url =
    'http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather';

const FETCH_TIME = 5000;

let tweetList = [];
let tweetIDs = [];

let intervalID = window.setInterval(getTweets, FETCH_TIME);

/**
 * when x button on search bar is clicked, clear the previous output,
 * display all the old tweets without the search filter
 *
 * Acts like a clear button for search bar
 */
$('input[type=search]').on('search', function () {
    console.log('clear search bar');

    document.getElementById('output').innerHTML = ''; // clear filtered tweets
    displayTweets(tweetList);
});

/**
 * action listner for click for search button
 */
$('#searchButton').click(function (event) {
    event.preventDefault();
    handleSearch(this);
});

/**
 * Sets checkbox element to false
 *
 * used for polling / pausing or resuming fetching from the twitter API
 */
function check() {
    document.getElementById('my-check').checked = true;
    window.clearInterval(intervalID);
}

/**
 * Sets checkbox element to false
 *
 * used for polling / pausing or resuming fetching from the twitter API
 */
function uncheck() {
    document.getElementById('my-check').checked = false;
    intervalID = window.setInterval(getTweets, FETCH_TIME);
}

function getTweets() {
    if (!document.getElementById('my-check').checked) {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.statuses);
                addTweets(data);
            });
    } else {
        //  console.log("paused");
    }
    return getTweets;
}

function addTweets(data) {
    data.statuses.forEach(function (tweet) {
        if (!tweetIDs.includes(tweet.id)) {
            // console.log('no dupe ' + tweet.id);
            tweetIDs.push(tweet.id);
            tweetList.push(tweet);
        } else {
            // console.log('dupe ' + tweet.id);
        }
    });

    tweetList = tweetList.sort(function (a, b) {
        return a.id - b.id;
    });
    // call handleSearch to go thru tweets looking for
    handleSearch();
}

/**
 * filters out tweets that contain the search string in the #searchbar
 * @param {click} event
 */
const handleSearch = (event) => {
    function handleForm(event) {
        event.preventDefault();
    }
    let searchString = document
        .getElementById('searchBar')
        .value.trim()
        .toLowerCase();

    if (searchString === '') {
        displayTweets(tweetList);
    } else {
        var filtered = tweetList.filter(function (str) {
            return str.text.toLowerCase().includes(searchString);
        });

        console.log(filtered);
        filtered.forEach(function (tweet) {
            console.log(`str {${searchString}} :: ${tweet.text}`);
        });

        filtered = filtered.sort(function (a, b) {
            return a.id - b.id;
        });

        // document.getElementById('output').innerHTML = '';
        displayTweets(filtered);
    }
};

/**
 * Outputs a tweet to innerHTML
 * @param {array of tweets/json strings} data
 */
function displayTweets(data) {
    let displayOutput = '';
    data.forEach((tweet) => {
        console.log(tweet.text);
        displayOutput += `
        <div class="tweet-block align-bottom d-flex">
            <div class="d-flex align-bottom">
                <img
                    src="${tweet.user.profile_image_url_https}"
                    alt="Avatar"
                    class="avatar"
                />
                <div class="align-right d-flex flex-column">
                    <div class="d-flex">
                        <p><b>${tweet.user.name}</b></p>
                        <p class="tweet-info"> @${tweet.user.screen_name}</p>
                        <p class="tweet-info">${moment(
                            tweet.created_at,
                            'YYYY-MM-DDTHH:mm:s'
                        ).format('MMM D')}</p>
                    </div>
                    <p class="tweet--text__area">${tweet.text}</p>
                </div>
            </div>
        </div>
    `;
    });
    document.getElementById('output').innerHTML = displayOutput;
}
