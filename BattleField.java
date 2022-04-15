/**
 * Write a method that takes a field for well-known board game "Battleship" as an argument and returns true if it has a valid disposition of ships, 
 * false otherwise. 
 * Argument is guaranteed to be 10*10 two-dimension array. Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.
 * Battleship (also Battleships or Sea Battle) is a guessing game for two players. 
 * 
 * Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targetting individual cells on his field. 
 * The ship occupies one or more cells in the grid. Size and number of ships may differ from version to version. 
 * In this kata we will use Soviet/Russian version of the game.
 * 
 * Before the game begins, players set up the board and place the ships accordingly to the following rules:
 * There must be single battleship (size of 4 cells), 2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1). 
 * Any additional ships are not allowed, as well as missing ships.
 * Each ship must be a straight line, except for submarines, which are just single cell.
 * The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.
 */

import java.util.ArrayList;

public class BattleField {

    private static int[][] battleField = {  {1, 0, 0, 0, 0, 1, 1, 0, 0, 0},
                                            {1, 0, 1, 0, 0, 0, 0, 0, 1, 0},
                                            {1, 0, 1, 0, 1, 1, 1, 0, 1, 0},
                                            {1, 0, 0, 0, 0, 0, 0, 0, 0, 0},
                                            {0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
                                            {0, 0, 0, 0, 1, 1, 1, 0, 0, 0},
                                            {0, 0, 0, 0, 0, 0, 0, 0, 1, 0},
                                            {0, 0, 0, 1, 0, 0, 0, 0, 0, 0},
                                            {0, 0, 0, 0, 0, 0, 0, 1, 0, 0},
                                            {0, 0, 0, 0, 0, 0, 0, 0, 0, 0}};
    
                                        
    public static void main(String[] args){
        System.out.println("Is the BattleField Valid?  " + (BattleField.fieldValidator(battleField) ? "Yes" : "No"));
    }
                                        
    public static boolean fieldValidator(int[][] field) {
        // Check for any odd shaped ships or ships touching at the corners
        for (int i = 0; i < field.length; i++) {
            for (int j = 0; j < field.length; j++) {
                if (field[i][j] == 1){
                    int topValue = i - 1 >= 0 ? field[i - 1][j] : 0;
                    int bottomValue = i + 1 < field.length ? field[i + 1][j] : 0;
                    int rightValue = j + 1 < field.length ? field[i][j + 1] : 0;
                    int leftValue = j - 1 >= 0 ? field[i][j - 1] : 0;
                    int topLeftValue = i - 1 >= 0 && j - 1 >= 0 ? field[i - 1][j - 1] : 0;
                    int topRightValue = i - 1 >= 0 && j + 1 < field.length ? field[i - 1][j + 1] : 0;
                    int bottomLeftValue = i + 1 < field.length && j - 1 >= 0 ? field[i + 1][j - 1] : 0;
                    int bottomRightValue = i + 1 < field.length && j + 1 < field.length ? field[i + 1][j + 1] : 0;

                    // Check if a 1 has other 1s at either its left/right or above/below at the same time which would 
                    // indicate a weird shape, as 1s can only be at a 1s left/right or above/below not both at the
                    // same time.
                    if ((topValue + bottomValue) > 0 && (rightValue + leftValue) > 0)
                        return false;
                    // Check if a 1 has other 1s touching it from a corner
                    if (topLeftValue == 1 || topRightValue == 1 || bottomLeftValue == 1 || bottomRightValue == 1)
                        return false;
                }
            }
        }

        ArrayList<Integer> ships = new ArrayList<>();
        int numberOfBattleships = 0;
        int numberOfCruisers = 0;
        int numberOfDestroyers = 0;
        int numberOfSubmarines = 0;
        for (int i = 0; i < field.length; i++){
            for (int j = 0; j < field.length; j++){
                if (field[i][j] == 1){
                    // Since the corners and edges of the field have values below that will have indices that are out of bounds
                    // in the case that the index is out of bounds a 0 will be inserted in it's place, this allows the program
                    // to continue without index of bounds exceptions.
                    int topValue = i - 1 >= 0 ? field[i - 1][j]: 0;
                    int rightValue = j + 1 < field.length ? field[i][j + 1]: 0;
                    int bottomValue = i + 1 < field.length ? field[i + 1][j]: 0;
                    int leftValue = j - 1 >= 0 ? field[i][j - 1]: 0;
                    
                    // nextCell used to hold the next of the next cell
                    int nextCell = 0;
                    if (topValue == 1) nextCell = i - 1;
                    if (bottomValue == 1) nextCell = i + 1;
                    if (leftValue == 1) nextCell = j - 1;
                    if (rightValue == 1) nextCell = j + 1;
                    
                    // cellMover used to increment or decrement the index to get the next cell
                    int cellMover = 0;
                    if (topValue == 1 || leftValue == 1) cellMover = -1;
                    if (bottomValue == 1 || rightValue == 1) cellMover = 1;
                    
                    int nextCellValue = 0;
                    if (topValue == 1 || bottomValue == 1) nextCellValue = field[nextCell][j];
                    if (leftValue == 1 || rightValue == 1) nextCellValue = field[i][nextCell];
                    
                    int numberOfOnes = 1;
                    while (nextCell >= 0 && nextCell < field.length && nextCellValue == 1){
                        numberOfOnes++;
                        // Turn 1s to 0s so that the ship is not counted again, the next time the loop encounters
                        // another 1 that is part of the ship.
                        if (topValue == 1 || bottomValue == 1) field[nextCell][j] = 0;
                        if (leftValue == 1 || rightValue == 1) field[i][nextCell] = 0;
                        // Keep cell indices within valid range of 0 to (array.length - 1)
                        if ((nextCell + cellMover) >= 0 && (nextCell + cellMover) < field.length) nextCell += cellMover;
                        else break;
                        // Set the value of the next cell so loop can check if it equals 1
                        if (topValue == 1 || bottomValue == 1) nextCellValue = field[nextCell][j];
                        if (leftValue == 1 || rightValue == 1) nextCellValue = field[i][nextCell];
                    }

                    ships.add(numberOfOnes);
                }
            }
        }
        // Ensure that the board contains 10 ships and ensure that the ships on the board are the correct amount of ships
        // for each type of ship, so that there is 1 battleship, 2 cruisers, 3 destroyers and 4 submarines.
        if (ships.size() > 10 || ships.size() < 10) return false;
        else {
            for (Integer ship : ships) {
                if (ship == 4) numberOfBattleships++;
                if (ship == 3) numberOfCruisers++;
                if (ship == 2) numberOfDestroyers++;
                if (ship == 1) numberOfSubmarines++;
            }
            if (numberOfBattleships > 1 || numberOfCruisers > 2 || numberOfDestroyers > 3 || numberOfSubmarines > 4) return false;
        }

        return true;
    }


}



