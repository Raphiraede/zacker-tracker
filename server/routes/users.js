var express = require('express');
const {OAuth2Client} = require('google-auth-library');
var router = express.Router();

async function verifyTokenAndLogInOrRegister(idToken, clientId) {
  const client = new OAuth2Client(clientId)
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: clientId
  });
  const payload = ticket.getPayload();
  const userId = payload['sub'];
  console.log(payload)
  console.log(userId)
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/google-sign-in', function(req, res, next){
  //Client ID unique to https://zacker-tracker.herokuapp.com/
  const clientId = "577630866973-k79pd0gm56ejomv467j4c00o638vov4c.apps.googleusercontent.com"
  verifyTokenAndLogInOrRegister(idToken, clientId).catch(console.error)
})

module.exports = router;