const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')



//Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK')
})


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
