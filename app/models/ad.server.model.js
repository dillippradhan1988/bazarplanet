var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var AdSchema                    =   new Schema(
    {     
        _id: {
            type: Number,
            unique: true,
            required: true,
            trim: true
        },  
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: 'User cannot be blank'
        },
        categoryId: {
            type: Number,
            ref: 'Category',
            required: 'Category cannot be blank'
        },
        subCategoryId: {
            type: Number,
            ref: 'SubCategory',
            required: 'Sub Category cannot be blank'
        }, 
        cityId: {
            type: Number,
            ref: 'City',
            required: 'This field is required.'
        },
        locationId: {
            type: Number,
            ref: 'Location',
            required: 'This field is required.'
        },
        addTitle: {
            type: String,
            required: 'This field is required.'
        },
        photoName: {
            type: String
        },
        photoSize: {
            type: String
        },
        description: {
            type: String,
            required: 'This field is required.'
        },
        price: {
            type: Number,
            default: 0
        },
        addAlert: {
            type: String,
            default: 'N'
        },
        addPostedDt: {
            type: Date,
            default: Date.now
        },
        addDeletedDt: {
            type: Date
        },
        sellerType: {
            type: String,
            required: 'This field is required.'
        },
        sellerName: {
            type: String
        },
        sellerEmail: {
            type: String,
            required: 'This field is required.',
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]            
        },
        sellerMobile: {
            type: Number
        },
        noOfVisitotor: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: String,
            default: 'Y',
        },
        isDeleted: {
            type: String,
            default: 'N',
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
//AdSchema.index({ "_id": 1 }, { unique: true });

/*AdSchema.pre('save', function(next) {
    var _this    =   this;console.log(_this);
    _this.findOne({}).sort(_id, -1).exec( function(err, adObj) {
        _this._id   =  adObj._id+1;
        console.log(_this._id);
        next();
    });
});
*/
mongoose.model('Ad', AdSchema);