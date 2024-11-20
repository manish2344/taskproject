Project Overview: Location Search and Favourites App
This project allows users to search for locations by pincode or place name, save them as favourites, and view all saved favourites on a separate page. It involves a frontend built with HTML, JavaScript, and Bootstrap, and a backend built with Node.js and Express to handle API requests.

Key Features:
Location Search:

Users can search for locations using a pincode or place name via an external Postal API.
Search results are dynamically displayed in a table.
Save Favourites:

Users can mark locations as favourites, which are saved via a POST request to the backend.
View Favourites:

Saved favourites are displayed on a separate page by fetching data through a GET request from the backend.
Technologies Used:
Frontend: HTML, JavaScript, Bootstrap
Backend: Node.js, Express.js
API: Postal API for location data
Error Handling: Implemented in both frontend and backend for smooth operation.
Challenges:
CORS Issue: Solved by enabling CORS in the backend.
Data Formatting: Ensured uniform data handling before displaying it to users.
Impact and Skills:
Real-World Use: Useful for applications that track locations like delivery services.
Skills: API integration, dynamic data handling, full-stack development (frontend and backend), and error handling.
Future Improvements:
Database Integration: Store favourites in a database instead of memory.
User Authentication: Add user accounts to store personal favourites.
UI Enhancements: Improve design and add features like filters and pagination.
