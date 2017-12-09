const express = require('express');

const Repository = require('../repository');
const Lawn = require('../domain/lawn');
const Position = require('../domain/position');

/**
 * @swagger
 * definitions:
 *   Lawn:
 *     properties:
 *       id:
 *         type: number
 *       width:
 *         type: number
 *       height:
 *         type: number
 *
 *   LawnCreationProperties:
 *     properties:
 *       width:
 *         type: number
 *       height:
 *         type: number
 *
 *   MowingCreationProperties:
 *     properties:
 *       mower_id:
 *          type: number
 *       x:
 *         type: number
 *       y:
 *         type: number
 *       orientation:
 *         type: string
 *         $ref: '#/definitions/Orientation'
 *
 */

const router = express.Router(); // eslint-disable-line new-cap

/**
 * @swagger
 * /lawn/{id}:
 *   get:
 *     tags:
 *       - Lawn
 *     description: Get a lawn
 *     summary: Get a lawn (Not Yet Implemented)
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Lawn id
 *         required: true
 *         type: number
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A lawn
 *         schema:
 *           $ref: '#/definitions/Lawn'
 */
router.get('/:id', (req, res, next) => {
    next();
});

/**
 * @swagger
 * /lawn:
 *   post:
 *     tags:
 *       - Lawn
 *     description: Create a lawn
 *     summary: Create a lawn
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lawn properties
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/LawnCreationProperties'
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Lawn'
 *
 */
router.post('/', (req, res) => {
    const lawn = new Lawn(Repository.nextLawnId(), req.body.width, req.body.height);
    Repository.saveLawn(lawn);
    return res.json(lawn);
});

/**
 * @swagger
 * /lawn/{id}/mowers:
 *   post:
 *     tags:
 *       - Lawn
 *     description: Put a mower on a lawn
 *     summary: Put a mower on a lawn
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Lawn id
 *         required: true
 *         type: number
 *       - name: mowing properties
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/MowingCreationProperties'
 *     responses:
 *       200:
 *         description: Successfully put
 *
 */
router.post('/:id/mowers', (req, res) => {
    if (!req.params.id || !req.body.mower_id) {
        return res.status(403);
    }
    const lawn = Repository.getLawnById(req.params.id);
    const mower = Repository.getMowerById(req.body.mower_id);
    mower.putOnLawnAt(lawn, new Position(req.body.x, req.body.y, req.body.orientation));
    res.sendStatus(200);
});

module.exports = router;
