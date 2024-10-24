import axios from "axios"
import { useState } from "react"

export default function App() {

  const [originalUrl, setOriginalUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const handleSubmit = () => {
    axios.post('http://localhost:3000/api/short', { originalUrl })
      .then((res) => {
        setShortUrl(res.data)
        console.log(`Api response: ${res.data}`);
      })
      .catch((err) => console.log(err))
    console.log(originalUrl)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">URL Shortner</h1>

        <div onSubmit={handleSubmit} className="flex flex-col space-y-4">

          <input
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            type="text"
            placeholder="Enter the URL to short"
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="originalUrl"
          />

          <button className="bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700"
            type="button"
            onClick={handleSubmit}>

            Shorten</button>

          {
            shortUrl && (
              <div className="mt-6 text-center">
                <p className="text-lg font-medium">Short URL </p>
                <a
                  className="text-blue-500 mt-2"
                  href={shortUrl?.shortUrl}
                  target="_blank"
                >
                  {shortUrl?.shortUrl}
                </a>
                <div className="flex items-center justify-center mt-4">  {/* Centering QR code */}
                  {
                    shortUrl && <img src={shortUrl.qrcodeImg} alt="qrcode" />
                  }
                </div>
              </div>
            )
          }

        </div>

      </div>


    </div>
  )
} 