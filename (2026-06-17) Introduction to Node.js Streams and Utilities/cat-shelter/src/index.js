import http from 'http';
import { serve } from './serve-file.js';
import { breedService } from './breed-service.js';
import { readFormData } from './read-form-data.js';
import { catService } from './cat-service.js';

const SERVER_PORT = 5500;

const server = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/cats/add-breed') {
        const newBreedName = (await readFormData(req)).breed;
        await breedService.addNewBreed(newBreedName);
        res.writeHead(303, { location: '/' }).end();
        return;
    }

    if (req.method === 'POST' && req.url === '/cats/add-cat') {
        const newCatData = await readFormData(req);
        await catService.addNewCat(
            newCatData.name,
            newCatData.description,
            newCatData.imageURL,
            newCatData.breedName
        );

        res.writeHead(303, { location: `/` }).end();
        return;
    }

    if (req.method === 'POST' && req.url.startsWith('/cats/edit/')) {
        const endpointRegEx = /^\/cats\/edit\/(?<catId>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i;
        const catId = req.url.match(endpointRegEx)?.groups.catId;
        if (!catId) {
            res.writeHead(303, { location: `/404-not-found` });
            res.end();
            return;
        }

        const newCatData = await readFormData(req);

        try {
            await catService.updateCat(
                catId,
                newCatData.name,
                newCatData.description,
                newCatData.imageURL,
                newCatData.breedName
            );

            res.writeHead(303, { location: `/` }).end();
        } catch (error) {
            res.writeHead(303, { location: `/404-not-found` }).end();
        }

        return;
    }

    if (req.method === 'POST' && req.url.startsWith('/cats/shelter/')) {
        const endpointRegEx = /^\/cats\/shelter\/(?<catId>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i;
        const catId = req.url.match(endpointRegEx)?.groups.catId;
        if (!catId) {
            res.writeHead(303, { location: `/404-not-found` });
            res.end();
            return;
        }

        try {
            await catService.deleteCat(catId);
            res.writeHead(303, { location: `/` }).end();
        } catch (error) {
            res.writeHead(303, { location: `/404-not-found` }).end();
        }

        return;
    }

    if (req.method !== 'GET') {
        res.end();
        return;
    }

    if (req.url.startsWith('/styles/')) {
        await serve.stylesheet(res, req.url);
        res.end();
        return;
    }

    if (req.url.startsWith('/assets/')) {
        await serve.JPEGImage(res, req.url);
        res.end();
        return;
    }

    await serve.page(res, req.url);
    res.end();
});

server.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});