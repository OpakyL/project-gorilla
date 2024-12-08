const {
  USER_IDS,
  THREAD_IDS,
  MESSAGES,
  RESPONSES,
  REGEXS,
  FILE_IDS,
  STICKER_IDS,
} = require("./config");

function checkIfCanReply(msg) {
  return !msg.from.is_bot && !msg.forward_from && msg.chat.type !== "personal";
}

function checkMessageSender(msg, person) {
  return msg.from.id === USER_IDS[person];
}

function checkMessageThread(msg, thread) {
  if (thread === "general") {
    return !msg.message_thread_id;
  }

  return msg.message_thread_id === THREAD_IDS[thread];
}

function checkMessageByType(msg, type, code) {
  const message = getMessageText(msg);

  if (!message && type !== "stickerId" && type !== "photo") return false;

  const typeCheckers = {
    code: () => message.toLowerCase() === MESSAGES[code],
    regex: () => REGEXS[code].test(message),
    includes: () => message.toLowerCase().includes(MESSAGES[code]),
    photo: () => !!msg.photo,
    stickerId: () => !!msg.sticker && msg.sticker.file_id === STICKER_IDS[code],
  };

  return typeCheckers[type] ? typeCheckers[type]() : false;
}

function getMessageText(msg) {
  return msg.text || msg.caption;
}

function getResponseByCode(code) {
  const response = RESPONSES[code];

  return response;
}

function getRandomResponseByCode(code) {
  const responses = RESPONSES[code];

  const randomResponse =
    responses[Math.floor(Math.random() * responses.length)];

  return randomResponse;
}

function getFileIdByCode(code) {
  return FILE_IDS[code];
}

module.exports = {
  checkIfCanReply,
  checkMessageSender,
  checkMessageThread,
  checkMessageByType,
  getMessageText,
  getResponseByCode,
  getRandomResponseByCode,
  getFileIdByCode,
};
