$(document).ready(function() {
    // Initialilze game variables
    var money = 0; // Money
    var thoughts = 0; // Base Material
    var thoughtAutomator = 0; // Thought Automator
    var thoughtMultiplier = 1; // Thought Multiplier
    var thoughtAutomatorPrice = 20; // Thought Automator Price
    var thoughtGainedPerSecond = 0; // Thoughts gained per second
    var words = 0; // Words (formed from thoughts)
    var sentences = 0; // Sentences (formed from words)
    var paragraphs = 0; // Paragraphs (formed from sentences)
    var pages = 0; // Pages (formed from paragraphs)
    var chapters = 0; // Chapters (formed from pages)
    var novels = 0; // Novels (formed from chapters)

    // On load, show home content
    $(".content-section").hide();
    $("#home").show();
    // Show the resources dropdown on load
    $("#resourcesToggler").dropdown('show',{autoClose: false});
    
    // Navigations
    $("#navHome").click(function() {
        showContent("home");
    });
    $("#navLibrary").click(function() {
        showContent("library");
    });
    $("#navMarketplace").click(function() {
        showContent("marketplace");
    });
    $("#navSettings").click(function() {
        showContent("settings");
    });

    // Auto generation, tick speed 1 second
    setInterval(function() {
        if(thoughtAutomator > 0) {
            thoughtGainedPerSecond = thoughtAutomator * thoughtMultiplier;
            thoughts += thoughtGainedPerSecond;
        }
        updateInventory();
    },1000);

    // Thought generation
    $("#generateThoughts").click(function() {
        thoughts++;
        updateInventory();
    });

    $("#thoughtAutomator").click(function() {
        if (thoughts >= thoughtAutomatorPrice) {
            thoughts -= thoughtAutomatorPrice;
            thoughtAutomator++;
            updateInventory();
            thoughtAutomatorPrice = increasePrice(thoughtAutomatorPrice, 1.05, thoughtAutomator);
            thoughtAutomatorPrice = roundDown(thoughtAutomatorPrice);
            $("#thoughtAutomator").html("Thinkers (" + thoughtAutomatorPrice + " Thoughts)"); // Update price
            $("#thoughtAutomatorCounterBottom").show();
            $("#thoughtAutomatorCounterBottom").html("Thinkers: " + thoughtAutomator);
        }
    });

    // Function for showing content
    function showContent(id) {
        $(".content-section").hide();
        $("#" + id).show();
    }

    function updateInventory() {
        $("#money").html("Money: $" + money);
        $("#thoughtsCounter").html("Thoughts: " + thoughts);
        $("#thoughtsCounterBottom").html("Thoughts: " + thoughts);
        $("#thoughtAutomatorCounterBottom").html("Thinkers: " + thoughtAutomator);
        $("#words").html("Words: " + words);
        $("#sentences").html("Sentences: " + sentences);
        $("#paragraphs").html("Paragraphs: " + paragraphs);
        $("#pages").html("Pages: " + pages);
        $("#chapters").html("Chapters: " + chapters);
        $("#novels").html("Novels: " + novels);
    }
    
    function increasePrice(price, exponent, count) {
        total = price * Math.pow(exponent, count);
        return total;
    }

    function roundDown(number) {
        return Math.floor(number);
    }
});