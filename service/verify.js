const auth = require('../utils/auth');
const util = require('../utils/util');

function verify(reqBody) {
  if (!reqBody.user || !reqBody.user.username || !reqBody.token)
    return util.buildResponse(401, {
      verified: false,
      message: "Incorrect request body."
    });
  
  const { user, token } = reqBody;
  const verification = auth.verifyToken(user.username, token);
  if (!verification.verified)
    return util.buildResponse(401, verification);

  return util.buildResponse(200, {
    verified: true,
    message: "Success",
    user,
    token
  });
}

module.exports.verify = verify;