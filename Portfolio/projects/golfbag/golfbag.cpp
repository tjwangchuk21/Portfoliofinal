//TJ wangchuk
//final project
//06/11/25

#include <iostream>
#include <vector>
#include <string>
#include <fstream>

using namespace std;

int main() {
    //create the vector
    vector<string> golfBag;
    string club;
    int choice;
//welcome
    cout << "===============================" << endl;
    cout << " Welcome to TJ's Golf Bag App! " << endl;
    cout << "===============================\n" << endl;
//loop to ask user
    while (true) {
        cout << "\nPlease choose an option:" << endl;
        cout << "1. Add a golf club" << endl;
        cout << "2. View current golf bag" << endl;
        cout << "3. Clear current golf bag list" << endl;
        cout << "4. Exit" << endl;
        cout << "5. Save golf bag to file" << endl;
        cout << "\nEnter your choice (1-5): ";
        
        cin >> choice;

//ai this part
        if (cin.fail()) {
            cin.clear(); 
            cin.ignore(10000, '\n'); 
            cout << "Invalid input. Please enter a number from 1 to 5." << endl;
            continue;
        }
//different choices
        if (choice == 1) {
            cout << "Enter the name of the golf club: ";
            cin.ignore();  
            getline(cin, club);
//adds to golf bag
            golfBag.push_back(club);
            cout << club << " added to your golf bag!" << endl;

// if key word x
            if (club.find("iron") < club.length()) {
                cout << "You should get Titleist or Mizuno." << endl;
            }
            else if (club.find("driver") < club.length()) {
                cout << "You should get TaylorMade or Callaway." << endl;
            }
            else if (club.find("putter") < club.length()) {
                cout << "You should get Odyssey or Scotty Cameron." << endl;
            }
            else if (club.find("wedge") < club.length()) {
                cout << "You should get Cleveland or Vokey." << endl;
            }
            else if (club.find("hybrid") < club.length()) {
                cout << "You should get Ping or Cobra." << endl;
            }
            else {
                cout << "No specific brand suggestion for this club." << endl;
            }
        }
//choice 2
        else if (choice == 2) {
            if (golfBag.empty()) {
                cout << "Your golf bag is currently empty." << endl;
            } else {
                cout << "\nYour current golf bag contains:" << endl;
                for (size_t i = 0; i < golfBag.size(); ++i) {
                    cout << i + 1 << ". " << golfBag[i] << endl;
                }
            }
        }
//choice 3
        else if (choice == 3) {
            golfBag.clear();
            cout << "Golf bag has been cleared from memory." << endl;
        }
//choice 4
        else if (choice == 4) {
            cout << "Thanks for using TJ's Golf Bag App. See you on the green!" << endl;
            break;
        }
//choice 5
        else if (choice == 5) {
            ofstream outFile("golfbag.txt");
            if (!outFile) {
                cout << "Error: Could not open file to save." << endl;
            } else {
                for (const string club : golfBag) {
                    outFile << club << endl;
                }
                outFile.close();
                cout << "Golf bag saved to 'golfbag.txt'!" << endl;
            }
        }
//invalid choice
        else {
            cout << "Invalid choice. Please enter a number from 1 to 5." << endl;
        }
    }

    return 0;
}