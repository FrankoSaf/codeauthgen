/**
 * delete empty lines;
 * delete liens only with empty space ;
 * if the line is start with comments "//"", will add a new line above it
 * @param string
 * @return string
 **/
const trimEmtyLine = (string) => {
  return string
    .split("\n")
    .map((x) => {
      if (x.trim() == ",") x = " ";
      if (x.split("").every((c) => c == " ")) x = x.trim(); // cut the line with all empty space
      if (x[0] == "/" && x[1] == "/") x = "\n" + x;
      return x;
    })
    .filter((x) => x)
    .join("\n")
    .trim();
};

// exports = trimEmptyLine

module.exports = trimEmtyLine;
