import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'GET') {
        try {
            const response = await fetch(`https://api.github.com/users/${req.query.username}`);
            const user = await response.json();
            if(user.message) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ valid: false, message: `Username ${req.query.username} does not exist.` }));
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ valid: true, message: `Username valid` }));
            }
        } catch(e) {
            if(e.status === 500) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Some error occurred. Please try after some time.' }));
            }
        }
    }
}