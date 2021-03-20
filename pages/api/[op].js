
import db from 'db/sqlite'

function resetdb() {

}


export default function handler(req, res) {

    console.log(req.query.op)
    if (req.query.op == 'ping') {
        res.status(200).json({hello:'foo'})
    }
    else{
        res.status(405).json()
    }

/*     db.serialize(function() {
        db.run("CREATE TABLE lorem (info TEXT)");
      
        var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i);
        }
        stmt.finalize();
      
        db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
            console.log(row.id + ": " + row.info);
        });
    });
 */      
}
