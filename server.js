//configurando o servidor
const express = require("express")

const server = express()

//configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

//configurar o servidor para apresentar arquivos extras
server.use(express.static('public'))

//habilitar body do formulário
server.use(express.urlencoded({
    extended: true
}))

//configurar a coneçaõ com banco de dados
const pool = require('pg').pool

const db = {
    user: 'postgres',
    password: 'youdb',
    host: 'localhost',
    port: 5432,
    database: 'doe'
}



//configurar a apresentação da pagina
server.get("/", function (req, res) {
    pool.query("SELECT * FROM donors", function (err) {
        if (err) return res.send("erro no banco de dados")
        const donors = result.rows
        return res.render("index.html", {
            donors


        })

    })

    return res.redirect("/")
})
server.post("/", function (req, res) {
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos od campos são obrigatórios")
    }


    //coloca valores dentro do banco de dados
    const query = `
            INSERT INTO donors ("name", "email", "blood")
            VALUES($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function (err) {
        //fluxo de erro
        if (err) return res.send("erro no banco de dados")

        //fluxo ideal
        return res.redirect("/")

    })

})
//ligar o servidor na porta 3000
server.listen(3000, function () {
    console.log("iniciei o servidor")
})