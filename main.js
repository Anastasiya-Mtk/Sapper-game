const N=8;
const rows = N; 
const columns = N; 
const grid = Array.from({ length: rows }, () => Array(columns).fill(0));
const table = document.getElementById("grid");
let bombsPlaced = 0;
let  bombsCount = Math.ceil(N*N*0.25);


const placeBomb = () => {
    const randomRow = Math.floor(Math.random() * rows);
    const randomColumn = Math.floor(Math.random() * columns);

    if (grid[randomRow][randomColumn] !== '💣') {
        grid[randomRow][randomColumn] = '💣';
        bombsPlaced++;
    }
;
}


const placeAllBombs = () => {
    if (bombsPlaced < bombsCount) {
        placeBomb();
        placeAllBombs();
    }
;
}


placeAllBombs();



function countSurroundingBombs(grid, row, column) {
  const rows = grid.length;
  const columns = grid[0].length;

  const surroundingCells = [
    [row - 1, column - 1],
    [row - 1, column],
    [row - 1, column + 1],
    [row, column - 1],
    [row, column + 1],
    [row + 1, column - 1],
    [row + 1, column],
    [row + 1, column + 1],
  ];

  const validCells = surroundingCells.filter(([r, c]) => r >= 0 && r < rows && c >= 0 && c < columns);

  const bombCount = validCells.reduce((count, [r, c]) => {
    if (grid[r][c] === '💣') {
      return count + 1;
    }
    return count;
  }, 0);

  return bombCount;
}




  function countBombsInGrid(grid) {
    const rows1 = grid.length;
    const columns1 = grid[0].length;
    const bombGrid = [];

    for (let i = 0; i < rows1; i++) {
        bombGrid[i] = [];
        for (let j = 0; j < columns1; j++) {
            if (grid[i][j] !== '💣') {
                const surroundingBombs = countSurroundingBombs(grid, i, j);
                bombGrid[i][j] = surroundingBombs;
            } else {
                bombGrid[i][j] = '💣'; 
            }
        }
    }

    return bombGrid;
}


const bombCountGrid = countBombsInGrid(grid);
console.log(bombCountGrid);


function cellMouseEnterHandler() {
    this.style.cursor = 'pointer';
}
const cellValues = {};
let tableBlocked = false; 
let flagsDone=0;
let numbersDone=0;
let countingFlags=0;


function checkGameStatus(){
  if(flagsDone===1&&numbersDone===1){ 
    document.getElementById('game_over').innerHTML = "Вы выиграли!";
    tableBlocked = true;
  }
}


function toggleFlag(event) {
  if (tableBlocked) {
    return; 
  }
  event.preventDefault(); 
  const cell = event.target;

  if (cell.classList.contains('hidden-cell')) {
    cellValues[cell.id] = cell.textContent; 
    cell.textContent = "🚩"; 
    countingFlags++;
    cell.classList.remove('hidden-cell');
  } else {
    cell.textContent = cellValues[cell.id]; 
    cell.classList.add('hidden-cell');
    countingFlags--;
    delete cellValues[cell.id]; 
    
  }
const cells = document.getElementsByTagName('td'); 
const cellValuess = [];
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  const value = cell.textContent;
  cellValuess.push(value);
}
const bombCells = cellValuess.filter(value => value === "💣");
const flaggedCells = cellValuess.filter(value => value === "🚩");
if(bombCells.length===0 && flaggedCells.length=== bombsCount )
{
  flagsDone=1;
}
checkGameStatus();
}
  

function openZeroCells(grid, row, column) {
  const rows = grid.length;
  const columns = grid[0].length;
  const cell = getCell(row, column); 
  
  const neighbors = [];
  
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = column - 1; j <= column + 1; j++) {
      if (
        i >= 0 &&
        i < rows &&
        j >= 0 &&
        j < columns &&
        (i !== row || j !== column) 
      ) {
        const neighborCell = getCell(i, j);
        neighbors.push(neighborCell); 
      }
    }
  }
  
  neighbors.forEach(neighbor => {
    if (neighbor && neighbor.classList.contains('hidden-cell')) {
      neighbor.classList.remove('hidden-cell'); 
      const neighborRow = parseInt(neighbor.dataset.row);
      const neighborColumn = parseInt(neighbor.dataset.column);
      
      const neighborValue = parseInt(neighbor.textContent);
      if ( neighborValue=== 1) {
        neighbor.style.color = 'green';
      } else if ( neighborValue === 2) {
        neighbor.style.color = 'blue';
      } else if ( neighborValue === 3) {
        neighbor.style.color = 'red';
      } else if ( neighborValue=== 4) {
        neighbor.style.color = '#8B0000';
      }
      if (neighborValue === 0) {
        openZeroCells(grid, neighborRow, neighborColumn); 
      }
    }
  });
  
  if (cell && cell.classList.contains('hidden-cell')) {
    cell.classList.remove('hidden-cell'); 
  }
}

function getCell(row, column) {
  const table = document.getElementById('grid'); 
  return table.rows[row].cells[column];
}


function changeElementsClass(event, rowIndex, columnIndex) {
  const cell = event.target;
  if (tableBlocked) {
    return; 
  }

  if (cell.classList.contains('clicked')) {
    return; 
  }
  cell.classList.add('clicked'); 
  if (cell.classList.contains('hidden-cell')) {
    const cells = document.getElementsByTagName('td'); 
    const table = document.getElementById('grid'); 
    const numCols = table.rows[0].cells.length;
    const targetCell = cells[rowIndex * numCols + columnIndex]; 
    targetCell.classList.toggle('hidden-cell');
    const cellValuess = Array.from(cells)
    .filter(cell => !cell.classList.contains('hidden-cell'))
    .map(cell => cell.textContent);
    const remainingCells = cellValuess.filter(value => value !== "💣" && value !== "🚩" );
    if (remainingCells.length === Math.floor(N*N*0.75)) {
      numbersDone=1;
    }
  }
  if (cell.textContent === "1") {
    cell.style.color = 'green';
  } else if (cell.textContent === "2") {
    cell.style.color = 'blue';
  } else if (cell.textContent === "3") {
    cell.style.color = 'red';
  } else if (cell.textContent === "4") {
    cell.style.color = '#8B0000';
  } else if (cell.textContent === "0") {
      openZeroCells(bombCountGrid, rowIndex, columnIndex);
  } else if (cell.textContent === "💣") {
    const cells = document.getElementsByTagName('td'); 
    const cellsWithValueBomb = Array.from(cells).filter(cell => cell.textContent === "💣");
    cellsWithValueBomb.forEach(cell => cell.classList.remove('hidden-cell'));
    tableBlocked = true; 
    document.getElementById('game_over').innerHTML = "Вы проиграли!";
  }
  checkGameStatus();
}

  bombCountGrid.forEach((rowArray, rowIndex) => {
    const row = document.createElement("tr");
  
    rowArray.forEach((cellValue, columnIndex) => {
      const cell = document.createElement("td");
      cell.dataset.row = rowIndex; 
      cell.dataset.column = columnIndex;
      cell.textContent = cellValue;
      cell.classList.add('hidden-cell');
      cell.addEventListener('click', (event) => changeElementsClass(event, rowIndex, columnIndex));
      cell.addEventListener('contextmenu', toggleFlag);
      cell.addEventListener('mouseenter', cellMouseEnterHandler);
      row.appendChild(cell);
    });
  
    table.appendChild(row);
  });
  
  function reloadPage() {
    location.reload();
}