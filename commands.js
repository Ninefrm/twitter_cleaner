// === CONFIG ===
var USER          = 'ninefrm';      // your username
var BASE_DELAY    = 1000;           // ms between each item
var CONFIRM_DELAY = 800;            // ms to wait for confirmation dialogs
var MODE          = 'timeline';     // 'timeline' | 'replies' | 'likes' | 'retweets'

// === UTILS ===
var processWithDelay = function(items, fn) {
  items.forEach(function(item, i) {
    setTimeout(function() { fn(item); }, i * BASE_DELAY);
  });
};

var scrollAfter = function(count) {
  setTimeout(function() {
    window.scrollTo(0, document.body.scrollHeight);
  }, count * BASE_DELAY + 500);
};

// === HANDLERS ===

// Delete Tweets (timeline)
var handleTimeline = function() {
  var articles = Array.prototype.slice.call(document.getElementsByTagName('article'));
  var mine = articles.filter(function(x) {
    return x.querySelector('[data-testid="UserAvatar-Container-' + USER + '"]');
  });
  processWithDelay(mine, function(article) {
    var caret = article.querySelector('[data-testid="caret"]');
    if (!caret) return;
    caret.click();
    setTimeout(function() {
      var delOpt = Array.prototype.slice
        .call(document.querySelectorAll('div[role="menuitem"]'))
        .find(function(el) { return el.textContent.trim() === 'Delete'; });
      if (!delOpt) { caret.click(); return; }
      delOpt.click();
      setTimeout(function() {
        var confirmBtn = document.querySelector('[data-testid="confirmationSheetDialog"] button');
        if (confirmBtn) confirmBtn.click();
      }, CONFIRM_DELAY);
    }, CONFIRM_DELAY);
  });
  scrollAfter(mine.length);
};

// Delete Replies (with_replies page)
var handleReplies = function() { handleTimeline(); };

// Unlike Likes (likes page)
var handleLikes = function() {
  var articles = Array.prototype.slice.call(document.getElementsByTagName('article'));
  processWithDelay(articles, function(article) {
    var btn = document.evaluate(
      './/div[3]/button', article, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue;
    if (btn) btn.click();
  });
  scrollAfter(articles.length);
};

// Undo Retweets (with_replies?mode=retweets)
var handleRetweets = function() {
  var articles = Array.prototype.slice.call(document.getElementsByTagName('article'));
  processWithDelay(articles, function(article) {
    var unrtBtn = article.querySelector('[data-testid="unretweet"]');
    if (!unrtBtn) return;
    unrtBtn.click();
    setTimeout(function() {
      var xpath = '//*[@id="layers"]/div[2]/div/div/div/div[2]/div/div[3]/div/div/div/div';
      var confirm = document.evaluate(xpath, document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
      if (confirm) confirm.click();
    }, CONFIRM_DELAY);
  });
  scrollAfter(articles.length);
};

// === RUN ===
switch (MODE) {
  case 'timeline': handleTimeline(); break;
  case 'replies':  handleReplies();  break;
  case 'likes':    handleLikes();    break;
  case 'retweets': handleRetweets(); break;
  default: console.warn('Unknown MODE:', MODE);
}
