const express = require('express')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './views/pages')

// Basic route
app.get('/', (req, res) => {
    res.render('index.ejs', {
        title: 'Home'
    })
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Project Page
app.get('/project', (req, res) => {
    res.render('project.ejs', {
        title: 'Project'
    })
})

app.use(express.static('static'));