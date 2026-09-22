const gamesContainer =
    document.getElementById("gamesContainer");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const genreSelect =
    document.getElementById("genreSelect");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("errorMessage");

const errorText =
    document.getElementById("errorText");

const emptyMessage =
    document.getElementById("emptyMessage");

const resultsTitle =
    document.getElementById("resultsTitle");

const gameCount =
    document.getElementById("gameCount");



/* LOAD GAMES WHEN PAGE OPENS */

loadGames();



/* SEARCH BUTTON */

searchButton.addEventListener(
    "click",
    searchGames
);



/* ENTER KEY */

searchInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            searchGames();

        }

    }
);



/* GENRE FILTER */

genreSelect.addEventListener(
    "change",
    function () {

        const genre =
            genreSelect.value;


        if (genre === "") {

            loadGames();

        } else {

            loadGamesByGenre(genre);

        }

    }
);




/* GET ALL GAMES */

async function loadGames() {

    showLoading();

    resultsTitle.textContent =
        "Free-to-Play Games";


    try {

        const response =
            await fetch(
                "https://www.freetogame.com/api/games"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load games."
            );

        }


        const games =
            await response.json();


        displayGames(games);


    } catch (error) {

        showError(
            error.message
        );

    }

}




/* SEARCH */

async function searchGames() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    if (searchTerm === "") {

        loadGames();

        return;

    }


    showLoading();

    resultsTitle.textContent =
        "Search Results";


    try {

        const response =
            await fetch(
                "https://www.freetogame.com/api/games"
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load games."
            );

        }


        const games =
            await response.json();


        const results =
            games.filter(
                function (game) {

                    return game.title
                        .toLowerCase()
                        .includes(
                            searchTerm
                        );

                }
            );


        displayGames(results);


    } catch (error) {

        showError(
            error.message
        );

    }

}




/* FILTER BY GENRE */

async function loadGamesByGenre(
    genre
) {

    showLoading();


    resultsTitle.textContent =
        "Genre: " +
        genre.toUpperCase();


    try {

        const response =
            await fetch(
                "https://www.freetogame.com/api/games?category=" +
                encodeURIComponent(genre)
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load games."
            );

        }


        const games =
            await response.json();


        displayGames(games);


    } catch (error) {

        showError(
            error.message
        );

    }

}




/* DISPLAY GAMES */

function displayGames(games) {

    hideMessages();

    gamesContainer.innerHTML = "";


    if (
        !games ||
        games.length === 0
    ) {

        emptyMessage
            .classList
            .remove("hidden");


        gameCount.textContent =
            "0 games";


        return;

    }


    gameCount.textContent =
        games.length +
        " games";


    /*
        Show only the first 40
        games so the page stays fast.
    */

    games
        .slice(0, 40)
        .forEach(
            function (game) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "game-card";


                card.innerHTML = `

                    <img
                        class="game-image"
                        src="${game.thumbnail}"
                        alt="${escapeHTML(game.title)}"
                        loading="lazy"
                    >

                    <div class="game-info">

                        <h3 class="game-title">
                            ${escapeHTML(game.title)}
                        </h3>


                        <div class="game-details">

                            <p>
                                🎮
                                <strong>
                                    Platform:
                                </strong>

                                ${escapeHTML(
                                    game.platform
                                )}
                            </p>


                            <p>
                                🎭
                                <strong>
                                    Genre:
                                </strong>

                                ${escapeHTML(
                                    game.genre
                                )}
                            </p>


                            <p>
                                🏢
                                <strong>
                                    Publisher:
                                </strong>

                                ${escapeHTML(
                                    game.publisher
                                )}
                            </p>


                            <p>
                                📅
                                <strong>
                                    Release:
                                </strong>

                                ${escapeHTML(
                                    game.release_date
                                )}
                            </p>

                        </div>

                    </div>

                `;


                gamesContainer.appendChild(
                    card
                );

            }
        );

}




/* LOADING */

function showLoading() {

    gamesContainer.innerHTML = "";

    loading
        .classList
        .remove("hidden");

    errorMessage
        .classList
        .add("hidden");

    emptyMessage
        .classList
        .add("hidden");

    gameCount.textContent = "";

}




/* HIDE MESSAGES */

function hideMessages() {

    loading
        .classList
        .add("hidden");

    errorMessage
        .classList
        .add("hidden");

    emptyMessage
        .classList
        .add("hidden");

}




/* ERROR */

function showError(message) {

    gamesContainer.innerHTML = "";

    loading
        .classList
        .add("hidden");

    emptyMessage
        .classList
        .add("hidden");

    errorMessage
        .classList
        .remove("hidden");

    errorText.textContent =
        message;

    gameCount.textContent = "";

}




/* HTML ESCAPE */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}