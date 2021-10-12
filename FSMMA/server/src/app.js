const express = require('express'),
      cors = require('cors'),
      logger = require('morgan'),
      accountRouter = require('./router/router')
      PORT = process.env.PORT || 5556
      require('./mongooseConnection')

const app = express()
app.use(cors())
app.use(express.json())
app.use(accountRouter)


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
