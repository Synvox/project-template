import  {Router} from 'express'
const router = Router()

const hash = 'xxxxxx'.replace(/x/g, ()=>`${(Math.random()*16|0).toString(16)}`)

router.get('/*', function(req, res) {
  res.render('index', { title: 'App', hash })
})

export default router
