const jwt = require('jsonwebtoken');
const db = require('../models')
const bcrypt = require('bcrypt');


require('dotenv').config();


const signup = async(req, res,) => {
    try{
        await bcrypt.hashSync(req.body.password, 10)

        return res.status(201).json({
            status: true,
            message: 'Signup successful',
            user: req.user
        }) 
    } catch (error) {
        res.status(500).json({ status: false, data: error})
    }
}    


const login = async (error, req, res, next, user, info) => {
    try{
        if (error) {
            return next(error);
        }
        if (!user) {
            const error = new Error('Username or password incorrect')
            return next(error)
        }
    
        req.login(user, { session: false },
            async (error) => {
                if (error) return res.status(400).json(error)
        
                const body = { _id: user._id, username: user.username};
        
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: '1h' })
        
                return res.status(200).json({ message: 'Login succesful', token });
            }
        );
    } catch (error) {
        next(error);
    }

}



module.exports = {
    signup,
    login,
};


// exports.signup = async (req, res) => {
//     try{
//         const user = await User.findOne({ username: req.user.username})

//     user.firstname = req.body.firstName
//     user.lastname = req.body.lastName
//     user.email = req.body.email
//     user.password = await bcrypt.hashSync(req.body.password, 10)

//     await user.save()

//     res.status(201).json({
//         message: 'Signup successful',
//         user: user
//     });
//     } catch (erroe) {
//         console.log(error)
//         res.send(error)
//     }
    
// }

// exports.signin = (req, res) => {
//     User.findOne({
//         where: {
//             username: req.body.username
//         }
//     })
//         .then((user) => {
//             if (!user) {
//                 return res.status(404).send({ message: "User not found"});
//             }
//             const passwordIsValid = bcrypt.compareSync(
//                 req.body.password,
//                 user.password
//             );

//             if (!passwordIsValid) {
//                 return res.status(401).send({
//                     message: "Invalid Password!"
//                 });
//             }

//             const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'something_secret', {expiresIn: '1h'});

//                 return res.status(200).json({ token });
        

//         })
// }

// exports.login = (req, res, { err, user, info}) => {

//     if (!user) {
//         return res.json({ message: 'Username or password is incorrect'})
//     }

//     // req.login is provided by passport
//     req.login(user, { session: false },
//         async (error) => {
//             if (error) return res.status(400).json(error)

//             const body = { _id: user.id, username: user.username };
//             //You store the id and username in the payload of the JWT. 
//             // You then sign the token with a secret or key (JWT_SECRET), and send back the token to the user.
//             // DO NOT STORE PASSWORDS IN THE JWT!
//             const token = jwt.sign({ user: body }, process.env.JWT_SECRET || 'something_secret');

//             return res.status(200).json({ token });
//         }
//     );
//}
