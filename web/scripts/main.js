(function($) {
  var targeturlEl = $('#targeturl');
  var resultEl = $('#result');

  $('#targeturlbtn').click(submit);

  //////////

  function submit() {
    var targeturl = targeturlEl.val();
    var isValid = false;

    reset();

    if (!targeturl) return;

    isValid = /^(http:\/\/|https:\/\/).+/.test(targeturl);

    if(!isValid) return;

    $.post('/api/', { targetUrl: targeturl })
      .done(function(data) {
        resultEl.html(JSON.stringify(data, null, 2));
      })
      .fail(function() {
        resultEl.html('Hmmm, something went wrong.');
      });
  }

  function reset() {
    resultEl.html('');
  }
})(window.jQuery);
