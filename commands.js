// delete likes
var divs = document.getElementsByTagName('div') 
var arr = Array.prototype.slice.call( divs) 
var hearts = arr.filter(x => x.getAttribute('data-testid') == 'unlike') //likes
hearts.forEach(h => h.click()) 
window.scrollTo(0, document.body.scrollHeight) 
//delete retweets
var divs = document.getElementsByTagName('div') 
var arr = Array.prototype.slice.call(divs) 
var retweets = arr.filter(x => x.getAttribute('data-testid') == 'unretweet') // retweet
let unret_len = 0
retweets.forEach((element) => {
    element.click()
    var divs = document.getElementsByTagName('div') 
    var arr = Array.prototype.slice.call(divs) 
    var unret = arr.filter(x => x.getAttribute('data-testid') == 'unretweetConfirm') // retweet confirm
    unret.forEach(h => h.click()) 
    // unret[0].click()
});
// delete replys tweets
var divs = document.getElementsByTagName('div') 
var arr = Array.prototype.slice.call(divs) 
var dots_tweet = arr.filter(x => x.getAttribute('data-testid') == 'caret')  
dots_tweet.forEach((element) => {
    element.click()
    confirm_button = document.getElementsByClassName('css-1dbjc4n r-1loqt21 r-18u37iz r-1ny4l3l r-ymttw5 r-1f1sjgu r-o7ynqc r-6416eg r-13qz1uu')[0]
    console.log(confirm_button.textContent)
    if (confirm_button.textContent == 'Eliminar'){
        confirm_button.click()
        var divs = document.getElementsByTagName('div') 
        var arr = Array.prototype.slice.call(divs) 
        var unret = arr.filter(x => x.getAttribute('data-testid') == 'confirmationSheetConfirm') // delete tweet
        unret.forEach(h => h.click()) 
        unret[0].click()
        return
    }
    element.click()
    return
});
window.scrollTo(0, document.body.scrollHeight) 
