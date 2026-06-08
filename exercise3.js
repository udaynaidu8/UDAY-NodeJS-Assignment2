const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    let fileName = '';

    if(req.url === '/api/exercise3/pages/home'){
        fileName = 'home.html';
    }
    else if(req.url === '/api/exercise3/pages/about'){
        fileName = 'about.html';
    }
    else if(req.url === '/api/exercise3/pages/contact'){
        fileName = 'contact.html';
    }

    if(fileName !== ''){

        const filePath = path.join(__dirname, 'lib', fileName);

        fs.readFile(filePath, (err, data) => {

            if(err){
                res.writeHead(500);
                res.end('Server Error');
            }
            else{
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end(data);
            }

        });

    }
    else{
        res.writeHead(404);
        res.end('Page Not Found');
    }

});

server.listen(80, () => {
    console.log('Exercise3 Running');
});