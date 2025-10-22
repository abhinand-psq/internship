Thank you for clarifying the main URL and the exact endpoints. Here’s an updated user manual for your internship collection, with the correct URLs and a brief description of each API’s use:

---

 User Manual for Collection: internship

Base URL: https://internship-t0dz.onrender.com

This collection provides endpoints for user management and authentication. Below is a summary of each API endpoint and its intended use:

---

 1. Create User
Method: POST  
Endpoint: /api/users  
Full URL: https://internship-t0dz.onrender.com/api/users  
Use:  
  Creates a new user. Send user details (such as name, email, password) in the request body.

---

 2. Login User
Method: POST  
Endpoint: /api/login  
Full URL: https://internship-t0dz.onrender.com/api/login  
Use:  
  Authenticates a user with their credentials (email and password). Returns a token or session information if successful.

---

 3. Get User by ID
Method: GET  
Endpoint: /api/users/:id  
Full URL: https://internship-t0dz.onrender.com/api/users/:id  
Use:  
  Retrieves details of a specific user by their unique ID.

---

 4. Get Users
Method: GET  
Endpoint: /api/users  
Full URL: https://internship-t0dz.onrender.com/api/users  
Use:  
  Fetches a list of all users in the system.

---

 5. Update User
Method: PUT  
Endpoint: /api/users/:id  
Full URL: https://internship-t0dz.onrender.com/api/users/:id  
Use:  
  Updates the details of a user by their unique ID. Send updated user data in the request body.

---

 6. Delete User
Method: DELETE  
Endpoint: /api/:id  
Full URL: https://internship-t0dz.onrender.com/api/users/:id
Use:  
  Deletes a user by their unique ID.

---

 7. Health Check (Optional)
Method: GET  
Endpoint: /health  
Full URL: https://internship-t0dz.onrender.com/health  
Use:  
  Checks if the API server is running and healthy.

---


Would you like me to add this documentation directly to your collection in Postman, or do you want it as a markdown file?

