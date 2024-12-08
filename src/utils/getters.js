function getMessageText(msg) {
  return msg.text || msg.caption;
}

function getRandomItemFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getIsProductionMode() {
  return process.env.NODE_ENV === "production";
}

module.exports = {
  getMessageText,
  getRandomItemFromArray,
  getIsProductionMode,
};
