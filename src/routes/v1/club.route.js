const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const clubValidation = require('../../validations/club.validation');
const clubController = require('../../controllers/club.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageClubs'), validate(clubValidation.createClub), clubController.createClub)
  .get(validate(clubValidation.getClubs), clubController.getClubs);

router
  .route('/:clubId')
  .get(validate(clubValidation.getClubDetails), clubController.getClubDetails)
  .patch(auth('updateClub'), validate(clubValidation.updateClub), clubController.updateClub)
  .delete(auth('manageClubs'), validate(clubValidation.deleteClub), clubController.deleteClub);

router.route('/:clubId/events').get(validate(clubValidation.getClubEvents), clubController.getClubEvents);

router.route('/:clubId/achievements').get(validate(clubValidation.getClubAchievements), clubController.getClubAchievements);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Clubs
 *   description: Clubs management and retrieval
 */

/**
 * @swagger
 * /clubs:
 *   post:
 *     summary: Create an club
 *     description: Only admins can create clubs.
 *     tags: [Clubs]
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
 *               - division
 *             properties:
 *               name:
 *                 type: string
 *               division:
 *                 type: string
 *                 enum: [snt, mnc]
 *               logoUrl:
 *                 type: string
 *                 format: uri
 *               backgroundImageUrl:
 *                 type: string
 *                 format: uri
 *               tagline:
 *                 type: string
 *               about:
 *                 type: string
 *               website:
 *                 type: string
 *               mail:
 *                 type: string
 *               facebook:
 *                 type: string
 *               linkedin:
 *                 type: string
 *               github:
 *                 type: string
 *               contacts:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contact'
 *             example:
 *               name: Cyber Labs
 *               division: snt
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Club'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all clubs
 *     tags: [Clubs]
 *     parameters:
 *       - in: query
 *         name: division
 *         schema:
 *           type: string
 *           enum: [snt, mnc]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Club'
 */

/**
 * @swagger
 * /clubs/{clubId}:
 *   get:
 *     summary: Get details of an club
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: clubId
 *         required: true
 *         schema:
 *           type: string
 *         description: Club id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Club'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an club
 *     description: Admin can update any club but moderator can update only those clubs that are moderated by them.
 *     tags: [Clubs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clubId
 *         required: true
 *         schema:
 *           type: string
 *         description: Club id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               division:
 *                 type: string
 *                 enum: [snt, mnc]
 *               logoUrl:
 *                 type: string
 *                 format: uri
 *               backgroundImageUrl:
 *                 type: string
 *                 format: uri
 *               tagline:
 *                 type: string
 *               about:
 *                 type: string
 *               website:
 *                 type: string
 *               mail:
 *                 type: string
 *               facebook:
 *                 type: string
 *               linkedin:
 *                 type: string
 *               github:
 *                 type: string
 *               contacts:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contact'
 *             example:
 *               name: Cyber Labs
 *               division: snt
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Club'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a club
 *     description: Only admin can delete any club.
 *     tags: [Clubs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clubId
 *         required: true
 *         schema:
 *           type: string
 *         description: Club id
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

/**
 * @swagger
 * /clubs/{clubId}/events:
 *   get:
 *     summary: Get events of an club
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: clubId
 *         required: true
 *         schema:
 *           type: string
 *         description: Club id
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
 * /clubs/{clubId}/achievements:
 *   get:
 *     summary: Get achievements of an club
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: clubId
 *         required: true
 *         schema:
 *           type: string
 *         description: Club id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Achievement'
 */
