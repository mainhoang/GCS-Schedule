// to do: write conditional statement to fix issue when user inputs a train that starts at a future time.
// to do: write a function that auto refreshes the page so that info is fresh.
// to do: write a condition that prevents user from entering empty inputs.


var config = {
    apiKey: "AIzaSyC0AZPXA3XGXK_oUiCF6qQdZ1jTC7v29aQ",
    authDomain: "train-29e82.firebaseapp.com",
    databaseURL: "https://train-29e82.firebaseio.com",
    storageBucket: "train-29e82.appspot.com",
    messagingSenderId: "912154136206"
};

firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment().format("hh:mm A");

$("#clock").html(currentTime);

$("#add-btn").on("click", function(event) {

    event.preventDefault();

    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var start = moment($("#start-input").val().trim(), "HH:mm").format("MMM DD, YYYY hh:mm A");
    var frequency = $("#frequency-input").val().trim();

    console.log(start);

    var train = {
        name: name,
        destination: destination,
        start: start,
        frequency: frequency
    };

    database.ref().push(train);

    console.log("CLICK START", train.start);

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

    return false;

});

database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val());

    var name = childSnapshot.val().name;
    console.log("NAME", name);
    
    var destination = childSnapshot.val().destination;
    console.log("DEST", destination);

    var start = childSnapshot.val().start;
    console.log("START", start);

    var convertedStartTime = moment(convertedStartTime).subtract(1, "years").format("MMM DD, YYYY hh:mm A");
    console.log("CONVERT", convertedStartTime);

    var frequency = childSnapshot.val().frequency;
    console.log("FREQ", frequency);
    
    var difference = moment().diff(start, "minutes");
    console.log("DIFF", difference);
    
    var remainder = difference % frequency;
    console.log("REMAIN",remainder);
    
    var minutes = frequency - remainder;
    console.log("MINUTES",minutes);
    
    var next = moment().add(minutes, "minutes").format("hh:mm A");
    console.log("NEXT", next);
    
    console.log("--------------------------");

    $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + next + "</td><td>" + minutes + "</td></tr>");

});
