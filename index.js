const connectDB = require('./config/db');
const util = require('./utils/util');

const loginService = require('./service/login');
const registerService = require('./service/register');
const verifyService = require('./service/verify');

const registerPath = '/register';
const loginPath = '/login';
const verifyPath = '/verify';
const randomPath = '/random';

exports.handler = async event => {
  // await connectDB();
  switch (true) {
    case event.httpMethod === "GET" && event.path === randomPath: {
      return util.buildResponse(200, { message: "Successful", event });
    }
    case event.httpMethod === "POST" && event.path === registerPath: {
      const body = JSON.parse(event.body);
      return await registerService.register(body);
    }
    case event.httpMethod === "POST" && event.path === loginPath: {
      const body = JSON.parse(event.body);
      return await loginService.login(body);
    }
    case event.httpMethod === "POST" && event.path === verifyPath: {
      const body = JSON.parse(event.body);
      return await verifyService.verify(body);
    }
    default:
      return util.buildResponse(404, { message: "404 Not Found" });
  }
};