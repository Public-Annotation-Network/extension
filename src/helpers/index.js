export const getTweetData = (url = undefined) => {

    const tweetInfo = url ? url.split('/') : window.location.href.split('/')

    // if (tweetInfo[2] !== 'twitter.com' && tweetInfo[4] !== 'status') {
    //     alert('This only works on Tweet pages')
    // }

    const tweetAuthor = tweetInfo[3]
    const tweetId = tweetInfo[5]

    return { tweetAuthor, tweetId }
}