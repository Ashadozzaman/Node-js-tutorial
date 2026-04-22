// Simple Node js server
const fs = require("fs");
const userRequestHander = (req, res) => {
  console.log(req.url, req.method, req.headers);
  // process.exit(); // Stop event loop after first request
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Enter Your Details</h1>");
    res.write("<form action='/submit' method='post'>");
    res.write("<label for='name'>Name:</label>");
    res.write("<input type='text' id='name' name='name'><br><br>");
    res.write("<label for='email'>Email:</label>");
    res.write("<input type='email' id='email' name='email'><br><br>");
    res.write("<input type='submit' value='Submit'>");
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/submit" && req.method === "POST") {
    console.log("Form submitted", req);
    fs.writeFileSync("data.txt", "Name: Ashaddozzaman");
    // fs.appendFileSync("data.txt", "Email: " + req.body.email);
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = userRequestHander;
