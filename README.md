# Tweets

Deploying MERN Stack in Render.com

### step-1: server.js (file)

// --------------------Deployment---------------

app.use(express.static(path.join(\_\_dirname, "..", "frontend", "dist")));

app.get("\*", (req, res) => {
res.sendFile(path.join(\_\_dirname, "..", "frontend", "dist", "index.html"));
});

//--------------------Deployment---------------

and

origin: ["http://localhost:5173", "https://tweets-of-messages.onrender.com/"] // add the link cors

### step-2: add the command in package.json (back-end)

"build": "npm install && npm install --prefix ../frontend && npm run build --prefix ../frontend"

### step-3: add link in (front-end) -> context = vite_api_url

render link-> https://tweets-of-messages.onrender.com/

### step-4: after pushint to GITHUB and go to render and add the .env variables from both front and backend
