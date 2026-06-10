/**
 * Author: TJ Wangchuk
 * Date: 01/02/26
 * Portfolio project
 *
 * MCVTS Teacher Directory System
 *
 */

import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;

class Teacher {
    String name;
    String email;
    String room;

    public Teacher(String n, String e, String r) {
        name = n;
        email = e;
        room = r;
    }
}

public class Main {
    public static ArrayList<Teacher> loadTeacherData(String filename) {
        ArrayList<Teacher> teachers = new ArrayList<>();

        try {
            Scanner input = new Scanner(new File(filename));

            while (input.hasNextLine()) {
                String name = input.nextLine().trim();
                if (!input.hasNextLine()) break;

                String email = input.nextLine().trim();
                if (!input.hasNextLine()) break;

                String room = input.nextLine().trim();

                teachers.add(new Teacher(name, email, room));
            }

            input.close();
            System.out.println("Loaded " + teachers.size() + " teacher records.\n");

        } catch (FileNotFoundException e) {
            System.out.println("Error: File not found.");
            return null;
        }

        return teachers;
    }

    public static void displayMenu() {
        System.out.println("========================================");
        System.out.println("   MCVTS Teacher Directory System");
        System.out.println("========================================");
        System.out.println("1. Search by Teacher Name");
        System.out.println("2. Search by Room Number");
        System.out.println("3. List Teachers by Building");
        System.out.println("4. Exit");
        System.out.print("Enter your choice (1-4): ");
    }

    public static boolean searchByName(ArrayList<Teacher> teachers, String searchName) {
        for (Teacher t : teachers) {
            if (t.name.equalsIgnoreCase(searchName)) {
                System.out.println("\nName: " + t.name);
                System.out.println("Email: " + t.email);
                System.out.println("Room: " + t.room + "\n");
                return true;
            }
        }
        return false;
    }

    public static int searchByRoom(ArrayList<Teacher> teachers, String roomNumber) {
        int count = 0;
        System.out.println("\nTeachers in room " + roomNumber + ":");

        for (Teacher t : teachers) {
            if (t.room.equalsIgnoreCase(roomNumber)) {
                System.out.println("- " + t.name);
                count++;
            }
        }

        if (count == 0) {
            System.out.println("No teachers found.");
        }

        System.out.println("Total found: " + count + "\n");
        return count;
    }

    public static int listByBuilding(ArrayList<Teacher> teachers, String building) {
        int count = 0;
        System.out.println("\nTeachers in " + building + ":");

        for (Teacher t : teachers) {
            if (t.room.toLowerCase().contains(building.toLowerCase())) {
                System.out.println("- " + t.name + " (Room " + t.room + ")");
                count++;
            }
        }

        if (count > 0) {
            System.out.println("Total teachers: " + count + "\n");
        } else {
            System.out.println("No teachers found.\n");
        }

        return count;
    }

    public static void main(String[] args) {
        ArrayList<Teacher> teachers = loadTeacherData("data.txt");
        if (teachers == null) return;

        Scanner userInput = new Scanner(System.in);
        boolean running = true;

        while (running) {
            displayMenu();

            if (!userInput.hasNextInt()) {
                System.out.println("\nInvalid input.\n");
                userInput.nextLine();
                continue;
            }

            int choice = userInput.nextInt();
            userInput.nextLine();

            switch (choice) {
                case 1:
                    System.out.print("\nEnter teacher's full name: ");
                    if (!searchByName(teachers, userInput.nextLine())) {
                        System.out.println("\nTeacher not found.\n");
                    }
                    break;

                case 2:
                    System.out.print("\nEnter room number: ");
                    searchByRoom(teachers, userInput.nextLine());
                    break;

                case 3:
                    System.out.print("\nEnter building name: ");
                    listByBuilding(teachers, userInput.nextLine());
                    break;

                case 4:
                    System.out.println("Thank you for using the directory!");
                    running = false;
                    break;

                default:
                    System.out.println("\nInvalid choice.\n");
            }
        }

        userInput.close();
    }
}
