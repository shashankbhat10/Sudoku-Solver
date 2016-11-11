$(document).ready(function() {
    $(".grid-cell").on('click', function() {
        $(this).addClass("clicked");
        $(".grid-cell").not(this).each(function() {
            $(this).removeClass("clicked");
            if ($(this).html() == "") {
                $(this).removeClass("used");
                $(this).removeClass("selected");
            }
        });
        if ($(this).hasClass("used")) {
            $(this).removeClass("used");
            $(this).html("");
        } else {
            $(this).addClass("selected");
            $(this).addClass("used");
            $(document).keydown(function(event) {
                var number = event.which - 48;
                if (number >= 1 && number <= 9)
                    $(".selected").html(number);

                $(".selected").removeClass("selected");
            });
        }
    });
});



// Function to find an empty location on the grid

function emptyLocation(grid) {
    var rc = [-1, -1];

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col] == 0) {
                rc[0] = row;
                rc[1] = col;
                return rc;
            }
        }
    }
    return rc;
};


// Function to check if there is a row-wise collision.

function checkRow(grid, value, row, col) {
    for (var i = 0; i < 9; i++) {
        if (i != col && grid[row][i] == value) {
            return false;
        }
    }
    return true;
}


// Function to check if there is a column-wise collision.

function checkCol(grid, value, row, col) {
    for (var i = 0; i < 9; i++) {
        if (i != row && grid[i][col] == value) {
            return false;
        }
    }
    return true;
}



// Function to check if there is collision in the 3x3 block.

function checkSquare(grid, value, row, col) {
    var startRow = Math.floor(row / 3) * 3;
    var startCol = Math.floor(col / 3) * 3;

    for (var i = startRow; i < (startRow + 3); i++) {
        for (var j = startCol; j < (startCol + 3); j++) {
            if (i != row && j != col && grid[i][j] == value) {
                return false;
            }
        }
    }
    return true;
}



// Utility function to check for collision.

function noCollision(grid, row, col, no) {
    if (checkRow(grid, no, row, col) && checkCol(grid, no, row, col) && checkSquare(grid, no, row, col)) {
        return true;
    }
    return false;
}



// Backtracking algorithm to solve the given Sudoku.

function solveSudoku(grid) {
    rc = emptyLocation(grid);
    if (rc[0] == -1) {
        return grid;
    } else {
        var row = rc[0];
        var col = rc[1];

        for (var no = 1; no <= 9; no++) {
            if (noCollision(grid, row, col, no)) {
                grid[row][col] = no;

                if (solveSudoku(grid)) {
                    return true;
                }

                grid[row][col] = 0;
            }
        }
        return false;
    }
}



// Function to check if the user given Sudoku puzzle is solvable.

function isSolvable(grid) {
    var i = 0;
    var j = 0;
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            if (grid[i][j] != 0 && noCollision(grid, i, j, grid[i][j]) == false) {
                return false;
            }
        }
    }
    return true;
}



// Utility function which fills the grid with user input
// and checks if it is solvable, solves and calls function
// to display the grid.

function solveGridUtil() {
    var grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var i = 0;
    var j = 0;
    $(".grid-cell").each(function() {
        if ($(this).html() != "") {
            grid[i][j] = $(this).html();
        }
        j++;
        if (j == 9) {
            i++;
            j = 0;
        }
    });

    var status = isSolvable(grid);
    status = status.toString();
    $(".grid-cell").each(function() {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
        }
        $(this).removeClass("used");
        $(this).removeClass("selected");
    });

    if (status == "true") {
        solveSudoku(grid);
        grid = solveSudoku(grid);
    }
    displayGrid(grid, status);
}



// Function to display the solved grid.

function displayGrid(grid, status) {
    if (status == "true") {
        $("p.message").addClass("correctAns");
        $("p.message").text("Grid Solved");
        var i = 0;
        var j = 0;



        $(".grid-cell").each(function() {
            if ($(this).html() == "") {
                $(this).addClass("solved");
                $(this).html(grid[i][j]);
            }
            j++;
            if (j == 9) {
                i++;
                j = 0;
            }
        });
    } else {
        $("p.message").addClass("wrongAns");
        $("p.message").text("Grid Unsolvable");

        $(".grid-cell").each(function() {
            if ($(this).html() == "") {
                $(this).addClass("wrong");
            } else {
                $(this).addClass("wrong");
            }
        });
    }
};



// Function to clear the grid.

function clearGrid() {
    $(".grid-cell").each(function() {
        $(this).html("");
        $(this).removeClass("selected clicked used solved wrong");
    });
    $("p.message").removeClass("correctAns");
    $("p.message").removeClass("wrongAns");
    $("p.message").text("");
};
