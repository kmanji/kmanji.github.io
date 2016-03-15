
  console.log('active');
  
  function search(){

    // read the input field to get the search term
    var searchTerm = document.getElementById('search_field').value;
    console.log(searchTerm + " search term");

    //get data from wiki
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm,
      dataType: 'jsonp'
      })
      .fail(function(err){
        console.log(err);
      })
      .always(function(json){
        console.log(json[1]);
        wikiResults(json); // json[1].length === 0 ? termNotFound(searchTerm) :  
    });
  }

  function pressedEnter(e) {
    var key=e.keyCode || e.which;
    console.log(key);
    if (key === 13) {
      search();
    }
  }

  function wikiResults(json){
    console.log("wikiResults");
    document.getElementById('wiki_results').innerHTML = "";
    document.getElementById('id_random').classList.add('hidden');
    //document.getElementById('wiki_results').classList.remove('hidden');
    console.log(json[1].length);    

    // Remove focus from the search field to hide the keyboard on mobile
    //document.getElementById('search_field').blur();

    // Iterate through JSON to create one bootstrap row for each search result
    for(var i = 0; i < json[1].length; i++) {
      console.log(json[1][i].length + " inside loop");  
      document.getElementById('wiki_results').innerHTML +=
        '<div class="row styling results"><a href="' + json[3][i] +
        '" + target="_blank"><p><strong>' +
        json[1][i] +
        '</strong></p><p>' +
        json[2][i] +
        '</p></a></div><br/>';  
        console.log(json[3]);  
    };
  };
$(document).ready(function() {
});