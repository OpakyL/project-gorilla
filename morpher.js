// const { Morpher } = require("morpher-ws3-client");

// // Создаем экземпляр клиента Morpher
// const morpher = new Morpher({ token: process.env.MORPHER_TOKEN });

// // Функция для обработки сообщения
// async function processMessage(msg) {
//   const message = msg.text || msg.caption;

//   if (!message) return false;
//   // Разбиваем сообщение на слова
//   const words = message.split(/\s+/);

//   let selectedWord = null;

//   // Ищем первое слово, которое можно склонить
//   for (const word of words) {
//     try {
//       // Проверяем, является ли слово существительным
//       const result = await morpher.russian.declension(word);
//       if (result && result.plural) {
//         selectedWord = word;
//         break;
//       }
//     } catch (err) {
//       console.log(`Ошибка для слова "${word}":`, err.message);
//     }
//   }

//   // Если подходящее слово не найдено
//   if (!selectedWord) {
//     return "Нет подходящих слов в сообщении.";
//   }

//   // Склоняем выбранное слово во множественное число
//   try {
//     const declension = await morpher.russian.declension(selectedWord);
//     const pluralForm = declension.plural;

//     if (!pluralForm) {
//       return `Не смог склонить слово: ${selectedWord}`;
//     }

//     // Формируем ответ
//     return `${pluralForm} для пидоров`;
//   } catch (err) {
//     return `Ошибка при склонении слова: ${err.message}`;
//   }
// }

// // const testmsg = { text: "Раз я его приватным сделал" };
// // processMessage(testmsg)
// //   .then((response) => console.log(response))
// //   .catch((err) => console.error(err));

// module.exports = {
//   processMessage,
// };
