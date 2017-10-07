 //GYPHS.js file for javascript and jquery funtions and elements etc...
 var arrayInitialized = false;
 var buttonArray = ["rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit grab", "gerber", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];


 renderButtons();

 //  On Click event associated with the add-new-top function
 // This function handles events where one button is clicked
 $("#add-topic").on("click", function(event) {
     event.preventDefault();

     // This line grabs the input from the textbox
     var topic = $("#topic-input").val().trim();

     //alert("Topic: " + topic);
     buttonArray.push(topic);

     // Calling renderButtons which handles the processing of our movie array
     renderButtons();

 });




 // The movie from the textbox is then added to our array
 //movies.push(movie);

 function renderButtons() {

     // Deleting the buttons prior to adding new movies
     // (this is necessary otherwise you will have repeat buttons)
     $("#buttons-view").empty();
     $("gifs-appear-here").empty();
     $(".items").empty();

     // Looping through the array of movies
     for (var index = 0; index < buttonArray.length; index++) {

         // Then dynamicaly generating buttons for each movie in the array
         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
         var aButton = $("<button>");
         // Adding a class of movie to our button
         aButton.addClass("topic-input");
         // Adding a data-attribute

         //a.attr("data-name", movies[i]);
         aButton.attr("data-index", index);

         aButton.attr("topic", buttonArray[index].trim());

         // Providing the initial button text
         aButton.text(buttonArray[index]);

         // Adding the button to the buttons-view div
         $("#buttons-view").append(aButton);
     }


     //Handler for button onclick event
     $("button").on("click", function() {
         //var topic = $(this).attr("text");
         var topic = $(this).attr("topic");
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
             topic + "&api_key=dc6zaTOxFJmzC&limit=10";

         $.ajax({
                 url: queryURL,
                 method: "GET"
             })
             .done(function(response) {
                 console.log(response);
                 var results = response.data;

                 for (var i = 0; i < results.length; i++) {
                     var gifDiv = $("<div class='item'>");

                     var rating = results[i].rating;

                     var p = $("<p>").text("Rating: " + rating);

                     var topicImage = $("<img>");
                     topicImage.attr("src", results[i].images.fixed_height.url);
                     setImageHandler(topicImage);

                     gifDiv.prepend(p);
                     gifDiv.prepend(topicImage);

                     $("#gifs-appear-here").prepend(gifDiv);
                 } //end for
             }); //end function done

         //Set state of image
         // Ran out of time but pseudocode would be to load the still image into a variable
         //   Load the animated image into another variable and switch the images.
         //   If the image being displayed is the 'still' image, swap to the animated image.
         //   If the image being displayed is the 'animated image, then swap/show the still image.

         function setImageHandler(topicImage) {

             $(topicImage).on("click", function() {
                 if (topicImage.attr("data-state") === "still") {
                     // topicImage.attr("src") = topicImage.fixed_height;
                 }


                 // alert("An image was clicked");
             })
         }


     }); //end function button on-click


 }