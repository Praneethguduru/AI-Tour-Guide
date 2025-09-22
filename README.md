# AI-Tour-Guide

**AI-Tour-Guide** is an intelligent chatbot that helps users plan tours, explore travel destinations, and get personalized travel advice. Built with a transformer-based model using **RAG (Retrieval-Augmented Generation)**, it provides accurate, context-aware responses from large travel datasets.

## Features

* Personalized tour recommendations based on user preferences.
* Interactive Q\&A for travel-related queries.
* Offline dataset support for local deployment.
* Fast, streamed responses for real-time interaction.

## Tech Stack

* **Backend:** Python, Flask
* **Frontend:** React.js
* **ML Model:** Mistral-7B-Travel
* **Data Storage:** Local datasets / optional database

## Installation

1. **Clone the repository:**

```bash
git clone <repository_url>
cd AI-Tour-Guide
```

2. **Set up backend environment:**

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/macOS
venv\Scripts\activate      # Windows
pip install -r requirements.txt
```

3. **Set up frontend environment:**

```bash
cd ../frontend
npm install
npm start
```

## Usage

1. Start the Flask backend:

```bash
python backend/app.py
```

2. Open the frontend in your browser (usually `http://localhost:3000`).
3. Type your travel queries and get responses streamed from the AI.

## Project Structure

```
AI-Tour-Guide/
├── backend/
│   └── app.py           # Flask backend
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Chatbot.jsx
│   │   └── styles/chatbot.css
│   ├── package.json
│   └── index.js
└── README.md
```

## Future Improvements

* Add voice input/output for a fully interactive experience.
* Integrate live map visualization for suggested itineraries.
* Expand dataset for global destinations and local experiences.


