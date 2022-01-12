const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const achievementValidation = require('../../validations/achievement.validation');
const achievementController = require('../../controllers/achievement.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageAchievements'),
    validate(achievementValidation.createAchievement),
    achievementController.createAchievement
  );

router
  .route('/:achievementId')
  .get(validate(achievementValidation.getAchievementDetails), achievementController.getAchievementDetails)
  .patch(
    auth('manageAchievements'),
    validate(achievementValidation.updateAchievement),
    achievementController.updateAchievement
  )
  .delete(
    auth('manageAchievements'),
    validate(achievementValidation.deleteAchievement),
    achievementController.deleteAchievement
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Achievements
 *   description: Achievements management and retrieval
 */

/**
 * @swagger
 * /achievements:
 *   post:
 *     summary: Create an achievement
 *     description: Only admins / moderators can create achievements.
 *     tags: [Achievements]
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
 *               - imageUrl
 *               - club
 *             properties:
 *               title:
 *                 type: string
 *               details:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *               club:
 *                 type: string
 *             example:
 *               title: Test achievement
 *               details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 *               imageUrl: https://via.placeholder.com/350x150
 *               club: cyber-labs
 *
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Achievement'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /achievements/{achievementId}:
 *   get:
 *     summary: Get details of an achievement
 *     tags: [Achievements]
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema:
 *           type: string
 *         description: Achievement id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Achievement'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an achievement
 *     description: Admin can update any achievement but moderator can update achievements of those clubs that are moderated by them.
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema:
 *           type: string
 *         description: Achievement id
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
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *               club:
 *                 type: string
 *             example:
 *               title: Test achievement
 *               details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 *               imageUrl: https://via.placeholder.com/350x150
 *               club: cyber-labs
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Achievement'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a achievement
 *     description: Admin can delete any achievement but moderator can delete achievements of only the clubs moderated by them.
 *     tags: [Achievements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: achievementId
 *         required: true
 *         schema:
 *           type: string
 *         description: Achievement id
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
