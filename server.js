const expressApp = require('express');
const httpClient = require('axios');
const jsonParser = require('body-parser');
const crossOrigin = require('cors');
const app = expressApp();
const serverPort = 3000;

app.use(crossOrigin());
app.use(jsonParser.json());

const mysqlDriver = require('mysql');
const connection = mysqlDriver.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'M@ni$hKum4r!2024#',
    database: 'searchApp'
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
    console.log('MySQL database connection established successfully');
});

app.post('/search', async (request, response) => {
    const { searchMethod, searchInput } = request.body;
    let requestUrl = '';

    if (searchMethod === 'pincode') {
        requestUrl = `https://api.postalpincode.in/pincode/${searchInput}`;
    } else if (searchMethod === 'name') {
        requestUrl = `https://api.postalpincode.in/postoffice/${searchInput}`;
    }

    try {
        const apiResponse = await httpClient.get(requestUrl);
        const responseData = apiResponse.data;

        if (responseData[0].Status === "Success") {
            response.json(responseData[0].PostOffice);
        } else {
            response.status(404).json({ message: 'No data found for the specified search.' });
        }
    } catch (error) {
        console.error('Error during API call:', error);
        response.status(500).json({ message: 'An issue occurred while fetching the data.' });
    }
});

app.post('/favourites', (req, res) => {
    const { name, pincode, branchType, deliveryStatus, district, region, state } = req.body;
  
    const query = `
      INSERT INTO favourites (name, pincode, branchType, deliveryStatus, district, region, state)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [name, pincode, branchType, deliveryStatus, district, region, state], (err, result) => {
      if (err) {
        console.error('Error inserting into database:', err);
        console.error('Error inserting into database:', err);
      } else {
        res.status(200).json({ message: 'Data saved successfully' });
      }
    });
  });
  

app.get('/favourites', (request, response) => {
    const fetchQuery = 'SELECT * FROM favourites';

    connection.query(fetchQuery, (err, results) => {
        if (err) {
            console.error('Error retrieving favourites:', err);
            return response.status(500).json({ message: 'Could not retrieve favourites' });
        }
        response.json(results);
    });
});

app.listen(serverPort, () => {
    console.log(`Server is running:${serverPort}`);
});
