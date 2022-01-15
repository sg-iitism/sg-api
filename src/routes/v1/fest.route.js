const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const festValidation = require('../../validations/fest.validation');
const festController = require('../../controllers/fest.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageFests'), validate(festValidation.createFest), festController.createFest)
  .get(festController.getFests);

router
  .route('/:festId')
  .get(validate(festValidation.getFestDetails), festController.getFestDetails)
  .patch(auth('updateFest'), validate(festValidation.updateFest), festController.updateFest)
  .delete(auth('manageFests'), validate(festValidation.deleteFest), festController.deleteFest);

router.route('/:festId/events').get(validate(festValidation.getFestEvents), festController.getFestEvents);

router
  .route('/:festId/years')
  .post(auth('manageFestArchives'), validate(festValidation.addFestYear), festController.addFestYear)
  .get(validate(festValidation.getFestYears), festController.getFestYears);

router
  .route('/:festId/years/:year')
  .get(validate(festValidation.getFestDetailsByYear), festController.getFestDetailsByYear)
  .patch(
    auth('updateFestArchives'),
    validate(festValidation.updateFestArchiveByYear),
    festController.updateFestArchiveByYear
  )
  .delete(
    auth('manageFestArchives'),
    validate(festValidation.deleteFestArchiveByYear),
    festController.deleteFestArchiveByYear
  );

router
  .route('/:festId/years/:year/events')
  .get(validate(festValidation.getFestDetailsByYear), festController.getEventsByFestIdAndYear);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Fests
 *   description: Fests management and retrieval
 */

/**
 * @swagger
 * /fests:
 *   post:
 *     summary: Create a fest
 *     description: Only admins can create fests.
 *     tags: [Fests]
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
 *             properties:
 *               name:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *                 format: uri
 *               subtitle:
 *                 type: string
 *             example:
 *               name: Concetto
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Fest'
 *       "400":
 *         $ref: '#/components/responses/DuplicateFest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all fests
 *     tags: [Fests]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fest'
 */

/**
 * @swagger
 * /fests/{festId}:
 *   get:
 *     summary: Get details of the latest year of a fest
 *     tags: [Fests]
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
 *       - in: query
 *         name: latest
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: If latest is true, then returns the details of latest year of fest, otherwise returns common details.
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/FestArchive'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a fest
 *     description: Admin can update any fest but moderator can update only those fests that are moderated by them.
 *     tags: [Fests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logoUrl:
 *                 type: string
 *                 format: uri
 *               subtitle:
 *                 type: string
 *             example:
 *               name: Concetto
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Fest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a fest
 *     description: Only admin can delete any fest.
 *     tags: [Fests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
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
 * /fests/{festId}/events:
 *   get:
 *     summary: Get events of a fest
 *     tags: [Fests, Events]
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
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
 * /fests/{festId}/years:
 *   post:
 *     summary: Add an year for a fest
 *     description: Only admins can add an year for fest.
 *     tags: [Fests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - year
 *               - start
 *               - end
 *             properties:
 *               year:
 *                 type: string
 *               start:
 *                 type: string
 *                 format: date-time
 *               end:
 *                 type: string
 *                 format: date-time
 *               coreTeam:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contact'
 *               tagline:
 *                 type: string
 *               participants:
 *                 type: string
 *               about:
 *                 type: string
 *               website:
 *                 type: string
 *               mail:
 *                 type: string
 *               facebook:
 *                 type: string
 *               androidApp:
 *                 type: string
 *             example:
 *               year: 2022
 *               start: 2022-01-20T16:23:56.057Z
 *               end: 2022-01-20T21:23:56.057Z
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/FestArchive'
 *       "400":
 *         $ref: '#/components/responses/DuplicateFestArchive'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all years in which the fest was held
 *     tags: [Fests]
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Year'
 */

/**
 * @swagger
 * /fests/{festId}/years/{year}:
 *   get:
 *     summary: Get details of a particular year of a fest
 *     tags: [Fests]
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: year
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/FestArchive'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a fest archive
 *     description: Admin can update any fest but moderator can update only those fests that are moderated by them.
 *     tags: [Fests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: year
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start:
 *                 type: string
 *                 format: date-time
 *               end:
 *                 type: string
 *                 format: date-time
 *               coreTeam:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Contact'
 *               tagline:
 *                 type: string
 *               participants:
 *                 type: string
 *               about:
 *                 type: string
 *               website:
 *                 type: string
 *               mail:
 *                 type: string
 *               facebook:
 *                 type: string
 *               androidApp:
 *                 type: string
 *             example:
 *               start: 2022-01-20T16:23:56.057Z
 *               end: 2022-01-20T21:23:56.057Z
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Fest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a fest archive
 *     description: Only admin can delete any fest.
 *     tags: [Fests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: year
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
 * /fests/{festId}/years/{year}/events:
 *   get:
 *     summary: Get events of a fest archive
 *     tags: [Fests, Events]
 *     parameters:
 *       - in: path
 *         name: festId
 *         required: true
 *         schema:
 *           type: string
 *         description: Fest id
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: year
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
