const app1 = require("express")
app.use(express.json())


app.use("/api/authentication", require("./authentication/route"))
