import * as readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log("\nWelcome to selection process schedule!");
  console.log("Please, select a command:");
  console.log("1 - Show schedule");
  console.log("2 - Show events");
  console.log("3 - Show dependencies");
  console.log("4 - Create an event");
  console.log("5 - Create a dependency");
  console.log("6 - Import default events and dependencies");
  console.log("7 - Exit");
}

function handleInput() {
  rl.question('Enter your choice: ', (answer) => {
    const choice = parseInt(answer.trim(), 10);

    if (isNaN(choice)) {
      console.log("Invalid input. Please enter a number.");
      showMenu();
      handleInput();
      return;
    }

    if (choice === 7) {
      console.log("Exiting...");
      rl.close();
      return;
    }

    if (choice >= 1 && choice <= 6) {
      console.log(`You selected option ${choice}`);
      showMenu();
      handleInput();
    } else {
      console.log("Invalid option. Please select a number between 1 and 7.");
      showMenu();
      handleInput();
    }
  });
}

showMenu();
handleInput();
