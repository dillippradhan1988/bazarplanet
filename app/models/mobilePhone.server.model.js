var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var MobilePhoneSchema           =   new Schema(
    {        
        adId: {
            type: Schema.Types.ObjectId,
            ref: 'Ad',
            required: 'Ad id cannot be blank.'
        },
        adType: {
            type: String,
            required: 'This field is required.'
        },
        condition: {
            type: String,
            required: 'This field is required.'
        },
        brand: {
            type: String,
            required: 'This field is required.'
        },
        operatingSystem: {
            type: String,
            required: 'This field is required.'
        },
        sim: {
            type: String,
            required: 'This field is required.'
        },
        additionalItems: {
            type: {},
            required: 'This field is required.'
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

mongoose.model('MobilePhone', MobilePhoneSchema);