var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var DistrictSchema              =   new Schema(
    {
        _id     : {
            type: Number,
            required: 'ID required'
        },
        stateId: {
            type: Number,
            ref: 'State',
            required: 'State cannot be blank'
        },
        districtName: {
            type: String,
            required: 'District name cannot be blank'
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

mongoose.model('District', DistrictSchema);