/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  // first add all the rotten oranges in queue
  let m = grid.length; //rows
  let n = grid[0].length; //columns

  let queue = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      //i will basically push indices
      //in queue in form of array
      if (grid[i][j] === 2) {
        queue.push([i, j, 0]);
      }
    }
  }

  let maxMinutes = 0;

  // mark adjacent nodes as rotten and push in
  // queue till queue is not empty
  while (queue.length !== 0) {
    console.log(grid[0]);
    console.log(grid[1]);
    console.log(grid[2]);
    console.log("------------------");
    //first I will get 1 element out of Queue
    let [x, y, min] = queue.shift();

    //left
    if (y > 0 && grid[x][y - 1] === 1) {
      grid[x][y - 1] = 2;
      queue.push([x, y - 1, min + 1]);
    }
    //right
    if (y < n - 1 && grid[x][y + 1] === 1) {
      grid[x][y + 1] = 2;
      queue.push([x, y + 1, min + 1]);
    }
    //top
    if (x > 0 && grid[x - 1][y] === 1) {
      grid[x - 1][y] = 2;
      queue.push([x - 1, y, min + 1]);
    }
    //bottom
    if (x < m - 1 && grid[x + 1][y] === 1) {
      grid[x + 1][y] = 2;
      queue.push([x + 1, y, min + 1]);
    }
    maxMinutes = Math.max(min, maxMinutes);
  }

  // finally run over each element and check if any fresh is remaining
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        return -1;
      }
    }
  }

  return maxMinutes;
};
