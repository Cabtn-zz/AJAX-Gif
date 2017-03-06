var topics = ["Games", "Robots", "Space", "Movies", "Books", "SciFi"];
var imgURL;
var image;  



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

        var gif = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC";
        console.log(gif)
        // Creates AJAX call for the specific movie button being clicked
        		$.ajax({
			url: queryURL,   
			method: "GET",
		}).done(function(response){
			for (var i = 0; i < 10; i ++){
				console.log(response.data[i].images.original.url);
				imgURL = response.data[i].images.original.url;
				image = $("<img>").attr("src", imgURL);
				$("body").append(image);
			}	
		});
}

$("#search").on("click", function(event) {
    event.preventDefault();
    newTerm = $("#search-input").val();
    console.log(newTerm);
    topics.push(newTerm);
    console.log(topics);
    renderButtons();
});

$(document).on("click", ".topic", displayGifs);


