import fs from 'fs';
import users from '../users/users.js';

export function handleRoutes(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const query = Object.fromEntries(parsedUrl.searchParams);

    if (pathname === "/") {
        fs.readFile('doc/index.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Server Error');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }

    else if (pathname.startsWith("/style/")) {
        console.log("CSS requested:", pathname);  // ← ADD THIS
        const filePath = `.${pathname}`;
        console.log("Looking for:", filePath);   // ← ADD THIS
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log("CSS Error:", err.message);  // ← ADD THIS
                res.statusCode = 404;
                res.end('File not found');
            } else {
                console.log("CSS loaded successfully!");  // ← ADD THIS
                res.setHeader('Content-Type', 'text/css');
                res.end(data);
            }
        });
    }
}





































// import fs from 'fs'
// import users from '../users/users.js'

// export function handleRoutes(req, res) {

//    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
// const pathname = parsedUrl.pathname;
// const query = Object.fromEntries(parsedUrl.searchParams);

//     if (pathname === "/") {
//         fs.readFile('doc/index.html', 'utf8', (err, data) => {
//             if (err) {
//                 res.statusCode = 500;
//                 res.end('Server Error');
//             } else {
//                 res.setHeader('Content-Type', 'text/html');
//                 res.end(data);
//             }
//         });
//     }

//     else if (pathname.startsWith("/style/")) {
//     const filePath = `..${pathname}`;
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             res.statusCode = 404;
//             res.end('File not found');
//         } else {
//             const ext = pathname.split('.').pop();
//             const contentTypes = {
//                 'css': 'text/css',
//                 'js': 'application/javascript',
//                 'png': 'image/png',
//                 'jpg': 'image/jpeg'
//             };
//             res.setHeader('Content-Type', contentTypes[ext] || 'text/plain');
//             res.end(data);
//         }
//     });
// }
// }