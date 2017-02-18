var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var ValidationRuleSchema         =   new Schema(
    {
        _id     : {
            type: Number,
            required: 'ID required'
        },
        ruleName: {
            type: String,
            required: 'Rule name cannot be blank'
        }, 
        IsActive: {
            type: Boolean,
            required: 'Status cannot be blank'
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

mongoose.model('ValidationRule', ValidationRuleSchema);