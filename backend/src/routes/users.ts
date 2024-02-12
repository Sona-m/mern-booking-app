import express, { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import {check , validationResult} from 'express-validator';

const router = express.Router();

// Defining a route for user registration using POST method
// '/api/users/register'  then run this
router.post('/register',[
    // express-validator
    check('firstName' , 'First Name is required').isString(),
    check('lastName' , 'Last Name is required').isString(),
    check('email' , 'Please enter a valid email').isEmail(),
    check('password' , 'Password must be atleast 6 characters').isLength({min : 6})
] ,
async (req: Request, res: Response) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()){  // error found -send 400 with error message
        return res.status(400).json({message : errors.array()})
    }
  try {
    // check if user with email already exists
    let user = await User.findOne({
      email: req.body.email,
    });

    // If the user already exists, return a 400 Bad Request response
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // If the user does not exist, create a new User instance with the request body data
    user = new User(req.body);

    // Save the new user to the database
    await user.save();
    
    // after saving the user generate token for the user
    const token = jwt.sign(
        {userId : user.id},
        process.env.JWT_SECRET_KEY as string,
        {expiresIn : '1d'}
    )
   
    // it will save in the cookie
    res.cookie('auth_token' , token , {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        maxAge : 86400000
    })

    return res.status(200).send({message : 'User Registered OK'})

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;
