var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var InputTypeSchema         =   new Schema(
    {
        _id     : {
            type: Number,
            required: 'ID required'
        },        
        typeName: {
            type: String,
            required: 'Type name cannot be blank'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

mongoose.model('InputType', InputTypeSchema);