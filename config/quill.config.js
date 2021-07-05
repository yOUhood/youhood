const mongoose = require("mongoose");
const users = require("../data/users.json");
const quill = require("quill-mention");


async function suggestUser(searchTerm) {
  const allUsers = users;
  return allUsers.filter(user => user.value.includes(searchTerm));
}

const quill = new Quill("#editor", {
  modules: {
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: async function(searchTerm, renderList) {
        const matchedUsers = await suggestUser(searchTerm);
        renderList(matchedUsers);
      }
    }
  }
});