# Steps to use the api

## POST /api/register

### Description:
This endpoint allows users to register by providing their information including name, email, phone number, password, photo, bio, and profile settings. Upon successful registration, the user's information is stored in the database.

### Request Body:
name (string): The name of the user.
email (string): The email address of the user.
phone (string): The phone number of the user.
password (string): The password for the user account.
photo (string): URL or base64 encoded image of the user's photo.
bio (string): A short biography or description of the user.
isPublicProfile (boolean): Indicates whether the user's profile is public or private.
isAdmin (boolean): Indicates whether the user has administrative privileges.

### Response:
200 OK: Successful registration.
success (boolean): true.
message (string): "User has been registered successfully".

## POST /api/login


### Description:
This endpoint facilitates user login by verifying the provided credentials. Upon successful authentication, it generates a JSON Web Token (JWT) containing user information and returns it to the client for subsequent authenticated requests.

### Request Body:
email (string): The email address of the user.
password (string): The password for the user account.

### Response:
200 OK: Successful login.
success (boolean): true.
message (string): "User has been successfully logged in".
token (string): JWT containing user information.

## GET /api/getUserDetails

### Description:
This endpoint retrieves details of a user based on the provided email address. Authentication is required to access this endpoint. Upon successful retrieval, it returns the user details excluding sensitive information such as password,  _id, and __v field.

### Request Query Parameters:
email (string): The email address of the user whose details are to be retrieved.

### Response:
200 OK: Successful retrieval.
success (boolean): true.
userDetails (object): Object containing user details.
404 Not Found: If user with the provided email address is not found.
success (boolean): false.
message (string): "User Not Found".
500 Internal Server Error: If an internal server error occurs.
success (boolean): false.
message (string): "Internal Server Error".
error (object): Details of the error.

## GET /api/getAllUsers

### Description:
This endpoint retrieves details of all users. Authentication is required to access this endpoint. Depending on the user's role, either all users (if the user is an admin) or only users with public profiles will be returned.

### Request Query Parameters:
email (string): The email address of the user making the request.

### Response:
200 OK: Successful retrieval.
success (boolean): true.
users (array): Array containing user details.
404 Not Found: If the provided email address is not associated with any user.
success (boolean): false.
message (string): "Wrong email provided".

## PUT /api/updateUserDetails/:email

### Description:
This endpoint allows a user to update their details. Authentication is required to access this endpoint. Upon successful update, it returns a message confirming the update along with the updated user details.

### Request Parameters:
email (string): The email address of the user whose details are to be updated.

### Request Body:
name (string): The updated name of the user.
email (string): The updated email address of the user.
phone (string): The updated phone number of the user.
password (string): The updated password for the user account, encoded in base64.
photo (string): The updated URL or base64 encoded image of the user's photo.
bio (string): The updated biography or description of the user.
isPublicProfile (boolean): The updated status indicating whether the user's profile is public or private.

### Response:
200 OK: Successful update.
success (boolean): true.
message (string): "User details updated successfully".
newDetails (object): Object containing the updated user details.






