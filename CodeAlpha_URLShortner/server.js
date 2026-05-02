const http = require("http")
const fs = require('fs')
const PORT = 4000

const server = http.createServer(function(req, res){
    fs.readFile("index.html", function(error, data) {
        if (error){
            fs.readFile("404.html", function(error, data){
                if (error){
                    res.writeHead(500)
                    res.end("Server Error!")
                } else {
                    res.writeHead(404, {'Content-Type': 'text/html'})
                    res.write(data)
                    res.end()
                }
            })
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        }
    })

})

server.listen(PORT, function(error){
        if(error){
            console.log("Server couldn't start")
            console.log(error)
        } else {
            console.log("Server has started on port " + PORT)
        }
    })