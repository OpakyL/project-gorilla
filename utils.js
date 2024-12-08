const {
  USER_IDS,
  THREAD_IDS,
  MESSAGES,
  RESPONSES,
  REGEXS,
  FILE_IDS,
} = require("./config");

function checkIfCanReply(msg) {
  return !msg.from.is_bot && msg.chat.type !== "personal";
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
  const message = msg.text || msg.caption;

  if (!message) return false;

  switch (type) {
    case "code":
      return message.toLowerCase() === MESSAGES[code];
    case "regex":
      return REGEXS[code].test(message);
    case "includes":
      return message.toLowerCase().includes(MESSAGES[code]);
    case "photo":
      return !!msg.photo;

    default:
      return false;
  }
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
  getResponseByCode,
  getRandomResponseByCode,
  getFileIdByCode,
};
