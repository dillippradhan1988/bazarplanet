var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var NonTechnicalJobSchema       =   new Schema(
    {        
        _id: {
            type: Number,
            unique: true,
            required: true,
            trim: true
        }, 
        adId: {
            type: Number,
            ref: 'Ad',
            required: true,
            trim: true
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