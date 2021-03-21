
import {create_db, del, insert, query, update} from 'db/sqlite'

export default async function handler(req, res) {

    console.log(req.query.op)
    if (req.query.op == 'ping') {
        res.status(200).json({hello:'foo'})
    }
    else if (req.query.op == 'reset') {
        await create_db()
        res.status(200).json(await query())
    }
    else if (req.query.op == 'insert') {
        insert(req.body)
        res.status(200).json({status:'ok'})
    }
    else if (req.query.op == 'update') {
        update(req.body)
        res.status(200).json({status:'ok'})
    }
    else if (req.query.op == 'delete') {
        del(req.body)
        res.status(200).json({status:'ok'})
    }
    else if (req.query.op == 'query') {
        res.status(200).json(await query())
    }
    else{
        res.status(405).json()
    }
}
