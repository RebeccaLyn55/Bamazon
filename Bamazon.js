
//Variables for dependencies
var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');

var totalPrice = 0;
var productArray = [];

//Create connection variable to connect to MySql database 'bamazon'
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

//Call function to print inventory from MySql database
printInventory();

//Function to print inventory from MySql database (push records into an array)
function printInventory(){
var bamazonQuery = connection.query("SELECT * FROM products", function (err, res) {
  if (err) throw err;
    for (var i=0; i<res.length; i++){
      console.log('\n');
      productArray.push(res[i].product_id, res[i].product, res[i].department, res[i].price, res[i].quantity);
      console.log("ID: " + res[i].product_id + " / Product: " + res[i].product + " / Department: " + res[i].department + " / Price: " + res[i].price+ " / Quantity: " + res[i].quantity); 
    }
      promptForProduct();
  });
};

//Function to initiate npm package inquirer to prompt user on what they would like to buy
function promptForProduct(){
  inquirer.prompt([
        {
            type: "input",
            message: colors.magenta("What is the name of the item you would like to buy?"),
            name: "product"
        },

           {
            type: "input",
            message: colors.magenta("How many would you like to buy?"),
            name: "quantity"
        }

      ]).
    //After user enters input...
    then(function(answer){
      // Query the database for items...
      connection.query('SELECT * from products WHERE product=?', [answer.product], function(err,res) {
        //If item not in the database...
        if (res.length === 0) {
          //Inform the user that this isn't in inventory and prompt them to shop again
          console.log(colors.red(answer.product + " is not in the inventory!"));
          printInventory();
        } else {
          //Update quantity in stock and update the database
          var product = answer.product;
          var updatedQuantity = res[0].quantity - answer.quantity;
            //If enough in database, the user can get the item
            if (updatedQuantity >= 0) {
              console.log(colors.green('You can get this item!'));
              //Update the user's total price
              totalPrice += answer.quantity*res[0].price;
              console.log(colors.cyan("Your total price is: $" + totalPrice));
              //Update quanity in database and prompt the user to shop
              connection.query('UPDATE products SET ? WHERE product = ?', [{quantity: updatedQuantity}, product]);
              printInventory();
            //If not enough in stock, inform the user and prompt to shop
            }else{
              console.log(colors.red('There are no more left in stock'));
              //Do not change quantity
              var updatedQuantity=res[0].quantity;
              printInventory();
              }
            }
        });
    });
}
