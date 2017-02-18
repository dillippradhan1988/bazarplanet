var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var AdAlertSchema               =   new Schema(
    {
        _id     : {
            type: Number,
            unique: true,
            required: true,
            trim: true            
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
            required: 'City cannot be blank'
        },
        userId: {
            type: Number,
            ref: 'User',
            required: 'User cannot be blank'
        },
        alertType: {
            type: String,
            required: 'Alert type cannot be blank'
        },
        alertEmail: {
            type: String,
            match: [/.+\@.+\..+/, "Please fill a valid e-mail address"],
            required: 'Email cannot be blank'
        },
        alertMobile: {
            type: Number,
            default: 0
        },
        subscriptionDate: {
            type: Date,
            default: Date.now
        },
        isSubscribe: {
            type: Boolean,
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

mongoose.model('AdAlert', AdAlertSchema);