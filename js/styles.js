const employeeData = [];
var searchItems = [];

//Loop through the information provided by the API to format the needed information on the page
function createEmployee (arrayInfo, i) {
  const employeeDiv = document.createElement("div");
        employeeDiv.setAttribute("class", "employee");
        employeeDiv.setAttribute("data-indexNumber", i);
  const employeeImg = document.createElement("img");
        employeeImg.setAttribute("alt", arrayInfo[i].name);
        employeeImg.setAttribute("src", arrayInfo[i].img);
  const employeeInfo = document.createElement("div");
        employeeInfo.setAttribute("class", "employee-info");
  const employeeName = document.createElement("p");
        employeeName.setAttribute("class", "employee-name");
        employeeName.innerHTML = arrayInfo[i].name;
  const employeeEmail = document.createElement("p");
        employeeEmail.setAttribute("class", "employee-email");
        employeeEmail.innerHTML = arrayInfo[i].email;
  const employeeCity = document.createElement("p");
        employeeCity.setAttribute("class", "employee-city");
        employeeCity.innerHTML = arrayInfo[i].city;

  employeeInfo.appendChild(employeeName);
  employeeInfo.appendChild(employeeEmail);
  employeeInfo.appendChild(employeeCity);
  employeeDiv.appendChild(employeeImg);
  employeeDiv.appendChild(employeeInfo);
  document.getElementById('employeeGrid').appendChild(employeeDiv);
}

//Create the elemnets that build the overlay with the clicked employee's information and put on page.
function overlayEmployee (arrayInfo, i) {
  const overlayDiv = document.createElement("div");
        overlayDiv.setAttribute("class", "overlay");
  const overlayContentDiv = document.createElement("div");
        overlayContentDiv.setAttribute("class", "overlay-content");
  const overlayClose = document.createElement("a");
        overlayClose.setAttribute("class", "overlay-close");
        overlayClose.innerHTML = "X";
  const overlayPrev = document.createElement("a");
        overlayPrev.setAttribute("class", "overlay-previous");
        overlayPrev.innerHTML = "<";
  const overlayNext = document.createElement("a");
        overlayNext.setAttribute("class", "overlay-next");
        overlayNext.innerHTML = ">";
  const overlayImg = document.createElement("img");
        overlayImg.setAttribute("alt", arrayInfo[i].name);
        overlayImg.setAttribute("src", arrayInfo[i].img);
  const overlayName = document.createElement("p");
        overlayName.setAttribute("class", "overlay-name");
        overlayName.innerHTML = arrayInfo[i].name;
  const overlayUsername = document.createElement("p");
        overlayUsername.setAttribute("class", "overlay-username");
        overlayUsername.innerHTML = arrayInfo[i].username;
  const overlayEmail = document.createElement("p");
        overlayEmail.setAttribute("class", "overlay-email");
        overlayEmail.innerHTML = arrayInfo[i].email;
  const overlayHr = document.createElement("hr");
  const overlayCell = document.createElement("p");
        overlayCell.setAttribute("class", "overlay-cell");
        overlayCell.innerHTML = arrayInfo[i].cellNum;
  const overlayAddress = document.createElement("p");
        overlayAddress.setAttribute("class", "overlay-address");
        overlayAddress.innerHTML = arrayInfo[i].address;
  const overlayBirthday = document.createElement("p");
        overlayBirthday.setAttribute("class", "overlay-birthday");
        overlayBirthday.innerHTML = "Birthday: " + arrayInfo[i].birthday.substring(5, 7) + "/" +
                                    arrayInfo[i].birthday.substring(8, 10) + "/" +
                                    arrayInfo[i].birthday.substring(0, 4);

  overlayContentDiv.appendChild(overlayClose);
  overlayContentDiv.appendChild(overlayPrev);
  overlayContentDiv.appendChild(overlayNext);
  overlayContentDiv.appendChild(overlayImg);
  overlayContentDiv.appendChild(overlayName);
  overlayContentDiv.appendChild(overlayUsername);
  overlayContentDiv.appendChild(overlayEmail);
  overlayContentDiv.appendChild(overlayHr);
  overlayContentDiv.appendChild(overlayCell);
  overlayContentDiv.appendChild(overlayAddress);
  overlayContentDiv.appendChild(overlayBirthday);
  overlayDiv.appendChild(overlayContentDiv);
  document.querySelector("body").appendChild(overlayDiv);

}





