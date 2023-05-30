# 2048 Game

This is a JavaScript implementation of the game 2048.

## How to Play

1. Open the game in your web browser.
2. Use the arrow keys (Up, Down, Left, Right) to move the tiles on the game board.
3. Tiles with the same number will merge when they collide.
4. The goal is to reach the 2048 tile by merging tiles and achieving the highest score possible.

## Features

- Responsive game board that adapts to different screen sizes.
- Dynamic grid size: The game board can be easily adjusted to different grid sizes.
- Difficulty levels: Choose from easy, medium, and hard difficulty levels that affect the probability of spawning a "4" tile.
- Score tracking: The game keeps track of your current score and the highest score achieved.
- Time tracking: The game records the time taken to reach the current high score.
- Bot player: There's a bot player option available that can play the game automatically.
- Game over modal: When the game is over, a modal displays the final score and the option to start a new game.

## Installation and Usage

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser.
3. Use the arrow keys to play the game.

## Development

The game is built using HTML, CSS, and JavaScript.

- `index.html`: Entry point of the game.
- `styles.css`: Contains the styling for the game board and elements.
- `index.js`: Implements the game logic and handles user input.
- `Grid.js`: Defines the Grid class that represents the game board and manages the cells and tiles.
- `Tile.js`: Defines the Tile class that represents a tile on the game board.
