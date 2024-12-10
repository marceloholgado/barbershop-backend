const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();


/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint registers a new user and returns a JWT token.
 *     tags:
 *       - User
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
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User successfully registered and token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Email already registered
 *       500:
 *         description: Error during registration
 */
router.post('/register', register); // Cadastro de novo usuário

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login and generate JWT token
 *     description: This endpoint authenticates a user and returns a JWT token.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User successfully logged in and token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Error during login
 */
router.post('/login', login);       // Login e geração do token

module.exports = router;
