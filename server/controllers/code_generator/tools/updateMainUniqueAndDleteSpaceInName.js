/**
 * // update maininput 1- unique, 2 name can not have empty space
 * @param {} req.body.inputsArray
 * @returns inputsArray
 */

function updateMainUniqueAndDeleteSpaceInName(inputs) {
  return inputs.map((x) => {
    x.name = x.name.split(" ").join("_");
    if (x.main) x.unique = true;
    return x;
  });
}

module.exports = updateMainUniqueAndDeleteSpaceInName;
