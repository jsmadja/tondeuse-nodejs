const express = require('express');

const Repository = require('../repository');
const Mower = require('../domain/mower');
const Program = require('../domain/program').Program;
const RestClient = require('../clients/rest-client');
const InternationalMowerAgencyClient = new RestClient('https://jsonplaceholder.typicode.com');

/**
 * @swagger
 * definitions:
 *   Mower:
 *     properties:
 *       id:
 *         type: number
 *       x:
 *         type: number
 *       y:
 *         type: number
 *       orientation:
 *         type: string
 *         $ref: '#/definitions/Orientation'
 *
 *   Orientation:
 *     type: string
 *     enum: [N, E, W, S]
 *
 *   Instruction:
 *     type: string
 *     enum: [A, G, D]
 *
 *   Program:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Instruction'
 *
 */

const router = express.Router(); // eslint-disable-line new-cap

/**
 * @swagger
 * /mower/{id}:
 *   get:
 *     tags:
 *       - Mower
 *     description: Get a mower
 *     summary: Get mower information
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Mower id
 *         required: true
 *         type: number
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A mower
 *         schema:
 *           $ref: '#/definitions/Mower'
 */
router.get('/:id', (req, res) => res.json(Repository.getMowerById(req.params.id)));

/**
 * @swagger
 * /mower:
 *   post:
 *     tags:
 *       - Mower
 *     description: Create a mower
 *     summary: Create a mower
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully created
 *         schema:
 *           $ref: '#/definitions/Mower'
 *
 */
router.post('/', async (req, res) => {
    const mower = new Mower(Repository.nextMowerId());
    Repository.saveMower(mower);
    try {
        await InternationalMowerAgencyClient.post('/posts', mower);
        res.json(mower);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /mower/{id}:
 *   put:
 *     tags:
 *       - Mower
 *     description: Program instructions
 *     summary: Start mowing with a set of instructions
 *     parameters:
 *       - name: program
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Program'
 *     responses:
 *       200:
 *         description: Successfully programmed
 */
router.put('/:id', (req, res) => {
    const mower = Repository.getMowerById(req.params.id);
    mower.startProgram(new Program(req.body));
    res.sendStatus(200);
});

module.exports = router;
