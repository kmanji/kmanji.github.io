
$(document).ready(function(){
  var a;
  var q;
  var quotes = [{"id": 1, "quote": "You can do anything, but not everything.", "author": "David Allen"},
{"id": 2, "quote":"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
"author": "Antoine de Saint-Exupéry"},
{"id":3, "quote": "The richest man is not he who has the most, but he who needs the least.",
"author": "Unknown Author"},
{"id": 4, "quote": "You miss 100 percent of the shots you never take.",
"author": "Wayne Gretzky"},
{"id": 5, "quote": "Courage is not the absence of fear, but rather the judgement that something else is more important than fear.",
"author": "Ambrose Redmoon"}];

  function loadQuote() {
    var random = Math.floor(Math.random()*5);
    html = "";
    q = quotes[random].quote;
    a = quotes[random].author;
    html += "<p class='quotes quote-quote'>" + q + "</p><br><p class='quotes quote-author'>~ " + a + "</p>"
    $(".quote").html(html);
  }
  $("#tweet-quote").click(function(){ window.open('https://twitter.com/intent/tweet?text=' + "\"" + q + "\"" + ' - ' + a);
  }); 
  
  
  $(window).load(function(){
    loadQuote();
  });
  
  $("#next").on("click", function() {
    loadQuote();
  });
  
});