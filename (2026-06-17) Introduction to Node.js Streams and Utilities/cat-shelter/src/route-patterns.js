const UUID_PATTERN = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;

export const ROUTE_PATTERNS = {
    editCat: new RegExp(`^/cats/edit/(?<catId>${UUID_PATTERN.source})/?$`, 'i'),
    shelterCat: new RegExp(`^/cats/shelter/(?<catId>${UUID_PATTERN.source})/?$`, 'i')
};