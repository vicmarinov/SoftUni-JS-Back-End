import fs from 'fs/promises';
import { generateHTMLContent } from './generate-html-content.js';

const PAGES_PATHS = {
    homepage: './views/homepage.html',
    addBreed: './views/add-breed.html',
    addCat: './views/add-cat.html',
    notFound: './views/not-found.html'
};

const STYLESHEETS_PATHS = {
    '/styles/site.css': './styles/site.css'
};

const JPEG_IMAGES_PATHS = {
    '/assets/no-image-available.jpg': './assets/no-image-available.jpg'
};

async function serveFile (
    res,
    filePath,
    contentType,
    placeholdersToReplace = [],
    encoding = 'utf-8'
) {
    let fileContent = await fs.readFile(filePath, encoding);

    if (encoding === 'utf-8') {
        for (const [placeholder, value] of placeholdersToReplace) {
            fileContent = fileContent.replaceAll(placeholder, value);
        }
    }

    res.writeHead(200, { 'content-type': contentType });
    res.write(fileContent);
}

async function servePage (res, endpoint) {
    let pagePath;
    let placeholdersToReplace = [];

    if (endpoint === '/') {
        pagePath = PAGES_PATHS.homepage;
        placeholdersToReplace.push(
            [
                '{{Cat items}}',
                await generateHTMLContent.homepage()
            ]
        );
    }
    else if (endpoint === '/cats/add-breed') pagePath = PAGES_PATHS.addBreed;
    else if (endpoint === '/cats/add-cat') {
        pagePath = PAGES_PATHS.addCat;
        placeholdersToReplace.push(
            [
                '{{Breed items}}',
                await generateHTMLContent.breedOptions()
            ]
        );
    }
    else pagePath = PAGES_PATHS.notFound;

    await serveFile(res, pagePath, 'text/html', placeholdersToReplace);
}

async function serveStylesheet (res, endpoint) {
    const stylesheetPath = STYLESHEETS_PATHS[endpoint];

    if (!stylesheetPath) {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.write('404 Stylesheet Not Found');
        return;
    }

    await serveFile(res, stylesheetPath, 'text/css');
}

async function serveJPEGImage (res, endpoint) {
    const imagePath = JPEG_IMAGES_PATHS[endpoint];

    if (!imagePath) {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.write('404 Image Not Found');
        return;
    }

    await serveFile(res, imagePath, 'image/jpeg', null, null);
}

export const serve = {
    page: servePage,
    stylesheet: serveStylesheet,
    JPEGImage: serveJPEGImage
};