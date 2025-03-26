const http = require("http");
const { StringDecoder } = require("string_decoder");

// Generate a random number between 1 and 100
let targetNumber = Math.floor(Math.random() * 100) + 1;
let message = "Guess a number between 1 and 100!";

// Helper function to parse form data
const getBody = (req, callback) => {
  const decoder = new StringDecoder("utf-8");
  let body = "";
  req.on("data", (data) => {
    body += decoder.write(data);
  });
  req.on("end", () => {
    body += decoder.end();
    const parsedBody = decodeURI(body);
    const resultHash = {};
    parsedBody.split("&").forEach((part) => {
      const [key, value] = part.split("=");
      resultHash[key] = value;
    });
    callback(resultHash);
  });
};

// HTML form with dynamic feedback
const form = () => {
  return `
    <body style="font-family: Arial, sans-serif; text-align: center;">
      <h1>Number Guessing Game</h1>
      <p>${message}</p>
      <form method="POST">
        <input type="number" name="guess" min="1" max="100" required>
        <button type="submit">Submit Guess</button>
      </form>
    </body>
  `;
};

// Create the server
const server = http.createServer((req, res) => {
  console.log("Method:", req.method, "| URL:", req.url);

  if (req.method === "POST") {
    getBody(req, (body) => {
      const userGuess = parseInt(body.guess);

      if (isNaN(userGuess)) {
        message = "Please enter a valid number!";
      } else if (userGuess < targetNumber) {
        message = `${userGuess} is too low! Try again.`;
      } else if (userGuess > targetNumber) {
        message = `${userGuess} is too high! Try again.`;
      } else {
        message = `${userGuess} is correct! New number generated.`;
        targetNumber = Math.floor(Math.random() * 100) + 1; // Reset the game
      }

      // Redirect back to the form
      res.writeHead(303, { Location: "/" });
      res.end();
    });
  } else {
    res.end(form()); // Display the form for GET requests
  }
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
