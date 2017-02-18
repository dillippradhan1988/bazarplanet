var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var AdFavoriteSchema               =   new Schema(
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

mongoose.model('AdFavorite', AdFavoriteSchema);