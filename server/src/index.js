const express = require('express');
const cors = require('cors');

app = express();

app.use(express.json());
app.use(cors());

const db = require("../models");

//routes
const UserRouter = require('./routes/Users');
app.use("/auth", UserRouter)
const AnnouncementRouter = require('./routes/Announcements');
app.use("/announcements", AnnouncementRouter)
const LogbookRouter = require('./routes/Logbook');
app.use("/logbook", LogbookRouter)
const FileUpload = require('./routes/FileUpload');
app.use("/fileupload", FileUpload)
const FieldSupervisor = require('./routes/FieldSupervisor');
app.use("/fieldsupervisor", FieldSupervisor)
const AcademicSupervisor = require('./routes/AcademicSupervisor');
app.use("/academicsupervisor", AcademicSupervisor)
const Admin = require('./routes/Admin');
app.use("/admin", Admin)
const StudentMarks = require('./routes/StudentMarks');
app.use("/studentmarks", StudentMarks)

db.sequelize.sync().then(() => {
    app.listen(3001, (req, res)=>{
        console.log("Express backend running on port 3001")
    })
})