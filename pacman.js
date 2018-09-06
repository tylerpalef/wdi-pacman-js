// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here
// inky

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

// blinky

var blinky = {
  menu_option: '2',
  name: 'Blnky',
  colour: 'cyan',
  character: 'Speedy',
  edible: false
};

// Pinky

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

// Clyde

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// ghost array
ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayPowerPellets();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
}

function displayPowerPellets() {
  console.log('\nPower-Pellets: ' + powerPellets)
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(q) Quit');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  for (var i = 0; i < ghosts.length; i++) {
    console.log('(' + (i+1) + ') ' + 'Eat ' + ghosts[i].name)
  }
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(key) {
  if (ghosts[key-1]) {
    if (ghosts[key-1].edible === false) {
      lives -= 1;
      console.log('\n' + ghosts[key-1].name + ' that has the colour ' + ghosts[key-1].colour + ' is not edible!');
    } else {
      score += 200;
      console.log('\nPac-Man ate ' + ghosts[key-1].name + ' and has become ' + ghosts[key-1].character + '!')
      ghosts[key-1].edible = false;
    }
  }
}

function checkGameOver() {
  if (lives < 0) {
    console.log('Pac-Man has no more lives');
    process.exit();
  }
}

function eatPowerPellet() {
  score += 50;
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
  }
  powerPellets -= 1;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
      eatGhost();
      console.log('You ate Inky')
      break;
    case'2':
      eatGhost();
      console.log('You ate Blinky')
      break;
    case '3':
      eatGhost();
      console.log('You ate Pinky')
      break;
    case '4':
      eatGhost();
      console.log('You ate Clyde')
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
