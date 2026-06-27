import fs from 'fs/promises';
import { generateHTMLContent } from './generate-html-content.js';

const PAGES_PATHS = {
    homepage: './views/homepage.html',
    notFound: './views/not-found.html'
};

const STYLESHEETS_PATHS = {
    '/styles/site.css': './styles/site.css'
};

async function serveFile (
    res,
    filePath,
    contentType,
    placeholdersToReplace = []
) {
    let fileContent = await fs.readFile(filePath, 'utf-8');

    for (const [placeholder, value] of placeholdersToReplace) {
        fileContent = fileContent.replaceAll(placeholder, value);
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
    } else {
        pagePath = PAGES_PATHS.notFound;
    }

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

export const serve = {
    page: servePage,
    stylesheet: serveStylesheet
};