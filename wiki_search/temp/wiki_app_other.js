// Hide the search icon and accompanying instructions
// Show the search field and give it focus
// the .hidden class has display:none defined in CSS
function displaySearch() {
  document.getElementById('search-icon').classList.add('hidden');
  document.getElementById('instructions').classList.add('hidden');
  document.getElementById('search-form').classList.remove('hidden');
  document.getElementById('search-field').focus();
}

// Reset elements back to their defaults
function resetPage() {
  document.getElementById('main').className = 'container main-default-view';
  document.getElementById('search-icon').classList.remove('hidden');
  document.getElementById('instructions').classList.remove('hidden');
  document.getElementById('search-form').classList.add('hidden');
  document.getElementById('search-results').classList.add('hidden');
  document.getElementById('search-results').innerHTML = '';
  document.getElementById('search-field').value = '';
}

function notFound(searchTerm) {
  document.getElementById('search-results').innerHTML = 
    '<p style="text-align:center;margin: 2em 1em 0 1em">' +
    'Sorry, Wikipedia did not return any search results for the term: ' + 
    '<strong>' + searchTerm + '</strong>' + 
    '</p>';
}


// Parse JSON and display results on the page
function displayResults(json) {
  
  // Clear previous results, if any, and prepare page to display results
  document.getElementById('search-results').innerHTML = '';
  document.getElementById('search-results').classList.remove('hidden');
  document.getElementById('main').className = 'container main-results-view';
  
  // Remove focus from the search field to hide the keyboard on mobile
  document.getElementById('search-field').blur(); 

  // Iterate through JSON to create one bootstrap row for each search result
  for(var i = 0; i < json[1].length; i++) {
    document.getElementById('search-results').innerHTML +=
      '<div class="row result"><a href="' + json[3][i] +
      '" + target="_blank"><p><strong>' +
      json[1][i] +
      '</strong></p><p>' +
      json[2][i] +
      '</p></a></div>';
  }
}

// get data for the search term
function search() {
  // read the input field to get the search term
  var searchTerm = document.getElementById('search-field').value;
  console.log(searchTerm);

  // get the data
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchTerm,
    cache: true, // caching to be a good netizen - may get old results, but okay for this project
    dataType: 'jsonp'
    })
    .fail(function(err) {
      console.log(err);
    })
    .always(function(json) {
      json[1].length===0?notFound(searchTerm):displayResults(json);
  });
}

// If the user hits Esc, reset the page back to the default
$(document).keyup(function(e) {
  if (e.keyCode === 27) {
    resetPage();
  }
});

// If user presses enter, search
function pressedEnter(e) {
  var key=e.keyCode || e.which;
    if (key === 13) {
      search();
  }
}

