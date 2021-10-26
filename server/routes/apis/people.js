const router = require('express').Router();

const { People } = require('../../db/database')

// NUNCA NUNCA quites "req, res" aunque no se ocupe
// GET /api/people
router.get('/', async(req, res) => {
    const people = await People.findAll();
    res.json(people);
});

// POST /api/people
/*  nombre: string
    apellido: string
    edad: int   */
router.post('/', async(req, res) => {
    const people = await People.create(req.body);
    res.json(people);
});

// PUT /api/people/peopleId
router.put('/:peopleId', async(req, res) => {
    await People.update(req.body, {
        where: { id: req.params.peopleId }
    });
    res.json({ success: 'Modificacion exitosa' });
});

// DELETE /api/people/peopleId
router.delete('/:peopleId', async(req, res) => {
    await People.destroy({
        where: { id: req.params.peopleId }
    });
    res.json({ success: 'Registro eleiminado' });
});

module.exports = router;