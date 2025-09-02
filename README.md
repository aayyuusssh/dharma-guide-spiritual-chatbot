**TATVA — Spiritual Guidance Platform**

**Overview**
A React + TypeScript single‑page app that delivers AI‑assisted spiritual guidance inspired by Vedic literature, with a Flask API for responses.

**Tech Stack**

      Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn‑ui, React Router
      
      Backend: Python, Flask, Gunicorn
      
      Hosting: Vercel (frontend), Render (backend)

**Quick Start**

    Frontend
    
    npm install
    
    npm run dev

    Backend
    
    cd backend
    
    pip install -r requirements.txt
    
    python spiritual_api.py

    Configuration
    
    Frontend .env:
    
    VITE_API_BASE_URL=http://localhost:5000 (dev) or your Render URL (prod)
    
    vercel.json:
    
    { "rewrites": [ { "source": "/(.*)", "destination": "/index.html" } ] }

**API**

    GET /api/health — service status
    
    POST /api/spiritual-chat — body: { message, temperature?, top_p?, max_tokens? }

**Deploy**
    
    Frontend: push to repo connected on Vercel
    
    Backend: Render web service; start command: gunicorn spiritual_api:app

**Links**

  App: https://dharma-guide-spiritual-chatbot.vercel.app
  
  API Health: https://tatva-spiritual-backend.onrender.com/api/health


