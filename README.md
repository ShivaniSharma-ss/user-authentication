## POST /api/register

###Description:
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
