$(document).ready(function() {
    var words = 0; // Base material
    var pens = 0; // Base material multiplier
    var money = 0; // Base currency
    var wordIncrement = 1; // Base increase of clicking write button
    var ghostWriterPlus = 0; // Auto writer
    var ghostWriterCost = 5; // Base cost of hiring ghost writer
    var ghostWriterExponent = 1.04; // Base exponent of ghost writer cost
    var pensPrice = 50; // Base price of pen
    var pensExponent = 2; // Base exponent of pen price
    var wordPrice = 1; // Base selling price of words
    var menu;

    setInterval(function(){
        words += ghostWriterPlus * (pens + 1); // Updates words based on ghost writer
        changeInventory(); // Updates inventory
        changeMarket(); // Updates market place
    }, 1000); // Updates every second

    // function whenever write button is clicked
    $("#write").click(function(){
        words += wordIncrement * (pens + 1);
        changeInventory(); // Updates inventory
        changeMarket(); // Updates market place
    });

    // Whenever visit market is clicked, call switch menu function
    $("#sidebarVisitMarket").click(function(){
        switchMenu("market");
    });

    // Whenever visit is clicked, call switch menu function
    $("#sidebarReturn").click(function(){
        switchMenu("main");
    });

    $("#ghostWriter").click(function(){
        if(money < ghostWriterCost){
            alert("You do not have enough money to hire a ghost writer.");
            return;
        }
        money -= ghostWriterCost;
        ghostWriterPlus += 1;
        increaseGhostWriterCost(); // Increase cost of ghost writer
        $("#ghostWriter").html("Hire [1] Ghost Writer ($" + Number(ghostWriterCost.toPrecision(3)) + ")"); // Update button text
        changeInventory(); // Updates inventory
        changeMarket(); // Updates market place
    });


    $("#buyPen").click(function(){
        if(money < pensPrice){
            alert("You do not have enough money to buy a pen.");
            return;
        }
        money -= pensPrice;
        pens += 1;
        increasePenCost(); // Increase cost of pen
        $("#buyPen").html("Buy [1] Pen ($" + Number(pensPrice.toPrecision(3)) + ")"); // Update button text
        changeInventory();
        changeMarket();
    });

    $("#sell1").click(function(){
        if(words < 1){
            alert("You do not have enough words to sell.");
            return;
        }
        words -= 1;
        money += wordPrice;
        changeInventory();
        changeMarket();
    });

    $("#sell10").click(function(){
        if(words < 10){
            alert("You do not have enough words to sell.");
            return;
        }
        words -= 10;
        money += 10 * wordPrice;
        changeInventory();
        changeMarket();
    });

    $("#sellAll").click(function(){
        money += words * wordPrice;
        words = 0;
        changeInventory();
        changeMarket();
    });


    // function to update inventory
    function changeInventory(){
        $("#money").html("Money: $" + money);

        // Updates sentence structure based on words written
        if(words == 1){
            $("#words").html("You have written " + words + " word."); 
        }else{
            $("#words").html("You have written " + words + " words.");
        }
        // Updates sentence structure based on pens owned
        if(pens == 1){
            $("#pens").html("You have " + pens + " pen."); 
        }else{
            $("#pens").html("You have " + pens + " pens.");
        }
    }

    function switchMenu(menu){
        $(".menus").children().css("display", "none");
        $("." + menu).css("display", "block");
        return menu;
    }

    // function to update market place
    function changeMarket() {
        // If player has enough words to sell, enable the buttons
        // otherwise, disable them and apply greyed-out styling
        if (words >= 1) {
            $("#sell10").prop('disabled', false).removeClass('disabled-button');
        } else {
            $("#sell10").prop('disabled', true).addClass('disabled-button');
        }
        if (words >= 10) {
            $("#sellAll").prop('disabled', false).removeClass('disabled-button');
        } else {
            $("#sellAll").prop('disabled', true).addClass('disabled-button');
        }
    }

    // Increase cost of ghost writer
    function increaseGhostWriterCost(){
        ghostWriterCost = 5 * Math.pow(ghostWriterExponent, ghostWriterPlus);
    }

    // Increase cost of pen
    function increasePenCost(){
        pensPrice = 50 * Math.pow(pensExponent, pens);
    }

});