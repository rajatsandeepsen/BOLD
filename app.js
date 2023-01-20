import express from 'express'
import path from 'path'

//resolving root directory ( if using app.sendFile() method, pass this shit as second argument  )
const __dirname = path.resolve();

// create express app
const app = express()
app.listen(5500,"0.0.0.0")
app.set('view engine', 'ejs')// register view engine (install before using it)


console.log('Server Stated')

//middleware
app.use ((req, res, next) => {
    console.log(req.method, req.url)
    next()//allow to run next use()
})
// static files (css, js, images, etc)
app.use(express.static('./views/assets'))



//home page
app.get('/', (req, res) => {    
    res.render('index', {title : 'Home',
        data : [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis."
        ]})
})
app.get('/home', (req, res) => {
    res.redirect('/')
})


app.get('/about', (req, res) => {
    res.render('about', {title : 'About',
        data : [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit, facilis."
        ]
    })
})



//404 page
app.use((req, res) => {
    res.status(404).render('404', {title : '404'})
    // res.sendStatus(404)
})