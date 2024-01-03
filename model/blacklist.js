const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  balcklist: { type: string },
});

const BlackListModel = mongoose.model("Blacklist", blacklistSchema);

module.exports = { BlackListModel };
