#! /usr/bin/env node
import inquirer from 'inquirer';
console.log('Welcome to ATM Machine!');
let userBalance = Math.floor(Math.random() * 10000);
let myLoop = true;
while (myLoop) {
    const userInput = await inquirer.prompt([
        {
            type: "input",
            name: "UserPin",
            message: "Enter your pin!"
        }, {
            type: "list",
            name: "AccountType",
            message: "Select your account!",
            choices: ["Current Account", "Saving Account"]
        }, {
            type: "list",
            name: "TransactionType",
            message: "Select your transaction type!",
            choices: ["Fast Cash", "Cash Withdraw", "Balance Inquiry"]
        }, {
            type: "list",
            name: "amount",
            message: "Select the amount you want to withdraw!",
            choices: [1000, 1500, 2000, 3000, 5000, 8000, 10000],
            when(userInput) {
                return userInput.TransactionType === "Fast Cash";
            }
        }, {
            type: 'number',
            name: 'amount',
            message: "Enter your amount!",
            when(userInput) {
                return userInput.TransactionType === "Cash Withdraw";
            }
        }
    ]);
    const { UserPin, TransactionType, amount } = userInput;
    if (UserPin && TransactionType === "Balance Inquiry") {
        console.log(`Your current balance is Rs.${userBalance}`);
    }
    else if (UserPin) {
        if (userBalance > amount) {
            console.log(`Your acount has been debited with amount Rs.${amount}
 and your remaining balance is RS.${userBalance -= amount}`);
        }
        else {
            console.log("\nInsufficient Balance");
        }
    }
    // for more transactions
    let moreTransactions = await inquirer.prompt({
        type: 'confirm',
        name: 'more',
        message: "Do you want more transactions ?"
    });
    if (!moreTransactions.more) {
        myLoop = false;
        console.log("Thank You for using Rameez ATM Machine!");
    }
}
