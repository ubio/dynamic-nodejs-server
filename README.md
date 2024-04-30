# Dynamic Node.js eval server

This small application allows you to remotely execute Node.js code on a server. This was built to power the [NodeScript](https://nodescript.dev) Node.js Eval module. To use it in NodeScript, save the full `/exec` path to your `NODEJS_SERVER_URL` variable (including `username:password` if required).

The eval server automatically installs NPM dependencies on demand if they do not already exist in the `node_modules` folder. 

Please use at your own risk. Remote code execution as a service is not for the faint hearted! 

It is recommended to put Basic Auth in front of this service. You should not let anyone who you do not trust use this service.
