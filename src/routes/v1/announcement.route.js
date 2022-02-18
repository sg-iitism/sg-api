const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const announcementValidation = require('../../validations/announcement.validation');
const announcementController = require('../../controllers/announcement.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageAnnouncements'),
    validate(announcementValidation.createAnnouncement),
    announcementController.createAnnouncement
  )
  .get(validate(announcementValidation.getAnnouncements), announcementController.getAnnouncements);

router
  .route('/:announcementId')
  .get(validate(announcementValidation.getAnnouncementDetails), announcementController.getAnnouncement)
  .patch(
    auth('manageAnnouncements'),
    validate(announcementValidation.updateAnnouncement),
    announcementController.updateAnnouncement
  )
  .delete(
    auth('manageAnnouncements'),
    validate(announcementValidation.deleteAnnouncement),
    announcementController.deleteAnnouncement
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: Announcement management and retrieval
 */

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create a announcement
 *     description: Only admins can create announcements.
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - details
 *             properties:
 *               title:
 *                 type: string
 *               details:
 *                 type: string
 *             example:
 *               title: Sample title
 *               details: Sample details
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Announcement'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all announcements
 *     description: Anyone can retrieve all announcements.
 *     tags: [Announcements]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Announcement title
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of announcements
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Announcement'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 */

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Get a announcement
 *     description: Anyone can fetch details of an announcement.
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Announcement'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a announcement
 *     description: Admins can update announcements.
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               details:
 *                 type: string
 *             example:
 *               title: Sample title
 *               details: Sample details
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Announcement'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a announcement
 *     description: Admins can delete announcements.
 *     tags: [Announcements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Announcement id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
