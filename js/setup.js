let importData;
let playerNames = new Set();

function setup() {
    $("#slImportButton").click(function () {
        $("#slImport").trigger("click");
    });
    $("#slSearchSongName").on("input", function (event) {
        searchSongName($(this).val());
    });
    $("#slSearchArtist").on("input", function (event) {
        searchArtist($(this).val());
    });
    $("#slSearchAnime").on("input", function (event) {
        searchAnime($(this).val());
    });
    $(".filterCheckbox").click(function () {
        if ($(this).hasClass("unchecked")) {
            $(this).removeClass("unchecked");
        }
        else {
            $(this).addClass("unchecked");
        }
        updateTypes();
        updateTableGuesses($("#slPlayerName").val());
    });
    $("#slAnimeTitleSelect").on("change", function () {
        if ($(this).val() === "english") {
            $(".animeNameEnglish").show();
            $(".animeNameRomaji").hide();
        }
        else {
            $(".animeNameEnglish").hide();
            $(".animeNameRomaji").show();
        }
    });
    $("#slPlayerName").on("input", function () {
        updateScoreboardHighlight($(this).val());
        updateTableGuesses($(this).val());
    });
    $("#slImport").on("change", function () {
        let file = $(this).get(0).files[0];
        if (!file) {
            alert("Please select a file");
        }
        else {
            let reader = new FileReader();
            reader.onload = function () {
                try {
                    importData = JSON.parse(reader.result);
                    $("#slInfo").hide();
                    $("#slScoreboard").hide();
                    loadData();
                    searchAnime($("#slSearchAnime").val());
                    searchArtist($("#slSearchArtist").val());
                    searchSongName($("#slSearchSongName").val());
                    updateTypes();
                }
                catch (e) {
                    if (e instanceof SyntaxError) {
                        alert(e.name + ": " + e.message);
                    }
                    if (e instanceof ReferenceError) {
                        alert(e.name + ": " + e.message);
                    }
                }
                
            }
            reader.readAsText(file);
        }
    });
}