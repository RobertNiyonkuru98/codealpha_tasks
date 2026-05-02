const http = require("http")
const fs = require('fs')
const PORT = 3000

const server = http.createServer(function(req, res){

})

server.listen(PORT, function(error){
        if(error){
            console.log("Server couldn't start")
            console.log(error)
        } else {
            console.log("Server has started on port " + PORT)
        }
    })