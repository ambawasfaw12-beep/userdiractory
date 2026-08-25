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
        console.log("CSS requested:", pathname);
        const filePath = `.${pathname}`;
        console.log("Looking for:", filePath);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {

                res.statusCode = 404;
                res.end('File not found');
            } else {

                res.setHeader('Content-Type', 'text/css');
                res.end(data);
            }
        });
    }

    else if (pathname === '/signup.html') {
        fs.readFile('./doc/signup.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('Server Error')
            } else {
                res.setHeader('Content-Type', 'text/html')
                res.end(data)
            }
        })
    }

else if (pathname === "/users") {
    // 1. Build HTML for each user
    let userListHTML = '';
    users.forEach(user => {
        userListHTML += `
            <div class="user-item">
                <a href="/user?id=${user.id}">${user.name}</a>
                <span>${user.age}</span>
                <span>${user.city}</span>
            </div>
        `;
    });

    // 2. Send the complete page
    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>All Users</title>
            <link rel="stylesheet" href="/style/style.css">
        </head>
        <body>
            <nav>
                <div class="flex-box">
                    <div class="logo">
                        <a href="/"><span>User Directory</span></a>
                    </div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/users">All Users</a></li>
                        <li><a href="/signup.html">Sign Up</a></li>
                    </ul>
                </div>
            </nav>
            <main>
                <section class="container">
                    <h2>All Users (${users.length})</h2>
                    ${userListHTML || '<p>No users yet. <a href="/signup.html">Sign up</a> to be the first!</p>'}
                </section>
            </main>
        </body>
        </html>
    `);
}


else if (pathname === "/user") {
    const userId = Number(query.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        // User not found - show 404
        res.statusCode = 404;
        fs.readFile('./doc/404.html', 'utf8', (err, data) => {
            if (err) {
                res.end('<h1>404 - User Not Found</h1>');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
        return;
    }

    // User found - show profile
    res.setHeader('Content-Type', 'text/html');
    res.end(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>${user.name}'s Profile</title>
            <link rel="stylesheet" href="/style/style.css">
        </head>
        <body>
            <nav>
                <div class="flex-box">
                    <div class="logo">
                        <a href="/"><span>User Directory</span></a>
                    </div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/users">All Users</a></li>
                        <li><a href="/signup.html">Sign Up</a></li>
                    </ul>
                </div>
            </nav>
            <main>
                <section class="container">
                    <h1>${user.name}</h1>
                    <div class="profile-card">
                        <p><strong>Age:</strong> ${user.age}</p>
                        <p><strong>City:</strong> ${user.city}</p>
                        <p><strong>ID:</strong> ${user.id}</p>
                    </div>
                    <a href="/users">← Back to All Users</a>
                </section>
            </main>
        </body>
        </html>
    `);
}

else if (pathname === "/signup" && req.method === "POST") {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });
    req.on('end', () => {
        // Parse form data
        const params = new URLSearchParams(body);
        const name = params.get('name');
        const age = Number(params.get('age'));
        const city = params.get('city');

        // Create new user
        const newUser = {
            id: users.length + 1,
            name: name,
            age: age,
            city: city
        };
        users.push(newUser);

        // Save to file
        fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                res.statusCode = 500;
                res.end('Server Error');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(`
                    <h1>Thank you for signing up, ${name}!</h1>
                    <p>Your profile has been created.</p>
                    <a href="/users">View All Users</a>
                `);
            }
        });
    });
}
    
    
    else {
        fs.readFile('./doc/404.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('<h1>404 - Page Not Found</h1>');
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
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