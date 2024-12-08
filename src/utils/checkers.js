const { USER_IDS, THREAD_IDS } = require("@ids");
const { getMessageText } = require("@getters");

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

function checkMessageByType(msg, type, matcher) {
  const message = getMessageText(msg);

  if (!message && type !== "stickerId" && type !== "photo") return false;

  const typeCheckers = {
    code: () => message.toLowerCase() === matcher,
    regex: () => matcher.test(message),
    includes: () => message.toLowerCase().includes(matcher),
    photo: () => !!msg.photo,
    stickerId: () => !!msg.sticker && msg.sticker.file_id === matcher,
  };

  return typeCheckers[type] ? typeCheckers[type]() : false;
}

module.exports = {
  checkIfCanReply,
  checkMessageSender,
  checkMessageThread,
  checkMessageByType,
};
