import fs from 'fs/promises';
import { generateHTMLContent } from './generate-html-content.js';

const PAGES_PATHS = {
    'homepage': './views/homepage.html'
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
    }

    await serveFile(res, pagePath, 'text/html', placeholdersToReplace);
}

async function serveStylesheet (res, endpoint) {
    const stylesheetPath = STYLESHEETS_PATHS[endpoint];
    await serveFile(res, stylesheetPath, 'text/css');
}

export const serve = {
    page: servePage,
    stylesheet: serveStylesheet
};