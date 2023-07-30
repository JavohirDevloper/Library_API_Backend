const express = require("express");
const db = require("./db");
const config = require("./shared/config");
const handleError = require("./shared/errors/handle");
// routelar
const usersRoute = require("./modules/users/_api");
const publishersRoute = require("./modules/publisher/_api");
const adminsRoute = require("./modules/admin/_api");
const authorsRoute = require("./modules/authors/_api");
const booksRoute = require("./modules/book/_api");
const loanRoute = require("./modules/loan/_api");
// express uchun middleware
const app = express();
app.use(express.json());

// routerlar uchuun app.use()
app.use(usersRoute);
app.use(adminsRoute);
app.use(publishersRoute);
app.use(authorsRoute);
app.use(booksRoute);
app.use(loanRoute);

app.use(handleError);

db();
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});
