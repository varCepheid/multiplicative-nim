import java.util.Scanner;

public class Test {
  final static int maxEntry = 13;
  final static int target = 10000;

  public static int calcEntry(int total, int target) {
    String printer = "current total: " + total + " target: " + target;
    int returner = 0;

    int lastTarget = (int) Math.ceil(target / (2.0 * maxEntry));
    printer += " lastTarget: " + lastTarget;
    if (total < lastTarget) {
      returner = calcEntry(total, lastTarget);
    }

    if (returner == 0) {
      int winThreshold = (int) Math.ceil(target * 1.0 / maxEntry);
      printer += " winThreshold: " + winThreshold;
      if (total >= winThreshold) {
        returner = Math.min(Math.floorDiv((target - 1) * 2, total), maxEntry);
      } else {
        returner = (int) Math.floor(Math.random() * (maxEntry - 1)) + 2;
      }
    }

    printer += " returning: " + returner;
    System.out.println(printer);
    return returner;
  }

  public static void main(String[] args) {
    int total = 1;
    int playerEntry, computerEntry;

    Scanner sc = new Scanner(System.in);

    while (true) {
      System.out.println("Enter a number between 2 and " + maxEntry + ".");
      playerEntry = sc.nextInt();
      total *= playerEntry;
      if (total >= target) {
        System.out.println("The total is now " + total + ", so you win!");
        break;
      }

      computerEntry = calcEntry(total, target);
      total *= computerEntry;
      System.out.println("The computer chose " + computerEntry + ". The total is " + total + ".");
      if (total >= target) {
        System.out.println("You lose!");
        break;
      }
    }

    sc.close();
  }
}