/**
 * sort the array put main input at first. password will be second if there is one
 * update name let it macht Schema format name_type
 * @param  inputs
 * @return inputs array
 **/
const sortInputsAndRename = (inputs) => {
  // sort the array put main input at first. password will be second if there is one
  const main_input = inputs.filter((el) => el.main)[0];
  let sortedInput
  if (main_input && main_input.type === "password") {
    sortedInput = [];
  } else {
     sortedInput = [main_input];
  }

  // check if there is password
  if (inputs.filter((x) => x.type == "password").length > 0) {
    sortedInput.push(...inputs.filter((x) => x.type == "password"));
  }

  // push other inputs
  inputs.forEach((x) => {
    if (!x.main && x.type != "password") sortedInput.push(x);
  });

  // update name let it macht Schema format name_type
  //     return sortedInput.map(x => {
  //         if(x.name.split("_")[x.name.split("_").length-1]==x.type) return x
  //         x.name = x.name + '_' + x.type;
  //         return x
  //     })

  return sortedInput;
};

// exports = trimEmptyLine

module.exports = sortInputsAndRename;
