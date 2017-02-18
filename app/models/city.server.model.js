var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var CitySchema                  =   new Schema(
    {
        _id     : {
            type: Number,
            required: 'ID required'
        },
        districtId: {
            type: Number,
            ref: 'District',
            required: 'District cannot be blank'
        },
        cityName: {
            type: String,
            required: 'City name cannot be blank'
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

mongoose.model('City', CitySchema);