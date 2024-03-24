$(document).ready(function() {
    // Initialilze game variables
    var money = 0; // Money
    var thoughts = 0; // Base Material
    var thoughtFragments = 0; // Progress for generating thoughts
    var synthesis = 0; // Synthesis (formed from thoughts)
    var subconscious = 0; // Thought production automation
    var subconsciousExecuted = false; // Check if subconcious thinking has been executed
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

    setInterval(function() {
        if(thoughtFragments >= 100) {
            thoughtFragments = 0; // Reset progress
            $("#thoughtsProgress").attr("aria-valuenow", thoughtFragments);
            $("#thoughtsProgress").css("width", "0%");
            thoughts+= 1 + synthesis; // Add thoughts
        } else{
            thoughtFragments += 10 * subconscious;
            $("#thoughtsProgress").attr("aria-valuenow", thoughtFragments);
            $("#thoughtsProgress").css("width", thoughtFragments + "%");
        }
        updateInventory();
    },1000);


    $("#generateThoughts").click(function() {
        // Check if progress is at 100
        if(thoughtFragments >= 100) {
            thoughtFragments = 0; // Reset progress
            $("#thoughtsProgress").attr("aria-valuenow", thoughtFragments);
            $("#thoughtsProgress").css("width", "0%");
            thoughts+= 1 + synthesis; // Add thoughts
        } else{
            thoughtFragments += 10
            $("#thoughtsProgress").attr("aria-valuenow", thoughtFragments);
            $("#thoughtsProgress").css("width", thoughtFragments + "%");
        }
        updateInventory();
    });

    $("#synthesizeThoughts").click(function() {
        // Success Case
        if(thoughts >= 5) {
            thoughts-= 5;
            synthesis++;
        }
        updateInventory();
    });

    $("#subconsciousThinking").click(function() {
        if (!subconsciousExecuted) {
            // Success Case
            if (thoughts >= 1) {
                thoughts -= 100;
                subconscious++;
                // Set the flag to true to indicate the action has been performed
                subconsciousExecuted = true;
                // Disable the button
                $(this).prop('disabled', true);
                $(this).html("Subconscious Thinking (Executed)");
            }
        }
        // Update the inventory regardless of whether the action was performed
        updateInventory();
    });

    // Function for showing content
    function showContent(id) {
        $(".content-section").hide();
        $("#" + id).show();
    }

    function updateInventory() {
        $("#money").html("Money: $" + money);
        $("#thoughts").html("Thoughts: " + thoughts);
        $("#words").html("Words: " + words);
        $("#sentences").html("Sentences: " + sentences);
        $("#paragraphs").html("Paragraphs: " + paragraphs);
        $("#pages").html("Pages: " + pages);
        $("#chapters").html("Chapters: " + chapters);
        $("#novels").html("Novels: " + novels);
    }
    
});