Favourites Management Application
This application allows users to search for postal information by pincode or name, mark results as favourites, and like those favourites. The application was built in a step-by-step process to ensure each feature was working correctly before moving on to the next.

Step 1: Initial Search Functionality
Goal:
The first step was to implement a search functionality where users can search for postal information by either pincode or place name.

Implementation:
Backend:

I used Node.js with Express to create an API that accepts two parameters: searchMethod (either 'pincode' or 'name') and searchInput (the actual pincode or place name).
Depending on the search method, I used external APIs to fetch postal data.
For pincode search, I used the Postal Pincode API.
For place name search, I used the same API but with the post office name endpoint: Postal Pincode API by Postoffice.
The backend API returned the fetched data, which was sent to the frontend.
Frontend:

I created a simple HTML form to allow users to input either a pincode or place name and then trigger the search.
Depending on the user input, the appropriate API request was made, and the results were displayed in a table format.
Result:
At this point, the basic search functionality was implemented. The user could search by pincode or place name and get the postal details.

Step 2: Add to Favourites
Goal:
After implementing the search functionality, I added the ability for users to mark a postal office as their favourite.

Implementation:
Backend:

I added a new endpoint /favourite that listens for a POST request. This endpoint was responsible for saving the favourite details to a MySQL database.
I designed the database table favourites with columns like officeName, pinCode, officeType, districtName, etc., to store the favourite details.
When the user clicks the "Mark as Favourite" button on the frontend, it triggers an API request to store the data in the database.
Frontend:

I added a "Mark as Favourite" button next to each search result. When clicked, the relevant details (like office name, pincode, etc.) are sent to the backend and stored in the database.
The frontend sends the data in the body of the POST request.
Result:
Now, users could search for postal offices and mark them as favourites. The favourites were saved to the MySQL database for later retrieval.

Step 3: View Favourites
Goal:
Once the favourite feature was working, I added a new section where users could view all their saved favourites.

Implementation:
Backend:

I created a new GET API endpoint /favourites that fetched all the records from the favourites table in the MySQL database.
The API sent the favourites data as a JSON response to the frontend.
Frontend:

I created a new page (favourites.html) where all the user's marked favourites were displayed in a list format.
The frontend fetched the favourites data from the backend using a GET request and populated the list dynamically with the response data.
Result:
At this point, users could now view all their marked favourites in a separate "Favourites List" section.

Step 4: Like Functionality for Favourites
Goal:
The next step was to allow users to "like" their favourite postal offices. This would provide a way for users to track and appreciate their most important favourites.

Implementation:
Backend:

I updated the favourites table in the database to include a likes column to store the like count for each favourite.
I added a new /like API endpoint that listens for a POST request to increment the likes count for a particular favourite.
When a user likes a favourite, the backend updates the likes count in the database and sends a success message.
Frontend:

I added a "Like" button next to each favourite in the list. When clicked, it sends a request to the backend to update the likes count for that favourite.
After the like is successful, the frontend dynamically updates the likes count next to the corresponding favourite.
Result:
Users could now like their favourite postal offices. Each favourite could have its own like count, and users could interact with these favourites by liking them.

Summary of Features
Search by Pincode or Name: Users can search for postal office details by either pincode or place name.
Mark as Favourite: Users can mark postal offices as favourites, which are stored in the MySQL database.
View Favourites: Users can view all their marked favourites in a separate list.
Like Favourites: Users can like their favourites, which increases the like count for each postal office.
Future Improvements
User Authentication: Implement login functionality so that each user can have their own list of favourites and likes.
Improved UI: Enhance the frontend using a modern framework like React .

