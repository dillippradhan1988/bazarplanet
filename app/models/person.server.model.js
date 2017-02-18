var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var personSchema = Schema({
  _id     : Number,
  name    : String,
  age     : Number,
  stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var storySchema = Schema({
  creator : { type: Number, ref: 'Person' },
  title    : String,
  _fans     : [{ type: Number, ref: 'Person' }]
});

mongoose.model('Story', storySchema);
mongoose.model('Person', personSchema);
