import express from 'express'
import morgan from 'morgan'

import {join,dirname} from 'path'
import {fileURLToPath} from 'url'
import {engine} from 'express-handlebars'


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('port', process.env.PORT || 3000 )
app.set('views', join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get ('views'), 'layauts'),
    partialsDir: join(app.get ('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false}))
app.use(express.json());

app.get('/',(req,res) => {
res.json({"message": "Hola Mundo"})
});

app.use(express.static(join(__dirname, 'public')))

app.listen(app.get('port'),() => {
console.log('server listening on port', app.get('port'));
} );
