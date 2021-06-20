
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

//fetch data from sever
var getSearch = function (complex) {

    var apiUrl = 'https://api.edamam.com/api/recipes/v2?app_id=4a0156d2&app_key=a8f96e8c7749c98cdb001aadb4c352cd&type=public&q=' + complex;

    //make request to the url
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getRecipeInfo(data, complex);
                    var shouldSearch = true;
                    if (data.hits.length === 0) {
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

getSearch("pasta");