import fs from 'fs/promises';

const PAGES_PATHS = {
    'homepage': './views/homepage.html'
};

const STYLESHEETS_PATHS = {
    '/styles/site.css': './styles/site.css'
};

async function serveFile (res, filePath, contentType) {
    const fileContent = await fs.readFile(filePath, 'utf-8');

    res.writeHead(200, { 'content-type': contentType });
    res.write(fileContent);
}

async function servePage (res, endpoint) {
    let pagePath;

    if (endpoint === '/') pagePath = PAGES_PATHS.homepage;

    await serveFile(res, pagePath, 'text/html');
}

async function serveStylesheet (res, endpoint) {
    const stylesheetPath = STYLESHEETS_PATHS[endpoint];
    await serveFile(res, stylesheetPath, 'text/css');
}

export const serve = {
    page: servePage,
    stylesheet: serveStylesheet
};