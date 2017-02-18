var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var SubCategorySchema               =   new Schema(
    {
        _id     : {
            type: Number,
            required: 'Sub Category ID required'
        },
        categoryId: {
            type: Number,
            ref: 'Category',
            trim: true,
            required: 'Category cannot be blank'
        }, 
        subCategoryName: {
            type: String,
            default: '',
            trim: true,
            required: 'Category cannot be blank'
        },
        subcatSlugName: {
            type: String,
            default: '',
            trim: true,
            required: 'Category cannot be blank'
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

mongoose.model('SubCategory', SubCategorySchema);