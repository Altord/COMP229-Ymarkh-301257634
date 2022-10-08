/*
* FILE			    :	app.js
* PROJECT			:	COMP229 SEC 402
* PROGRAMMER		:	Yehoshya Markh
* SID               :   301257634
* DATE              :   2022-10-07
*/


// Third Party Modules/Calls
import express from "express";
import cookieParser from "cookie-parser";
import logger from 'morgan';
import session from "express-session";

// ES Modules fix for __dirname, to fix the "ES Module scope" error 
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration Module
import { Secret } from "../config/config.js";

// Import Router
import indexRouter from './routes/index.route.server.js';

// Start server
const app = express();

// setup ViewEngine EJS
app.set('views', path.join(__dirname,'/views')); //To call for views and enable static files
app.set('view engine', 'ejs');

app.use(logger('dev')); //Log
app.use(express.json()); //Recognizes incoming request objects as JSON
app.use(express.urlencoded({ extended: false})); //Recognizes incoming request objects as strings or arrays
app.use(cookieParser()); //Parse cookie header on request and waits for secret
app.use(express.static(path.join(__dirname, '../public'))); //Same for static files
//Looked up on the static files presentation from:  https://expressjs.com/en/starter/static-files.html
//app.use(express.static('public'));
app.use(session({
    secret: Secret,
    saveUninitialized: false,
    resave: false
}));

// Use Routes
app.use('/', indexRouter);


export default app;