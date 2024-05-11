const bodyParser = require("body-parser");
const Users = require("./models/user.model");
dotenv = require("dotenv");
const express = require("express");

dotenv.config();
var jsonParser = bodyParser.json();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const registerMiddleware = require("./middlewares/registerMiddleware");
const loginMiddleware = require("./middlewares/loginMiddleware");
const updateMiddleware = require("./middlewares/updateMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const jwt = require("jsonwebtoken");
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               photo:
 *                 type: string
 *               bio:
 *                 type: string
 *               isPublicProfile:
 *                 type: boolean
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: User has been registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '400':
 *         description: Name length should be greater than 1, email length should be greater than 6, phone length should be equal to 10, password length should be greater than 7, privacy is required, isAdmin is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post(
  "/register",
  jsonParser,
  registerMiddleware.register,
  async (req, res) => {
    const user = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      photo: req.body.photo,
      bio: req.body.bio,
      isPublicProfile: req.body.isPublicProfile,
      isAdmin: req.body.isAdmin,
    };
    const resp = await Users.insertMany(user);
    console.log(resp);
    res.status(200).json({
      success: true,
      message: "User has been registered successfully",
    });
  }
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     description: Endpoint to log in a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User has been successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User has been successfully logged in
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '401':
 *         description: Wrong Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '404':
 *         description: This Email is not registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post("/login", jsonParser, loginMiddleware.login, async (req, res) => {
  let token = jwt.sign(req.user, accessTokenSecret, { expiresIn: "1h" });
  res.status(200).json({
    success: true,
    message: "User has been successfully logged in",
    token: token,
  });
});

/**
 * @swagger
 * /getUserDetails:
 *   get:
 *     summary: Get user details
 *     description: Retrieve details of a user by email.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user to retrieve details for.
 *     responses:
 *       '200':
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 userDetails:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     photo:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     isPublicProfile:
 *                       type: boolean
 *       '404':
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '403':
 *         description: The provided jwt token is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '401':
 *         description: No Authorization token found, please login first.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *     securityDefinitions:
 *       bearerToken:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: The authorization header is expected to contain the Bearer token (a JWT prefixed with 'Bearer ') of the user whose favourite resources we are acting on.
 */
router.get(
  "/getUserDetails",
  authMiddleware.auth,
  jsonParser,
  async (req, res) => {
    try {
      const user = await Users.findOne({ email: req.query.email }).lean();
      if (user) {
        delete user.password;
        delete user._id;
        delete user.__v;
        res.status(200).json({
          success: true,
          userDetails: {
            ...user,
          },
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error,
      });
    }
  }
);

/**
 * @swagger
 * /updateUserDetails/{email}:
 *   put:
 *     summary: Update user details
 *     description: Endpoint to update user details by email.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               photo:
 *                 type: string
 *               bio:
 *                 type: string
 *               isPublicProfile:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: User details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 newDetails:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     password:
 *                       type: string
 *                     photo:
 *                       type: string
 *                     bio:
 *                       type: string
 *                     isPublicProfile:
 *                       type: boolean
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '403':
 *         description: The provided jwt token is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '401':
 *         description: No Authorization token found, please login first.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *     securityDefinitions:
 *       bearerToken:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: The authorization header is expected to contain the Bearer token (a JWT prefixed with 'Bearer ') of the user whose favourite resources we are acting on.
 */
router.put(
  "/updateUserDetails/:email",
  jsonParser,
  authMiddleware.auth,
  updateMiddleware.update,
  async (req, res) => {
    let user = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: Buffer.from(req.body.password).toString("base64"),
      photo: req.body.photo,
      bio: req.body.bio,
      isPublicProfile: req.body.isPublicProfile,
    };
    await Users.updateOne({ email: req.params.email }, { $set: user });
    res.status(200).json({
      success: true,
      message: "User details updated successfully",
      newDetails: {
        ...user,
      },
    });
  }
);

/**
 * @swagger
 * /getAllUsers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users or users with public profiles if not an admin.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user making the request.
 *     responses:
 *       '200':
 *         description: Users retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       photo:
 *                         type: string
 *                       bio:
 *                         type: string
 *                       isPublicProfile:
 *                         type: boolean
 *       '404':
 *         description: No users found or wrong email provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '403':
 *         description: The provided JWT token is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '401':
 *         description: No Authorization token found, please login first.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *     securityDefinitions:
 *       bearerToken:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 *         description: The authorization header is expected to contain the Bearer token (a JWT prefixed with 'Bearer ') of the user whose favourite resources we are acting on.
 */
router.get(
  "/getAllUsers",
  authMiddleware.auth,
  jsonParser,
  async (req, res) => {
    const user = await Users.findOne({
      email: req.query.email,
    });
    if (user) {
      if (user.isAdmin) {
        let users = await Users.find().lean();
        users = deleteFields(users);
        res.status(200).json({
          success: true,
          users,
        });
      } else {
        let users = await Users.find({ isPublicProfile: true }).lean();
        users = deleteFields(users);
        res.status(200).json({
          success: true,
          users,
        });
      }
    } else {
      res.status(404).json({
        success: true,
        message: "Wrong email provided",
      });
    }
  }
);

// function to delete non required fields from users
const deleteFields = (users) => {
  return users.map((user) => {
    delete user.password;
    delete user.__v;
    return user;
  });
};

module.exports = router;
