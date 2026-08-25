import http from 'http'
import fs from 'fs'
import { handleRoutes } from './routes/api.js'
import users from './users/users.js'

fs.readFile('./users.json', 'utf8', (err, data) => {
    if (!err) {
        const loadedUsers = JSON.parse(data);
        users.push(...loadedUsers);
        console.log(`✅ Loaded ${users.length} users from file`);
    } else {
        console.log('📝 No users file found, starting fresh');
    }
});


const server = http.createServer((req, res) =>{
handleRoutes(req,res)
})

const port = 3000 

server.listen(port, console.log(`server is running in port ${port}`)) 