var topics = ["Games", "Robots", "Space", "Movies", "Books", "SciFi"];
var gifURL;
var imgURL;
var image; 
var toggle = false; 

function renderButtons() {
  // Deletes the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Loops through the array of movies
  for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generates buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("topic");
    // Added a data-attribute
    a.attr("data-name", topics[i]);
    // Provided the initial button text
    a.text(topics[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
    console.log("works")
  }
}
renderButtons();

function displayGifs() {
        $(".gifs").empty();
        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC";
        // Creates AJAX call for the specific movie button being clicked
        		$.ajax({
			url: queryURL,   
			method: "GET",
		}).done(function(response){
      //This gets the first 10 gifs from the search
			for (var i = 0; i < 10; i ++){
				
				gifURL = response.data[i].images.original.url;
        imgURL = response.data[i].images.original_still.url;
        var b =$("<img>");
        b.attr('data-animated', gifURL);
        b.attr('data-still', imgURL);
        b.addClass("play");
				image = $(b).attr("src", imgURL);
				$(".gifs").append(image);
        $(".gifs").append("<p> Rating: " + response.data[i].rating+ "</p>");
			}
      //This is what stops and starts gifs
      	$(".play").on("click", function(event) {
          if (toggle === false){
          console.log(this);
          var c = $(this).attr('data-animated');
          $(this).attr("src", c);
          console.log("play");
          toggle = true;
          }
          //Use the animate function to change from img to gif
          else {
          var d = $(this).attr("data-still");
          $(this).attr("src", d);
          toggle = false;
          }
        });
		});
}
//This adds a topic to the array and calls the renderbutton function
$("#search").on("click", function(event) {
    event.preventDefault();
    newTerm = $("#search-input").val();
    console.log(newTerm);
    topics.push(newTerm);
    renderButtons();
});

$(document).on("click", ".topic", displayGifs);


