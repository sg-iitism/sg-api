const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const eventValidation = require('../../validations/event.validation');
const eventController = require('../../controllers/event.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageEvents'), validate(eventValidation.createEvent), eventController.createEvent)
  .get(validate(eventValidation.getEvents), eventController.getEvents);

router
  .route('/:eventId')
  .get(validate(eventValidation.getEventDetails), eventController.getEventDetails)
  .patch(auth('manageEvents'), validate(eventValidation.updateEvent), eventController.updateEvent)
  .delete(auth('manageEvents'), validate(eventValidation.deleteEvent), eventController.deleteEvent);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Events management and retrieval
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create an event
 *     description: Only admins / moderators can create events.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - start
 *               - end
 *             properties:
 *               name:
 *                 type: string
 *               start:
 *                 type: string
 *                 format: date-time
 *               end:
 *                 type: string
 *                 format: date-time
 *               showCommonly:
 *                 type: boolean
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *               website:
 *                 type: string
 *                 format: uri
 *               festOrganizer:
 *                 type: string
 *               clubOrganizers:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               name: Test event
 *               start: 2022-01-20T16:23:56.057Z
 *               end: 2022-01-20T21:23:56.057Z
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Event'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: admin
 *         schema:
 *           type: boolean
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */

/**
 * @swagger
 * /events/{eventId}:
 *   get:
 *     summary: Get details of an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Event'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an event
 *     description: Admin can update any event but moderator can update only those events that are moderated by their club or fest.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               start:
 *                 type: string
 *                 format: date-time
 *               end:
 *                 type: string
 *                 format: date-time
 *               showCommonly:
 *                 type: boolean
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *               website:
 *                 type: string
 *                 format: uri
 *               festOrganizer:
 *                 type: string
 *               clubOrganizers:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               name: Test event
 *               start: 2022-01-20T16:23:56.057Z
 *               end: 2022-01-20T21:23:56.057Z
 *               imageUrl: https://via.placeholder.com/350x150
 *               festOrganizer: srijan
 *               showCommonly: false
 *               website: https://iitism.ac.in
 *               clubOrganizers:
 *                 - roboism
 *                 - cyber-labs
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Event'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a event
 *     description: Admin can delete any event but moderator can delete only those events that are moderated by their club or fest.
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event id
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
