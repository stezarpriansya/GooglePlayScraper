const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const gplay = require('google-play-scraper')
const PORT = process.env.PORT || 5000
express()
	.use(morgan('dev'))
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // .get('/', (req, res) => res.render('pages/index', {initialText: '', translatedText: ''}))
	.get('/', (req, res) => res.render('pages/index'))
	.get('/translate', function(req, res){
				var appid = req.query.appid
		    var lang = req.query.langu
		    var sort = req.query.sort
		    var page = parseInt(req.query.page)

		    switch(sort){
		        case 'newest':
		            sort = gplay.sort.NEWEST
		            break
		        case 'rating':
		            sort = gplay.sort.RATING
		            break
		        case 'helpfulness':
		            sort = gplay.sort.HELPFULNESS
		            break
		        default:
		            sort = gplay.sort.NEWEST
		    }

		    gplay.reviews({
		        appId: appid,
		        lang: lang || 'en',
		        sort: sort || gplay.sort.NEWEST,
		        page: page || 0
		    }).then(function(resolve){
		        res.json(resolve)
		    }).catch(function(reject){
		        res.json({err:true,msg: appid + ' is not a valid application id'})
		    })

	})
	.listen(PORT, () => console.log(`Listening on ${ PORT }`))
