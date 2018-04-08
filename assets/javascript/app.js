//creates firebase link
var config = {
    apiKey: "AIzaSyDb1igE8e2Mv2VnNL3Brsnsz6nTaDQW0vw",
    authDomain: "trainschedule-c652f.firebaseapp.com",
    databaseURL: "https://trainschedule-c652f.firebaseio.com",
    projectId: "trainschedule-c652f",
    storageBucket: "trainschedule-c652f.appspot.com",
    messagingSenderId: "265740267899"
  };
  firebase.initializeApp(config);

  var database =firebase.database();
//button for adding trains
$("#submitButton").on("click",function(event){
    event.preventDefault();
    // gets User input

    var trainName=$("#trainNameInput").val.trim();
    var destination = $("#destinationInput").val.trim();
    var firstTrain = moment($("#timeInput").val.trim(), "HH:mm").format("");
    var frequency = $("#frequencyInput").val.trim();
 
    //creates local holder for train
    var newTrains ={
        name : trainName,
        tdestination : destination,
        tFirst: firstTrain,
        tfreq: frequency,
    }

//upload data to database
database.ref().push(newTrains);
// log everything to see console
console.log(newTrains.name);
console.log(tdestination.destination);
console.log(tFirst.firstTrain);
console.log(tfreq.frequency);

alert("train sucessfully added");

//clears all of the text boxes
$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#timeInput").val("");
$("#frequencyInput").val("");

return false;
});

//when a new item is added (child) do this function
database.ref().on("child_added",function(childSnapshot,prevChildkey){
    //console.log(chalidSnapshot.val());
    //store everything into a variable
    var trainName=childSnapshot.val().name;
    var destination=childSnapshot.val().tdestination;
    var firstTrain=childSnapshot.val().tFirst;
    var frequency=childSnapshot.val().tfreq;

  //train info
	// console.log(trainName);
	// console.log(destination);
	// console.log(firstTrain);
	// console.log(frequency);

	//convert first time (push back 1 year to make sure it comes before current time)
	var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
	// console.log(firstTrainConverted);

	//current time
	var currentTime = moment();
	// console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	//difference between the times
	var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
	// console.log("DIFFERENCE IN TIME: " + diffTime);

	//time apart (remainder)
	var tRemainder = diffTime % frequency;
	// console.log(tRemainder);

	//minute until train
	var tMinutesTillTrain = frequency - tRemainder;
	// console.log("MINUTES TIL TRAIN: " + tMinutesTillTrain);

	//next train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format("hh:mm a");
	// console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

	//add each trains data into the table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every " + frequency + " minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});




    

