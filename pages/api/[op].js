
import db from 'db/sqlite'


export default function handler(req, res) {

    console.log(req.query.op)
    if (req.query.op == 'ping') {
        res.status(200).json({hello:'foo'})
    }
    else if (req.query.op == 'reset') {
        create_db()
        res.status(200).json({status:'ok'})
    }
    else if (req.query.op == 'create') {
    }
    else if (req.query.op == 'update') {
    }
    else if (req.query.op == 'delete') {
    }
    else if (req.query.op == 'query') {
        res.status(200).json(query())
    }
    else{
        res.status(405).json()
    }
}
