//TJ Wangchuk
//03/06/26
//Deadly Desert Map
//Extra: counts and displays the total number of deadly spots on the map.

public class Main {
   public static void main(String[] args) {
       int[][] map = {
           {5, 1, 3, 1, 2, 4, 2, 1},
           {2, 4, 0, 3, 1, 4, 3, 2},
           {6, 1, 5, 2, 1, 5, 4, 1},
           {2, 3, 4, 1, 2, 2, 1, 0},
           {4, 1, 4, 2, 6, 4, 2, 3},
           {1, 3, 3, 3, 4, 1, 5, 2}
       };

       String[][] deadlyMap = new String[map.length][map[0].length];

       int deadlyCount = 0;
       for (int i = 1; i < map.length - 1; i++) {
           for (int j = 1; j < map[i].length - 1; j++) {
               int sum = map[i][j] + map[i - 1][j] + map[i + 1][j]
                       + map[i][j - 1] + map[i][j + 1];

               if (sum > 15) {
                   deadlyMap[i][j] = "D";
                   deadlyCount++;
               } else {
                   deadlyMap[i][j] = " ";
               }
           }
       }

       System.out.println("Original Map:");
       for (int i = 0; i < map.length; i++) {
           for (int j = 0; j < map[i].length; j++) {
               System.out.print(map[i][j] + " ");
           }
           System.out.println();
       }

       System.out.println("\nDeadly Desert Map:");
       for (int i = 0; i < deadlyMap.length; i++) {
           for (int j = 0; j < deadlyMap[i].length; j++) {
               if (deadlyMap[i][j] == null) {
                   System.out.print("  ");
               } else {
                   System.out.print(deadlyMap[i][j] + " ");
               }
           }
           System.out.println();
       }

       System.out.println("\nTotal deadly spots found: " + deadlyCount);
   }
}
