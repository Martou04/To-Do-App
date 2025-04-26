# Todo React App
## ✅ Completed Requirements
This project was developed in full compliance with all the requirements outlined in the Todo React App Requirements document.

## ⚙️ Additional Implementations
In addition to the mandatory requirements, the following enhancements were implemented:

* localStorage integration:
  * Todos, Users, and LoggedInUser are saved in localStorage.
  * On initial load:
    * If data exists in localStorage → it is loaded from there.
    * If not → data is fetched from the public API.
  * Whenever the todos, users or the logged-in user change, the localStorage data is updated accordingly.
* "Reset App" Button:
  * Clears localStorage and reloads the app, fetching fresh data from the API.
* Drag and Drop functionality:
  * Users can move their tasks between the two sections via drag and drop.
* Login Simulation:
  * The user inputs a username.
  * If the username exists in the list from the API → the user logs in successfully.
  * If not → an error message is displayed, asking the user to try again.
  * After a successful login, the login modal must be manually closed.
* Logout functionality:
  * The user can log out.
  * Logging out removes the currently logged-in user from both the application state and from localStorage.
* User permissions restrictions:
  * The logged-in user can complete/uncomplete only their own tasks.
  * The Complete/Undo buttons are only visible for the logged-in user's tasks.
  * If the user attempts to modify someone else's task, an error message is displayed indicating that they can only manage their own todos.

## 🙍🏻‍♂️ Valid Usernames (from API)
You can use the following usernames to log in:
Bret, Antonette, Samantha, Karianne, Kamren, Leopoldo_Corkery, Elwyn.Skiles, Maxime_Nienow

## 📋 Prerequisites
Before running the project, make sure you have the following installed:
 * Node.js version 18.x or higher
 * npm version 9.x or higher
   
The project uses the following main libraries and tools:
  * React 19
  * Vite 6
  * Bootstrap 5.3 – used for basic styling and responsive design.
  * @hello-pangea/dnd (for drag-and-drop functionality)
  * animate.css (for animations)

## 💻 Steps to install and run locally:
1) git clone https://github.com/Martou04/To-Do-App
2) cd .\To-Do-App\
3) npm install
4) npm run dev



## :camera: Screenshots ##
<img src="https://github.com/Martou04/To-Do-App-Gallery/blob/main/Screenshot1.png?raw=true">
<img src="https://github.com/Martou04/To-Do-App-Gallery/blob/main/Screenshot2.png?raw=true">
<img src="https://github.com/Martou04/To-Do-App-Gallery/blob/main/Screenshot3.png?raw=true">
<img src="https://github.com/Martou04/To-Do-App-Gallery/blob/main/Screenshot4.png?raw=true">
<img src="https://github.com/Martou04/To-Do-App-Gallery/blob/main/Screenshot5.png?raw=true">
<img src="https://github.com/Martou04/To-Do-App-Gallery/blob/main/Screenshot6.png?raw=true">
