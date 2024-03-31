$(document).ready(function () {

    // On load, show home content
    $(".content-section").hide();
    $("#home").show();
    // Show the resources dropdown on load
    $("#resourcesToggler").dropdown('show', { autoClose: false });

    // Navigations
    $("#navHome").click(function () {
        showContent("home");
    });
    $("#navLibrary").click(function () {
        showContent("library");
    });
    $("#navMarketplace").click(function () {
        showContent("marketplace");
    });
    $("#navSettings").click(function () {
        showContent("settings");
    });

    // Load player
    let player = new Player();

    // TODO Load from save

    // Auto generation, tick speed 1 second
    setInterval(function () {
        if (player.thought.thoughtAutomator > 0) {
            player.thought.thoughtGainedPerSecond = player.thought.thoughtAutomator * player.thought.thoughtMultiplier;
            player.thought.thoughts += player.thought.thoughtGainedPerSecond;
        }
        if (player.word.wordAutomator > 0) {
            player.word.wordGainedPerSecond = player.word.wordAutomator * player.word.wordMultiplier;
            player.word.words += player.word.wordGainedPerSecond;
            wordEmpowerThoughts();
        }
        updateInventory();
    }, 1000);

    // Thought generation
    $("#generateThoughts").click(function () {
        player.thought.thoughts++;
        updateInventory();
    });

    $("#thoughtAutomator").click(function () {
        if (player.thought.thoughts >= player.thought.thoughtAutomatorPrice) {
            player.thought.thoughts -= player.thought.thoughtAutomatorPrice;
            player.thought.thoughtAutomator++;
            updateInventory();
            player.thought.thoughtAutomatorPrice = increasePrice(player.thought.thoughtAutomatorPrice, 1.05, player.thought.thoughtAutomator);
            player.thought.thoughtAutomatorPrice = roundDown(player.thought.thoughtAutomatorPrice);
            $("#thoughtAutomator").html("Thinkers (" + player.thought.thoughtAutomatorPrice + " Thoughts)"); // Update price
            $("#thoughtsAutomatorCounterBottom").show();
            $("#thoughtsAutomatorCounterBottom").html("Thinkers: " + player.thought.thoughtAutomator);
        }
    });

    $("#wordUnlock").click(function () {
        if (player.thought.thoughts >= 10) { // Temporary price
            player.thought.thoughts -= 0; //TEMPORARY
            $("#wordMenu").show();
            player.word.wordAutomator++;
            updateInventory();
            ($("#wordUnlock").hide());
            ($("#wordsCounterBottom")).show();
        }
    });

    // Function for showing content
    function showContent(id) {
        $(".content-section").hide();
        $("#" + id).show();
    }

    function updateInventory() {
        $("#money").html("Money: $" + player.inventory.money.toFixed(2));
        $("#thoughtsCounter").html("Thoughts: " + player.thought.thoughts.toFixed(2));
        $("#thoughtsCounterBottom").html("Thoughts: " + player.thought.thoughts.toFixed(2));
        $("#thoughtsAutomatorCounterBottom").html("Thinkers: " + player.thought.thoughtAutomator);
        $("#wordsCounter").html("Words: " + player.word.words);
        $("#wordsCounterBottom").html("Words: " + player.word.words);
        $("#sentences").html("Sentences: " + player.sentence.sentences);
        $("#paragraphs").html("Paragraphs: " + player.paragraph.paragraphs);
        $("#pages").html("Pages: " + player.page.pages);
        $("#chapters").html("Chapters: " + player.chapter.chapters);
        $("#novels").html("Novels: " + player.novel.novels);
    }

    function wordEmpowerThoughts() {
        player.thought.thoughtMultiplier = 1 + player.word.wordLogMultiplier * Math.log(player.word.words);
        $("#wordsEmpowerThoughts").html("Words empower thoughts: " + player.thought.thoughtMultiplier.toFixed(2) + "x");
    }


    function increasePrice(price, exponent, count) {
        total = price * Math.pow(exponent, count);
        return total;
    }

    function roundDown(number) {
        return Math.floor(number);
    }
});