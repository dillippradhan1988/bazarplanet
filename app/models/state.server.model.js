var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var StateSchema                 =   new Schema(
    {
        _id     : {
            type: Number,
            required: 'ID required'
        },
        stateName: {
            type: String,
            required: 'State name cannot be blank'
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

mongoose.model('State', StateSchema);