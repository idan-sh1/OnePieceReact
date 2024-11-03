# OnePieceReact

**OnePieceReact** is a web application that allows users to create and manage a repository of pirates based on the popular anime and manga series **One Piece**. The application enables users to add, edit, delete, and search for pirate characters, including their names, bounties, crew names, and statuses.

## Technologies Used

- **Frontend**: React
- **Backend**: ASP.NET Core 8 Web API
- **Database**: MongoDB
- **Styling**: Custom CSS for responsive design

## Features

- **Add Pirates**: Users can add new pirate entries with relevant details such as name, bounty, crew name, and status.
- **Edit Pirates**: Users can update the information of existing pirates.
- **Delete Pirates**: Users can remove pirates from the repository.
- **Search Functionality**: Users can filter pirates based on name, bounty range, status, and crew.
- **Responsive Design**: The application is designed to be user-friendly on both desktop and mobile devices.

## Getting Started

### Prerequisites

## Prerequisites
- **[Visual Studio](https://visualstudio.microsoft.com/)** (2022 or later) with the ASP.NET and web development workload installed.
- **[MongoDB](https://www.mongodb.com/try/download/community)** (for data storage and retrieval).
- **[.NET SDK](https://dotnet.microsoft.com/download/dotnet/8.0)** (8.0 or later) to run the ASP.NET Core Web API.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/OnePieceReact.git
   cd OnePieceReact
Navigate to the project directory:

2. **Install .NET dependencies:** Ensure you have [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) installed. Then, navigate to the server-side project directory and run:
   ```bash
   cd Server
   dotnet restore

3. **Set up MongoDB:** Make sure you have [MongoDB](https://www.mongodb.com/try/download/community) installed and running. Create a database for the project, and update the connection string in `appsettings.json` accordingly.

4. **Run the server:**
   ```bash
   dotnet run

5. **Install client dependencies:** Navigate to the client-side project directory and run:
   ```bash
   cd Client
   npm install

6. **Run the client:**
   ```bash
   npm start

## Usage

1. **Start the Application:**
   - Run the ASP.NET Core API by navigating to the Server folder and executing `dotnet run`.
   - Start the React client by navigating to the Client folder and running `npm start`.
   - Open `http://localhost:3000` in your browser to view the app.

2. **Managing Pirates:**
   - **Add a Pirate:** Click the `+` button on the homepage to open the "Add Pirate" form. Fill out the pirate’s name, bounty, crew, and status, then submit.
   - **Edit a Pirate:** Each pirate entry has an "Edit" button. Click it to modify the pirate's details.
   - **Delete a Pirate:** Click the "Delete" button on a pirate entry to remove it from the repository. Confirm the action in the pop-up modal.

3. **Filtering Pirates:**
   - Use the search form to filter pirates based on name, bounty range, crew name, and status.
   - **Clear Filters:** To reset all filters and view the entire list, click the "Clear" button, which also retrieves all pirates.
   - **Empty Search:** Running a search with all fields left blank retrieves all pirates, acting as a refresh.

## Features

- **CRUD Functionality:** Manage pirate entries with options to create, read, update, and delete.
- **Filtering Capability:** Narrow down the list of pirates by specifying criteria for name, bounty range, status, and crew.
- **Dynamic UI:** The application updates in real-time, showing changes without the need to refresh the page.
- **Responsive Design:** Ensures usability across a variety of devices and screen sizes.

## Technologies Used

- **Frontend:** React for building the user interface, managing component state, and handling form interactions.
- **Backend:** ASP.NET Core 8 Web API for providing a RESTful service to manage pirates and handle CRUD operations.
- **Database:** MongoDB to store and retrieve pirate data, with collections tailored for "One Piece" inspired entries.
- **Styling:** Custom CSS for the layout and styling, ensuring a clean and intuitive design.

## Project Structure

The project consists of two main folders:

1. **Server:** Contains the ASP.NET Core Web API project with controllers and data access logic for the MongoDB database.
2. **Client:** Houses the React app responsible for rendering the UI and handling user interactions with the server API.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
Thanks to the creators of *One Piece* for the inspiration behind this project.
