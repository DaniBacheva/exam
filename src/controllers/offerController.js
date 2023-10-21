const router = require("express").Router();
const offerManager = require('../manager/offerManager');
const { getErrorMessage } = require('../util/errorHandler');

router.get("/catalog", async (req, res) => {
    try {
        const offers = await offerManager.getAll().lean();
       // console.log({ offers })

        res.render("offers/catalog", { offers });
    }
    catch (error) {
        res.status(400).render('offers/catalog', { error: getErrorMessage(error) });
    }
});

router.get('/create', (req, res) => {
    res.render('offers/create');
});

router.post('/create', async (req, res) => {
    const { name,
        type,
        damages,
        image,
        description,
        production,
        exploitation,
        price
    } = req.body;

    console.log(req.body);
    const offerData = { name, type, damages, image, description, production, exploitation, price, owner: req.user };

    try {
        await offerManager.create(offerData);
        res.redirect('/offers/catalog');

    }
    catch (error) {
        res.status(400).render('offers/create', { error: getErrorMessage(error) });
    }
});

router.get('/:offerId/details', async (req, res) => {
    const offerId = req.params.offerId;

    try {
        const offer = await offerManager.getOne(offerId).lean();
        const { user } = req;
        const { owner } = offer;
        const isOwner = user?._id === owner.toString();
      //  console.log(isOwner)
        res.render('offers/details', { offer, isOwner });
    }
    catch (error) {
        res.status(400).render('offers/details', { error: getErrorMessage(error) });
    }
});

router.get('/:offerId/edit', async (req, res) => {
    const offerId = req.params.offerId;

    try {
        const offer = await offerManager.getOne(offerId).lean();
        res.render('offers/edit', { offer })
    }
    catch (error) {
        res.status(400).render('offers/details', { error: getErrorMessage(error) });
    }
});

router.post('/:offerId/edit', async(req, res) => {
    const offerId = req.params.offerId;
    const { name,
        type,
        damages,
        image,
        description,
        production,
        exploitation,
        price
    } = req.body;
    
    console.log(req.body);
    const payload = {  name,
        type,
        damages,
        image,
        description,
        production,
        exploitation,
        price
    }

    try {
        await offerManager.update( offerId, payload);
        res.redirect(`/offers/${offerId}/details`);
    }
    catch(error) {
        res.status(400).render(`offers/${offerId}/details`, { error: getErrorMessage(error) });
    }
})

router.get('/:offerId/delete', async (req,res)=> {
    const offerId = req.params.offerId;
try{ 
    await offerManager.delete(offerId);
    res.redirect('/offers/catalog');
}
catch (error) {
    res.status(400).render(`offers/${offerId}/details`, { error: getErrorMessage(error) });
}
})


module.exports = router;