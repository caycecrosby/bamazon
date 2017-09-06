var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"mysqlpass",
    database: "bamazon"
})



//Get required npm, and make connection to server.

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
//Starts the application using inquirer

var startBamazon = function(err){
    inquirer.prompt({
        name:"buyingSomething",
        type: "confirm",
        message:"Would you like to buy something from our stock today?"
    }).then(function(answer){
        if (answer.buyingSomething === true){
            console.log("Great")
            displayItems();
        }
    })
}

//Displays Choice options in inquirer by looping through all possible answers. 

var displayItems = function(err){
    connection.query("Select * FROM products", function(err,res){
        inquirer.prompt({
            name:"choice",
            type:"rawlist",
            choices: function(value){
                var choiceArray = [];
                    for (var i = 0; i<res.length;i++){
                    choiceArray.push(res[i].product_name);
            }
            return choiceArray;
        },
        message:"I'm glad you've chosen to purchase the"
        }).then(function(answer){
            for (var i=0; i<res.length; i++){
                if (res[i].product_name==answer.choice){
                    var chosenItem = res[i];
                    console.log(chosenItem.product_name)
                    console.log("That will be $"+ chosenItem.price+ " for 1!")
                    console.log("We currently have " + chosenItem.stock_quantity+ " available")
                    orderQuantity(chosenItem);
                    
                }          
            }
        })

        
    })
}

//Allows you to "purchase" and tells you how many we have / pricing. 
var buySomethingElse = function(err){
    inquirer.prompt({
        name:"buyingAgain",
        type: "confirm",
        message:"Would you like to buy something else from our stock today?"
    }).then(function(answer){
        if (answer.buyingAgain === true){
            console.log("Great")
            displayItems();
        } else{
            console.log("Have a wonderful day!")
            
        }
    })
}
//Allows you to pick the quantity and exactly what you want!
function orderQuantity(chosenItem) {
        inquirer.prompt({
            name: "quantity",
            type: "rawlist",
            message:"How many would you like?",
            choices: ['1','2','3','4','5']
        }).then(function(answer){
         var newQuantity = answer.quantity
         console.log("You would like to purchase " + newQuantity+"!")
            if(chosenItem.stock_quantity > newQuantity){
                inquirer.prompt({
                name:"processed",
                type:"confirm",
                message: "Are you sure you want to purchase " + newQuantity +
                chosenItem.product_name + " for $" + (chosenItem.price * newQuantity)
                    }).then(function(answer){

// Updates DB using query connection!
                    if (answer.processed === true){
                        console.log("You got it!")
                        connection.query("UPDATE products SET ? WHERE ?",[{
                        stock_quantity: chosenItem.stock_quantity - newQuantity},{product_name:chosenItem.product_name}],
                        function(err,res){console.log("It worked");
                        buySomethingElse();
                        })
                    }else {
                            buySomethingElse();
                    }})    
            }else{console.log("Sorry, we're out of stock!")
            buySomethingElse();
    
}       })
}

startBamazon();