function clickFunc (arrayInfo) {
  //when user clicks an employee
  $(".employee").on("click", function() {
    //get the idex of the employee clicked
    var itemClicked = this.getAttribute("data-indexNumber");
    overlayEmployee(arrayInfo, itemClicked);

    //remove overlay on click of close button
    $(".overlay-close").on("click", function() {
      $(".overlay").remove();
    });

    //modual navigation
    document.querySelector(".overlay-previous").addEventListener("click", function () {
      $(".overlay").remove();
      //if you are on the first item of the list
      if (itemClicked == 0){
        //get the total number of items on the list
        var lastItem = document.getElementById("employeeGrid").children.length - 1;
        //trigger a click on the last item
        document.querySelectorAll(".employee")[lastItem].click();
        //set itemClicked variable to current view
        itemClicked = document.querySelectorAll(".employee")[lastItem].previousElementSibling.getAttribute("data-indexNumber");
      } else {
        //select the previous employee and tigger click
        document.querySelectorAll(".employee")[itemClicked].previousElementSibling.click();
        //set itemClicked variable to current view
        itemClicked = document.querySelectorAll(".employee")[itemClicked].previousElementSibling.getAttribute("data-indexNumber");
      }
    });

    document.querySelector(".overlay-next").addEventListener("click", function () {
      $(".overlay").remove();
      //find out how many items are on the page
      var listItems = document.getElementById("employeeGrid").children.length - 1;
      //if you are on the last item of the list
      if (itemClicked == listItems){
        //trigger a click on the fisrt item
        document.querySelectorAll(".employee")[0].click();
        //set itemClicked variable to current view
        itemClicked = document.querySelectorAll(".employee")[0].nextElementSibling.getAttribute("data-indexNumber");
      } else {
        //trigger a click on the next employee item
        document.querySelectorAll(".employee")[itemClicked].nextElementSibling.click();
        //set itemClicked variable to current view
        itemClicked = document.querySelectorAll(".employee")[itemClicked].nextElementSibling.getAttribute("data-indexNumber");
      }
    });
  });
}

$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us',
  dataType: 'json',
  success: function(data) {

    //loop through the API and push needed information to the employeeData array
    for (var i = 0; i < data.results.length; i++) {
      var output = {};
      output.img = data.results[i].picture.large;
      output.name = data.results[i].name.first + " " +
                    data.results[i].name.last;
      output.email = data.results[i].email;
      output.city = data.results[i].location.city;
      employeeData.push(output);
      output.username = data.results[i].login.username;
      output.cellNum = data.results[i].cell;
      output.address = data.results[i].location.street + " " +
                       data.results[i].location.city + " " +
                       data.results[i].location.state + " " +
                       data.results[i].location.postcode;
     output.birthday = data.results[i].dob;
    }




    for (var i = 0; i < employeeData.length; i++) {
      createEmployee(employeeData, i);
    }


    //user search on keyup
    $("#searchInput").on("keyup", function() {
      var searchTerm = document.getElementById("searchInput").value;
      //remove matched class from previous searches
      // $(".employee").removeClass("searchMatch");
      //hide everyone
      $(".employee").remove();
      searchItems = [];

      //cycle through the name and usernames in the employeeData array
      for (var i = 0; i < employeeData.length; i++) {
        //if the search is in any part of the name or username
        if (employeeData[i].name.indexOf(searchTerm) !== -1 || employeeData[i].username.indexOf(searchTerm) !== -1) {
          //push that employee's info into the searchItems array
          searchItems.push(employeeData[i]);
        }
      }
      //cycle through the searchItems array
      for (var i = 0; i < searchItems.length; i++) {
        //create an employee on the page for each item in the array
        createEmployee(searchItems, i);
      }
      //enable the clickFunc on the searched list
      clickFunc(searchItems);
    });
  //enable the clickFunc on all the employees
  clickFunc(employeeData);

  } // END AJAX SUCCESS FUNCTION
}); //END AJAX
