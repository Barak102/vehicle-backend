import {Request,Response} from 'express';


const logger = (req: Request,res: Response,next: any) => {
    console.log(`Logger middleware: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
};

export default logger;