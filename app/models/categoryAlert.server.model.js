var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var CategoryAlertSchema         =   new Schema(
    {
        _id     : {
            type: Number,
            required: 'ID required'
        },
        subCategoryId: {
            type: Number,
            ref: 'SubCategory',
            required: 'Sub Category cannot be blank'
        },
        postPageId: {
            type: Number,
            ref: 'PostPage',
            required: true
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

mongoose.model('CategoryAlert', CategoryAlertSchema);