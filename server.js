//Install express server
const express = require('express');
const app = express();

// Serve only the static files form the dist directory

app.use(express.static('./dist/smarteduc-front'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/smarteduc-front/'}
  );
  });

app.listen(process.env.PORT || 8080);