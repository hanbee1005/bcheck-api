const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

const corsOptions = {
    origin: "http://localhost:3030"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to bcheck application"})
})

const PORT = process.env.PORT || 9090
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
