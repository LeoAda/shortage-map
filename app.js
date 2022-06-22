const express = require("express");
const path = require("path");
const app = express();

//app.use(express.json());
app.use(express.static(__dirname));
const port = 3000;
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
});
app.listen(port, () => console.log(`Server listening on port ${port}`));
