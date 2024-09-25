import express from "express"

const PORT = 80
const app = express()

app.get("/", function(_req, res){
    res.send("Hello from locally running DNS server 👋.")
})

export const startServer = () => {
    return app.listen(PORT, "0.0.0.0", () => {
        console.info(":) Running Local DNS Server of PORT " + PORT)
    })
}