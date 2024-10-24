import express from "express"
import mongoose, { mquery } from "mongoose"
import cors from "cors"
import { nanoid } from "nanoid"
import dotenv from "dotenv"
import QRCode from 'qrcode';


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// database connnection 
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected Successfully..."))
    .catch((err) => console.log("Failed to connect..", err))

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    clicks: { type: Number, default: 0 },
})

const Url = mongoose.model('Url', urlSchema)

app.post('/api/short', async (req, res) => {
    try {
        const { originalUrl } = req.body

        if (!originalUrl) {
            res.status(200).json({ error: "Original url error..." })
        }

        const shortUrl = nanoid(8)
        const url = new Url({ originalUrl, shortUrl })
        const myUrl = `http://localhost:3000/${shortUrl}`

        const qrcodeImg = await QRCode.toDataURL(myUrl)

        await url.save()

        return res.status(200).json({ message: "Url Generated", shortUrl: myUrl, qrcodeImg })
    } catch (error) {
        console.log(error)
        res.status(200).json({ error: "server error..." })
    }
})

app.get('/:shortUrl', async (req, res) => {
    try {
        const { shortUrl } = req.params
        const url = await Url.findOne({ shortUrl })

        console.log(`Url Found: ${url}`);

        if (url) {
            url.clicks++
            await url.save()
            return res.redirect(url.originalUrl)
        } else {
            return res.status(404).json({ error: "Url not found" })
        }

    } catch (error) {
        console.log(error)
        res.status(200).json({ error: "server error..." })
    }
})

app.listen(3000, () => {
    console.log(`Server is running on 3000`)
})