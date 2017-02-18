var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var AdVisitorSchema               =   new Schema(
    {
        _id     : {
            type: Number,
            required: 'ID required'
        },
        adId: {
            type: Number,
            ref: 'Add',
            trim: true,
            required: 'Add id cannot be blank'
        },
        ip_address: {
            type: String,
            default: '',
            trim: true,
            required: 'Category cannot be blank'
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

mongoose.model('AdVisitor', AdVisitorSchema);