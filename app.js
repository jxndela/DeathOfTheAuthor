$(document).ready(function() {
    var words = 0;
    var pens = 0;
    var money = 0;
    var wordIncrement = 1;
    var ghostWriterPlus = 0;
    var ghostWriterCost = 25;
    var pensPrice = 50;
    var wordPrice = 1;
    var menu; ///

    setInterval(function(){
        words += ghostWriterPlus;
        changeInventory(); // Updates inventory
        changeMarket(); // Updates market place
    }, 1000); // Updates every second

    // function whenever write button is clicked
    $("#write").click(function(){
        words += wordIncrement;
        changeInventory(); // Updates inventory
        changeMarket(); // Updates market place
    });

    $("#visit").click(function(){
        menu = switchMenu("market");
        changeMarket();
    });

    $("#return").click(function(){
        menu = switchMenu("main");
    });

    $("#ghostWriter").click(function(){
        if(money < ghostWriterCost){
            alert("You do not have enough money to hire a ghost writer.");
            return;
        }
        money -= ghostWriterCost;
        ghostWriterPlus += 1;
        changeInventory();
        changeMarket();
    });

    $("#buyPen").click(function(){
        if(money < pensPrice){
            alert("You do not have enough money to buy a pen.");
            return;
        }
        money -= pensPrice;
        pens += 1;
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

    function changeMarket(){
        // If player has enough words to sell, display the buttons
        if(words >= 1){
            $("#sell10").css("display", "block");
        }else{
            $("#sell10").css("display", "none");
        }
        if(words >= 10){
            $("#sellAll").css("display", "block");
        }else{
            $("#sellAll").css("display", "none");
        }
    }
});