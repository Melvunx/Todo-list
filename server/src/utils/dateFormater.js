const { Handler } = require("./handler");

const dateFormater = (dateTime) => {
  const handler = Handler();
  const date = new Date(dateTime);
  const option = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formatedDate = date.toLocaleDateString("fr-FR", option);

  handler.loggedRequestSuccessed("Date formated", formatedDate);
  return formatedDate;
};

module.exports = { dateFormater };
