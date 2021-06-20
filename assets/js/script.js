
var searchBarEl = document.querySelector(".search-bar");
var searchTextEl = document.querySelector(".search-text");
var SearchContentEl = document.querySelector(".search-content");

// searchBarEl.addEventListener("submit", )

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
        alert("Please enter a valid item");
        return;
    }
}

$(document).ready(function () {
    $(".search-bar").submit(
        searchSubmit
    )
});


$(document).ready(function () {
    $(".toggle").click(function () {
        $(".menu").toggle();
    });
});

var getRecipeInfo = function (data, searchTerm) {
    console.log("displaydata", data);
    console.log("searchTerm", searchTerm);

    //clear old content
    SearchContentEl.textContent = "";

    var contentContainerEl = document.createElement("div");
    contentContainerEl.addClass = "content-container";

    for (var i = 0; i < data.results.length; i++) {
        var recipeId = data.results[i].id;

        var apiUrlId = "https://api.spoonacular.com/recipes/" + recipeId + "/information?includeNutrition=false&apiKey=94d4edeeee9b4cbe9f524429cf3d4d96";

        fetch(apiUrlId)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log("nameid", data);

                        var anchorEl = document.createElement("a");
                        anchorEl.addClass = "redirect";
                        anchorEl.setAttribute("href", data.sourceUrl);

                        var imgEl = document.createElement("img");
                        imgEl.addClass = "recipe-img";
                        imgEl.setAttribute("src", data.image);
                        anchorEl.appendChild(imgEl);

                        var nameEl = document.createElement("h3");
                        nameEl.addClass = "recipe-name";
                        nameEl.textContent = data.title;
                        anchorEl.appendChild(nameEl);

                        contentContainerEl.appendChild(anchorEl);
                    })
                }
            })


    }
    SearchContentEl.appendChild(contentContainerEl);
}

//fetch data from sever
var getSearch = function (complex) {

    var apiUrl = 'https://api.spoonacular.com/recipes/complexSearch?query=' + complex + '&apiKey=94d4edeeee9b4cbe9f524429cf3d4d96';

    //make request to the url
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getRecipeInfo(data, complex);
                    var shouldSearch = true;
                    if (data.results.length === 0) {
                        shouldSearch = false;
                        alert("not valid");
                    }
                    if (shouldSearch) {
                        console.log("first data", data);
                    }
                })
            }
            else {
                alert("enter name");
                return;
            }
        })
}

// getSearch("Pasta");