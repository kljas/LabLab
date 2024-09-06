const express = require("express");
const app = express();

const requestTime = (req, res, next) => {
    req.requestTime = Date.now();
    next();
};

app.use(requestTime);

app.use('/user/:id',  (req, res, next)=> {
    console.log('Request Type:', req.method);
    next();
});        

app.get('/user/:id', function (req, res, next) {
    res.send('USER');
});    

app.use(myLogger);

app.use('/static', express.static(__dirname + '/public'));

app.use((req, res, next) => {
    res.status(404).send("Sorry cant find that!");
});


app.get("/", (req, res) => {
    var responseText = "Hello World!<br>";
    responseText += "<small>Requested at: " + req.requestTime + "</small>";
    res.send(responseText);
});    

app.post("/", (req, res) => {
    res.send("Got a POST request");
});

app.post("/user", (req, res) => {
    res.sendStatus(200);
});

app.put("/user", (req, res) => {
    res.send("Got a PUT request at /user");
});
    
app.delete("/user", (req, res) => {
    res.send("Got a DELETE request at /user");
});  
  
app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
