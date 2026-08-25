import http from 'http'
import { handleRoutes } from './routes/api.js'

const server = http.createServer((req, res) =>{
handleRoutes(req,res)
})

const port = 3000 

server.listen(port, console.log(`server is running in port ${port}`)) 