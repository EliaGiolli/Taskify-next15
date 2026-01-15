
const sql = require('better-sqlite3');
//Creates a new database if not exists
const db = sql('tickets.db');

const ticketsList= [
  {
        "id": 1,
        "fullname": "Mario Rossi",
        "telephone": "+39 3450098878",
        "brand":"Mercedes",
        "status": "completed",
        "comment": "The user reported that he cannot log in into his profile because he lost his password. I helped him to create a new one"
    },
    {
        "id": 2,
        "fullname": "Franz Beckenbauer",
        "telephone": "+49 3450098878",
        "brand":"Volkswagen",
        "status": "completed",
        "comment": "The user reported that he cannot find his profile. I created a new one with Active Directory"
    },
    {
        "id": 3,
        "fullname": "Michail Kusnetsov",
        "telephone": "+7 3450098878",
        "brand":"BMW",
        "status": "completed",
        "comment": "The user reported that he cannot connect to the internet. I did a reset of the DNS with the ipconfig /dnsflush command and then tested the connectivity with the ping command"
    },
    {
        "id": 4,
        "fullname": "Daniela Garcia Marquez",
        "telephone": "+52 3450098878",
        "brand":"Tesla",
        "status": "incomplete",
        "comment": "The user reported that he cannot log to the manifacturer's CMS to download her payrolls. The problem is not resolved yet"
    }
]

db.prepare(`
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fullname TEXT NOT NULL,
        telephone TEXT NOT NULL UNIQUE,
        brand  TEXT NOT NULL,
        status TEXT NOT NULL,
        comment TEXT NOT NULL
    )
`).run();

async function initData() {
    const stmt = db.prepare(`
        INSERT INTO tickets VALUES (
            null,
            @id,
            @fullname,
            @telephone,
            @brand,
            @status,
            @comment
        )
     `);
    
    for (const ticket of ticketsList) {
        stmt.run(ticket);
    }
}

initData();