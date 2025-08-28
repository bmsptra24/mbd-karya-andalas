import validator from "validator";

export const HandleEnterPress = async (event, inputText, callback) => {
  if (event.key === "Enter" && event.shiftKey) return null;
  if (
    event.key === "Enter" &&
    !validator.isEmpty(inputText) &&
    !validator.isWhitelisted(inputText, " \n")
  ) {
    callback();
  }
  return;
};
