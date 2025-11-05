import express from 'express'
import {signUp} from "../controller/user.controller.js";
import {logIn} from "../controller/user.controller.js";

const router = express.Router()

router.post('/signup', signUp )
router.post('/login', logIn )

export default router;