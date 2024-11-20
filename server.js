<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search by Pincode or Name</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h2>Search by Pincode or Name</h2>
        <a href="favourites.html" class="btn btn-link">View Favourites</a>

        <form id="searchForm" class="mt-4">
            <div class="form-group">
                <label for="searchType">Search by:</label><br>
                <input type="radio" name="searchType" value="pincode" checked> Pincode
                <input type="radio" name="searchType" value="name"> Place Name
            </div>
            <div class="form-group">
                <label for="searchValue">Enter Pincode or Name:</label>
                <input type="text" id="searchValue" class="form-control" placeholder="Enter Pincode or Name">
            </div>
            <button type="submit" class="btn btn-primary">Search</button>
        </form>

        <table class="table table-striped mt-5" id="resultsTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Branch Type</th>
                    <th>Delivery Status</th>
                    <th>District</th>
                    <th>Region</th>
                    <th>State</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const searchForm = document.getElementById('searchForm');
            const searchValueInput = document.getElementById('searchValue');
            const resultsTableBody = document.querySelector('#resultsTable tbody');

            // Handle search form submission
            searchForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Prevent form from refreshing the page
                const searchType = document.querySelector('input[name="searchType"]:checked').value;
                const searchValue = searchValueInput.value.trim();

                // Check if either Pincode or Place Name is entered
                if (!searchValue) {
                    alert('Please enter either a Pincode or a Place Name');
                    return;
                }

                const apiUrl = searchType === 'pincode' 
                    ? `https://api.postalpincode.in/pincode/${searchValue}`
                    : `https://api.postalpincode.in/postoffice/${searchValue}`;

                // Fetch data from the API
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        const results = data[0].Status === "Success" ? data[0].PostOffice : [];
                        resultsTableBody.innerHTML = ''; // Clear previous results

                        if (results.length === 0) {
                            resultsTableBody.innerHTML = '<tr><td colspan="7">No results found.</td></tr>';
                        } else {
                            results.forEach(result => {
                                const row = document.createElement('tr');
                                row.innerHTML = `
                                    <td>${result.Name}</td>
                                    <td>${result.BranchType}</td>
                                    <td>${result.DeliveryStatus}</td>
                                    <td>${result.District}</td>
                                    <td>${result.Region}</td>
                                    <td>${result.State}</td>
                                    <td>
                                        <button class="btn btn-success btn-sm favourite-btn" 
                                                data-name="${result.Name}" 
                                                data-pincode="${result.Pincode}" 
                                                data-branch="${result.BranchType}" 
                                                data-delivery="${result.DeliveryStatus}" 
                                                data-district="${result.District}" 
                                                data-region="${result.Region}" 
                                                data-state="${result.State}">
                                                Mark as Favourite
                                        </button>
                                    </td>
                                `;
                                resultsTableBody.appendChild(row);
                            });
                        }
                    })
                    .catch(() => {
                        alert('Error fetching data');
                    });
            });

            // Handle saving a favourite
            resultsTableBody.addEventListener('click', function(event) {
                if (event.target && event.target.classList.contains('favourite-btn')) {
                    const name = event.target.dataset.name;
                    const pincode = event.target.dataset.pincode;
                    const branchType = event.target.dataset.branch;
                    const deliveryStatus = event.target.dataset.delivery;
                    const district = event.target.dataset.district;
                    const region = event.target.dataset.region;
                    const state = event.target.dataset.state;

                    // Save to favourites by sending data to backend
                    fetch('http://localhost:3000/favourite', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name,
                            pincode,
                            branchType,
                            deliveryStatus,
                            district,
                            region,
                            state
                        })
                    })
                    .then(response => response.json())
                    .then(data => {
                        alert(data.message);
                    })
                    .catch(() => {
                        alert('Error saving to favourites');
                    });
                }
            });

        });
    </script>
</body>
</html>
