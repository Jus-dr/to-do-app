import express, { urlencoded } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let todayTasks = [];
let workTasks = [];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

function formatDate(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const day = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
  
    return `${day}, ${month} ${dayOfMonth}`;
  }

app.post("/todayAddTask", (req, res) => {
    const newTask = req.body.newTask;
    if (newTask) {
        todayTasks.push(newTask);
    }
    res.redirect("/");
});

app.post("/workAddTask", (req, res) => {
    const newTask = req.body.newTask;
    if (newTask) {
        workTasks.push(newTask);
    }
    res.redirect("/work");
});

app.get("/",(req,res) => {
    res.render("index.ejs",{date : formatDate(new Date()) , tasks : todayTasks});
})

app.get("/work", (req, res) => {
    res.render("./work.ejs", {date : formatDate(new Date()) , tasks: workTasks });
});

app.listen(port,() => {
    console.log(`Server is working on ${port} port`);
})