
var searchBarEl = document.querySelector(".search-bar");
var searchTextEl = document.querySelector(".search-text");
var SearchContentEl = document.querySelector(".search-content");

var searchSubmit = function (event) {
    event.preventDefault();

    //get value from input
    var complex = searchTextEl.value.trim();

    console.log("complex", complex);

    if (complex) {
        getSearch(complex);
        searchTextEl.value = "";
    }
    else {
        SearchContentEl.textContent = "";
        var notValid = document.createElement("h2");
        notValid.className = "not-valid";
        notValid.textContent = "Please Enter a Valid Item";
        SearchContentEl.appendChild(notValid);
        return;
    }
}

$(document).ready(function () {
  $(".search-bar").submit(searchSubmit);
});

// menu js jQuery when ready to apply
// $(document).ready(function () {
//   $(".toggle").click(function () {
//     $(".menu").toggle();
//   });
// });

var getRecipeInfo = function (data, searchTerm) {
  console.log("displaydata", data);
  console.log("searchTerm", searchTerm);

  //clear old content
  SearchContentEl.textContent = "";

  var contentContainerEl = document.createElement("div");
  contentContainerEl.className = "content-container";

  for (var i = 0; i < data.hits.length; i++) {
    var anchorEl = document.createElement("a");
    anchorEl.className = "redirect";
    anchorEl.setAttribute("href", data.hits[i].recipe.shareAs);

    var imgEl = document.createElement("img");
    imgEl.className = "recipe-img";
    imgEl.setAttribute("src", data.hits[i].recipe.image);
    anchorEl.appendChild(imgEl);

    var nameEl = document.createElement("h3");
    nameEl.className = "recipe-name";
    nameEl.textContent = data.hits[i].recipe.label;
    anchorEl.appendChild(nameEl);

    contentContainerEl.appendChild(anchorEl);
  }
  SearchContentEl.appendChild(contentContainerEl);
};

//fetch data from sever
var getSearch = function (complex) {
  var apiUrl =
    "https://api.edamam.com/api/recipes/v2?app_id=4a0156d2&app_key=" +
    "a8f96e8c7749c98cdb001aadb4c352cd" +
    "&type=public&q=" +
    complex;

  //make request to the url
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        getRecipeInfo(data, complex);
        var shouldSearch = true;
        if (data.hits.length === 0) {
          shouldSearch = false;
          var notValid = document.createElement("h2");
          notValid.className = "not-valid";
          notValid.textContent = "Not a Valid Entry";
          SearchContentEl.appendChild(notValid);
        }
        // if (shouldSearch) {
        //     console.log("first data", data);
        // }
      });
    }
  });
};

var apiUrlTwo =
  "https://api.spoonacular.com/recipes/random?number=1&tags=dinner&apiKey=94d4edeeee9b4cbe9f524429cf3d4d96";

fetch(apiUrlTwo).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      randomTitle = data.recipes[0].title;
      randomImage = data.recipes[0].image;
      randomLink = data.recipes[0].sourceUrl;

      $(".random").html(
        `<h1 class='title'>Random Recipe!</h1><h3>${randomTitle}</h3><a href='${randomLink}' target='_blank'><img src='${randomImage}'></img>`
      );
    });
  }
});

    var apiUrl = 'https://api.edamam.com/api/recipes/v2?app_id=4a0156d2&app_key=' + 'a8f96e8c7749c98cdb001aadb4c352cd' + '&type=public&q=' + complex;

    var healthEl = document.querySelector("select[class='health']").value;
    var cuisineEl = document.querySelector("select[class='cuisine']").value;

    if (healthEl && cuisineEl) {
        var newApiUrl = apiUrl + '&health=' + healthEl + '&cuisineType=' + cuisineEl;
        console.log("apiboth", newApiUrl);
    }
    else if (healthEl && !cuisineEl) {
        var newApiUrl = apiUrl + '&health=' + healthEl;
        console.log("apihealth", newApiUrl);
    }
    else if (!healthEl && cuisineEl) {
        var newApiUrl = apiUrl + '&cuisineType=' + cuisineEl;
        console.log("apicuisine", newApiUrl);
    }
    else {
        var newApiUrl = apiUrl;
        console.log("api", newApiUrl);
    }

    //make request to the url
    fetch(newApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getRecipeInfo(data, complex);
                    var shouldSearch = true;
                    if (data.hits.length === 0) {
                        shouldSearch = false;
                        var notValid = document.createElement("h2");
                        notValid.className = "not-valid";
                        notValid.textContent = "Not a Valid Entry";
                        SearchContentEl.appendChild(notValid);
                    }
                    // if (shouldSearch) {
                    //     console.log("first data", data);
                    // }
                })
            }


        })

var apiUrlTwo =
  "https://api.spoonacular.com/recipes/random?number=1&tags=dinner&apiKey=94d4edeeee9b4cbe9f524429cf3d4d96";

fetch(apiUrlTwo).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      randomTitle = data.recipes[0].title;
      randomImage = data.recipes[0].image;
      randomLink = data.recipes[0].sourceUrl;

      $(".random").html(
        `<h1 class='title'>Random Recipe!</h1><h3>${randomTitle}</h3><a href='${randomLink}' target='_blank'><img src='${randomImage}'></img>`
      );
    });

var getRecipeInfo = function (data, searchTerm) {
    console.log("displaydata", data);
    console.log("searchTerm", searchTerm);

    //clear old content
    SearchContentEl.textContent = "";

    var contentContainerEl = document.createElement("div");
    contentContainerEl.className = "content-container";

    for (var i = 0; i < data.hits.length; i++) {
        var anchorEl = document.createElement("a");
        anchorEl.className = "redirect";
        anchorEl.setAttribute("href", data.hits[i].recipe.shareAs);

        var imgEl = document.createElement("img");
        imgEl.className = "recipe-img";
        imgEl.setAttribute("src", data.hits[i].recipe.image);
        anchorEl.appendChild(imgEl);

        var nameEl = document.createElement("h3");
        nameEl.className = "recipe-name";
        nameEl.textContent = data.hits[i].recipe.label;
        anchorEl.appendChild(nameEl);

        contentContainerEl.appendChild(anchorEl);
    }
    SearchContentEl.appendChild(contentContainerEl);
}

// //fetch data from sever (might be dub. code//
// var getSearch = function (complex) {

//     var apiUrl = 'https://api.edamam.com/api/recipes/v2?app_id=4a0156d2&app_key=' + 'a8f96e8c7749c98cdb001aadb4c352cd' + '&type=public&q=' + complex;

//     //make request to the url
//     fetch(apiUrl)
//         .then(function (response) {
//             if (response.ok) {
//                 response.json().then(function (data) {
//                     getRecipeInfo(data, complex);
//                     var shouldSearch = true;
//                     if (data.hits.length === 0) {
//                         shouldSearch = false;
//                         var notValid = document.createElement("h2");
//                         notValid.className = "not-valid";
//                         notValid.textContent = "Not a Valid Entry";
//                         SearchContentEl.appendChild(notValid);
//                     }
//                     // if (shouldSearch) {
//                     //     console.log("first data", data);
//                     // }
//                 })
//             }


//         })
// }

