# Minesweeper Game

## Overview

The Minesweeper game is a classic puzzle game where the player uncovers a grid of cells while avoiding hidden bombs. The objective is to clear the grid without detonating any bombs, using numbers to indicate the count of surrounding bombs.

## Features

- A customizable grid size (default 8x8).
- Randomly placed bombs (25% of the grid).
- Display of surrounding bomb counts in each cell.
- Ability to flag cells as potential bombs.
- Win and lose conditions with appropriate messages.
- Color-coded numbers for easy identification of bomb counts.

## How to Play

1. Click on a cell to reveal it. If it contains a number, it indicates how many bombs are in the adjacent cells.
2. If you click on a bomb, the game is over, and all bombs will be revealed.
3. Right-click on a cell to place a flag, marking it as a suspected bomb.
4. Win the game by correctly flagging all bombs or revealing all safe cells.

## Technologies Used

- HTML
- CSS
- JavaScript

## Getting Started

1. Clone this repository to your local machine.
2. Open `index.html` in your web browser to start the game.

## How It Works

- The game initializes an 8x8 grid and randomly places bombs.
- The `countBombsInGrid` function calculates the number of adjacent bombs for each cell.
- User interactions are handled through event listeners for clicks and right-clicks to toggle flags.
- The game tracks the player's progress and displays win/loss messages.

## Contact

For any questions or suggestions, feel free to reach out via email at [matuk2006@gmail.com](mailto:matuk2006@gmail.com).
