var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var AdReplySchema               =   new Schema(
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
        userId: {
            type: Number,
            ref: 'User',
            required: 'User cannot be blank'
        },
        replyEmail: {
            type: String,
            default: '',
            trim: true,
            required: 'Category cannot be blank'
        },
        mobileNo: {
            type: Number,
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

mongoose.model('AdReply', AdReplySchema);