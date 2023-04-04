const express = require('express');
const passport = require('passport');


const authRouter = require('./routes/authRoute')
const articleRouter = require('./routes/articleRoute');
const commentRouter = require('./routes/commentRoute')

require('dotenv').config();

require('./middleware/passport');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use('/', authRouter);
app.use("/articles", passport.authenticate('jwt', { session: false }), articleRouter)
app.use("/comments", passport.authenticate('jwt', { session: false }), commentRouter)




app.get('/', (req, res) => {
    res.send('Welcome to the Writing Room')
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        error: error.message
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})