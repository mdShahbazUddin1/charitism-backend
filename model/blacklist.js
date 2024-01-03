const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  blacklist: { type: String },
});

const BlackListModel = mongoose.model("Blacklist", blacklistSchema);

module.exports = { BlackListModel };
