const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: String,
  date: Date.now(),
  blog: {
    type: mongoose.Types.ObjectId,
    ref: 'Blog',
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);
