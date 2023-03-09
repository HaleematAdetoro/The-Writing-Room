const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const authRouter = require('./routes/authRoute')
const articleRouter = require('./routes/articleRoute');

require('dotenv').config();

require('./middleware/passport');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use('/', authRouter);
app.use("/articles", articleRouter)




app.get('/', (req, res) => {
    res.send('Welcome to the Writing Room')
});

app.use((error, reg, res, next) => {
    console.log(error);
    res.status(500).json({
        error: error.message
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})