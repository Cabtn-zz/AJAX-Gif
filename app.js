var topics = ["Games", "Robots", "Space", "Movies", "Books", "SciFi", "Hearthstone", "GWENT", "Artificial Intelligence"];
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
    a.addClass("btn btn-primary")
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
      console.log(response)
      //This gets the first 10 gifs from the search
			for (var i = 0; i < 10; i ++){
				
				gifURL = response.data[i].images.fixed_height.url;
        imgURL = response.data[i].images.fixed_height_still.url;
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
          var animate = $(this).attr('data-animated');
          $(this).attr("src", animate);
          toggle = true;
          }
          //Use the animate function to change from img to gif
          else {
          var still = $(this).attr("data-still");
          $(this).attr("src", still);
          toggle = false;
          }
        });
		});
}
//This adds a topic to the array and calls the renderbutton function
$("#search").on("click", function(event) {
    event.preventDefault();
    newTerm = $("#search-input").val();
    var notDuplicate = $.inArray(newTerm, topics) === -1 && newTerm !== "";
    //This makes it so you can't repeat the same term or add an empty button
    if (notDuplicate === true){
    console.log(newTerm);
    topics.push(newTerm);
    renderButtons();
    }
});

$(document).on("click", ".topic", displayGifs);


