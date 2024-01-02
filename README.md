# charitism-backend

User Routes
Register User
Endpoint: POST /user/register

Register a new user with a unique email address.

Request:

{
"name": "test",
"email": "test@example.com",
"password": "testpassword"
}

Response:

{
"msg": "Registration Successful"
}

Login User
Endpoint: POST /user/login

Log in an existing user with valid credentials.

Request:

{
"email": "test@example.com",
"password": "testpassword"
}

Response:

{
"msg": "Login Successful",
"token": "your_generated_jwt_token"
}

Todo Routes
Add Todo
Endpoint: POST /todo/addtodo

Add a new todo item.

Request:

{
"title": "Complete Project",
"description": "Finish the Node.js project",
"completed": false
}

Response:

{
"\_id": "todo_id",
"title": "Complete Project",
"description": "Finish the Node.js project",
"completed": false
}

Get All Todos
Endpoint: GET /todo/gettodo

Get all todo items.

Response:

[
{
"\_id": "todo_id_1",
"title": "Complete Project",
"description": "Finish the Node.js project",
"completed": false
},
{
"\_id": "todo_id_2",
"title": "Review Code",
"description": "Review the codebase for best practices",
"completed": true
},

]

Update Todo
Endpoint: PUT /todo/updatetodo/:id

Update a todo item by ID.

Request:

{
"title": "Updated Project",
"description": "Updated project description",
"completed": true
}

Response:

{
"\_id": "updated_todo_id",
"title": "Updated Project",
"description": "Updated project description",
"completed": true
}

Delete Todo
Endpoint: DELETE /todo/deletetodo/:id

Delete a todo item by ID.

Response:

{
"msg": "Todo deleted"
}
