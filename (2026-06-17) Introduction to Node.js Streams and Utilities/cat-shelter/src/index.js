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

    if (req.url.startsWith('/styles/')) {
        await serve.stylesheet(res, req.url);
        res.end();
        return;
    }

    await serve.page(res, req.url);
    res.end();
});

server.listen(SERVER_PORT, () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}`);
});