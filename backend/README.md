# Backend using Express + Node.js

### Models:

- user:
  -> username, email, pwsd, followers, following,timestamps
- post:
  -> text, img, userDetails, likes, comment(user, text)

### Packages used:

- Express
- Mongoose
- nodemon
- bcryptjs
- cors
- cookie-parser
- dotenv
- json web token

### Install Dependencies

```bash
npm install express
npm install mongoose
npm install dotenv
npm install cors
npm install bcryptjs
npm install cookie-parser
npm install cloudinary
npm install -D nodemon
```

### Environment Variables(.env):

```env
PORT=
MONGO_DB_URL=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_SECRET=
CLOUDINARY_SECRET_APIKEY=
```
