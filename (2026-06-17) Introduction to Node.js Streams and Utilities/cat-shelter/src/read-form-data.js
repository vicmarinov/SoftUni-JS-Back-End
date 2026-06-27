export function readFormData (request) {
    return new Promise((resolve, reject) => {
        let body = '';

        request
            .on('data', chunk => body += chunk)
            .on('end', () => {
                const data = Object.fromEntries(new URLSearchParams(body));
                resolve(data);
            });
    });
}