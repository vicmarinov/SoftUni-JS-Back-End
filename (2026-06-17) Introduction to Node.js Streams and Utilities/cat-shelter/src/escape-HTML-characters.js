export function escapeHTMLCharacters (text) {
    if (!text) return text;
    
    const escapeCharacters = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };

    return text.replaceAll(/[&<>"'/]/g, char => escapeCharacters[char]);
}