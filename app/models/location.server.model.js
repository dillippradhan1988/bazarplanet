var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var LocationSchema         =   new Schema(
    {
        _id     : {
            type: Number,
            required: 'ID required'
        },        
        cityId: {
            type: Number,
            ref: 'City',
            required: 'City cannot be blank'
        },
        locationName: {
            type: String,
            required: 'Location name cannot be blank'
        },
        zipCode: {
            type: Number,
            required: 'Zipcode cannot be blank'
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

mongoose.model('Location', LocationSchema);