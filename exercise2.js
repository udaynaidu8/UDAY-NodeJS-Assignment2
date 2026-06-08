const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    if (req.url === '/api/exercise2') {

        const filePath = path.join(__dirname, 'lib', 'users.txt');

        fs.readFile(filePath, 'utf8', (err, data) => {

            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Server Error');
                return;
            }

            const lines = data.trim().split('\n');

            let table = '<table border="1">';

            lines.forEach((line, index) => {

                const cols = line.split('|');

                table += '<tr>';

                cols.forEach(col => {

                    if(index === 0){
                        table += `<th>${col.trim()}</th>`;
                    }
                    else{
                        table += `<td>${col.trim()}</td>`;
                    }

                });

                table += '</tr>';

            });

            table += '</table>';

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(table);

        });

    } 
    else {
        res.writeHead(404);
        res.end('Page Not Found');
    }

});

server.listen(80, () => {
    console.log('Exercise2 Running');
});