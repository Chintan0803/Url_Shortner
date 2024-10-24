# URL Shortener with QR Code Generation

This project is a URL shortening service with additional functionality to generate QR codes for the shortened URLs. The backend is built using **Express** and **MongoDB**, while the frontend is developed with **React**. Users can input a long URL, receive a shortened version, and optionally use a QR code to access the shortened URL.

## Features
- **URL Shortening**: Convert long URLs into shorter, easily shareable ones.
- **QR Code Generation**: A QR code is automatically generated for each shortened URL.
- **Click Tracking**: The application tracks the number of times a shortened URL is accessed.
- **Redirect**: Automatically redirects users to the original URL when the shortened version is accessed.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Tailwind CSS**: For styling the UI components.
- **Axios**: For making HTTP requests to the backend.

### Backend
- **Express.js**: For handling HTTP requests and routing.
- **MongoDB**: For storing original and shortened URLs.
- **Mongoose**: For interacting with MongoDB.
- **nanoid**: For generating unique short URLs.
- **QRCode**: For generating QR codes from shortened URLs.

