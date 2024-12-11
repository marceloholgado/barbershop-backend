const express = require('express'); // Importação do Express
const barbersController = require('../controllers/barberShopController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /api/trimbook:
 *   post:
 *     summary: Create a new barber shop
 *     description: This endpoint creates a new barber shop.
 *     tags:
 *       - BarberShop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Barber shop created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BarberShop'
 *       400:
 *         description: Error in creating barber shop
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.post('/', authMiddleware, barbersController.createBarberShop);

/**
 * @swagger
 * /api/trimbook/{url}:
 *   get:
 *     summary: Get a barber shop by URL
 *     description: This endpoint retrieves a barber shop by its unique URL.
 *     tags:
 *       - BarberShop
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         description: The URL of the barber shop
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Barber shop found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BarberShop'
 *       404:
 *         description: Barber shop not found
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.get('/:url', authMiddleware, barbersController.getBarberShop);

/**
 * @swagger
 * /api/trimbook/{url}/barbers:
 *   post:
 *     summary: Add a new barber to a barber shop
 *     description: Create a new barber within a specific barber shop identified by the URL
 *     tags:
 *       - BarberShop
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         description: The URL of the barber shop
 *         schema:
 *           type: string
 *       - in: body
 *         name: barber
 *         description: The barber information to be added
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             barberName:
 *               type: string
 *               description: The name of the barber
 *               example: "John Doe"
 *     responses:
 *       201:
 *         description: Barber created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Barber created successfully!"
 *                 barbers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the barber
 *                         example: "John Doe"
 *       400:
 *         description: Barber name is missing or barber already exists
 *       404:
 *         description: Barber shop not found
 *       500:
 *         description: Error creating barber
 *     security:
 *       - BearerAuth: []
 */
router.post('/:url/barbers', authMiddleware, barbersController.postCreateBarber);

/**
 * @swagger
 * /api/trimbook/{url}/barbers:
 *   delete:
 *     summary: Delete a barber from a barber shop
 *     description: This endpoint removes a barber from the barber shop identified by the URL.
 *     tags:
 *       - BarberShop
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique URL of the barber shop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barberName:
 *                 type: string
 *                 description: The name of the barber to be deleted
 *     responses:
 *       200:
 *         description: Barber successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Barber shop or barber not found
 *       500:
 *         description: Error while deleting the barber
 */
router.delete('/:url/barbers', authMiddleware, barbersController.deleteBarber);


/**
 * @swagger
 * /api/trimbook/{url}/appointments:
 *   post:
 *     summary: Create an appointment for a barber
 *     description: This endpoint creates an appointment for a specific barber in a barber shop.
 *     tags:
 *       - BarberShop
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         description: The URL of the barber shop
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               barberName:
 *                 type: string
 *               client:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *               serviceType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Missing or incorrect data
 *       404:
 *         description: Barber shop or barber not found
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.post('/:url/appointments', barbersController.postCreateAppointments);

/**
 * @swagger
 * /api/trimbook/{url}/barbers:
 *   get:
 *     summary: Get a list of barbers in a barber shop
 *     description: This endpoint retrieves the list of barbers working at a specific barber shop.
 *     tags:
 *       - BarberShop
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         description: The URL of the barber shop
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of barbers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 barbers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *       404:
 *         description: Barber shop not found
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.get('/:url/barbers', barbersController.getBarbers);

/**
 * @swagger
 * /api/trimbook/{url}/barbers/{barberId}/schedule:
 *   get:
 *     summary: Get the available schedule for a barber
 *     description: This endpoint retrieves available time slots for a specific barber.
 *     tags:
 *       - BarberShop
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         description: The URL of the barber shop
 *         schema:
 *           type: string
 *       - in: path
 *         name: barberId
 *         required: true
 *         description: The ID of the barber
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Available slots for the barber
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 barber:
 *                   type: string
 *                   description: The name of the barber
 *                   example: "John Doe"
 *                 availableSlots:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       dateTime:
 *                         type: string
 *                         format: date-time
 *                       serviceType:
 *                         type: string
 *       404:
 *         description: Barber shop or barber not found
 *       500:
 *         description: Server error
 *     security:
 *       - BearerAuth: []
 */
router.get('/:url/barbers/:barberId/schedule', barbersController.getBarberSchedule);

/**
 * @swagger
 * /api/trimbook/{url}/barbers/{barberId}/appointments/{appointmentId}:
 *   put:
 *     summary: Update an appointment for a barber
 *     description: This endpoint updates an existing appointment for a specific barber in a barber shop.
 *     tags:
 *       - BarberShop
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         description: The URL of the barber shop
 *         schema:
 *           type: string
 *       - in: path
 *         name: barberId
 *         required: true
 *         description: The ID of the barber
 *         schema:
 *           type: string
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         description: The ID of the appointment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *               dateTime:
 *                 type: string
 *                 format: date-time
 *               serviceType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       400:
 *         description: Missing or incorrect data for updating appointment
 *       404:
 *         description: Barber shop, barber, or appointment not found
 *       500:
 *         description: Error updating appointment
 */
router.post('/:url/barbers/:barberId/appointments/:appointmentId', barbersController.putUpdateAppointment);

/**
 * @swagger
 * /api/trimbook/{url}/barbers/{barberId}/appointments/{appointmentId}:
 *   delete:
 *     summary: Delete an appointment for a barber
 *     description: This endpoint deletes an existing appointment for a specific barber in a barber shop.
 *     tags:
 *       - BarberShop
 *     parameters:
 *       - in: path
 *         name: url
 *         required: true
 *         description: The URL of the barber shop
 *         schema:
 *           type: string
 *       - in: path
 *         name: barberId
 *         required: true
 *         description: The ID of the barber
 *         schema:
 *           type: string
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         description: The ID of the appointment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Barber shop, barber, or appointment not found
 *       500:
 *         description: Error deleting appointment
 */
router.delete('/:url/barbers/:barberId/appointments/:appointmentId', barbersController.deleteAppointment);


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     BarberShop:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         url:
 *           type: string
 *         barbers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     client:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         phone:
 *                           type: string
 *                     dateTime:
 *                       type: string
 *                       format: date-time
 *                     serviceType:
 *                       type: string
 */


module.exports = router;
