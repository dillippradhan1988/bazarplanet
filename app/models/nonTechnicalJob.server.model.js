var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var NonTechnicalJobSchema       =   new Schema(
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
        jobRole: {
            type: String,
            required: 'This field is required.'
        },
        companyName: {
            type: String
        },
        industry: {
            type: String,
            required: 'This field is required.'
        },
        education: {
            type: String,
            required: 'This field is required.'
        },
        designation: {
            type: String
        },
        salary: {
            type: String
        },
        experience: {
            type: String
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

mongoose.model('NonTechnicalJob', NonTechnicalJobSchema);