// Event listener for all button elements
$("#buttons-go-here").on("click", "button", function () {
    console.log('nikko');
    // In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr("data-person");
    console.log(person);
    $("#gifs-appear-here").empty();

            // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=ZObuCGpXH7JfzssZCJYAWQtyQnB757oP&limit=10";



    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // After the data comes back from the API
    .then(function (response) {
        console.log(response); 
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='item'>");
                console.log(gifDiv);
                // Storing the result item's rating
                var rating = results[i].rating;
                console.log(rating);
                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);
                console.log(p);
                // Creating an image tag
                var personImage = $("<img>");
                console.log(personImage);
                // Giving the image tag an src attribute of a proprty pulled off the
                // result item
                personImage.attr("src", results[i].images.fixed_height.url);
                personImage.attr("data-state", "animate");
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-still", results[i].images.downsized_still.url);

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(personImage)

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
            }

        }
    });
          
          
})

//Submit event listener 
$("#add-button").on("click", function (event) {
    event.preventDefault()
    console.log("hi");
    $("#gifs-appear-here").empty();
    var inputText = $("#input-text").val().trim();
    var buttonTag = $("<button>").addClass("btn btn-secondary").attr('data-person', inputText).css({
        'margin': '5px'
    });
    buttonTag.text(inputText);
    $("#buttons-go-here").append(buttonTag);
    console.log(buttonTag);

    queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        inputText + "&api_key=ZObuCGpXH7JfzssZCJYAWQtyQnB757oP&limit=10"
});

$("#gifs-appear-here").on("click","img", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(state); 
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});