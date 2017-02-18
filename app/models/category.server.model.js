var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var CategorySchema               =   new Schema(
    {   
        _id     : {
            type: Number,
            required: 'Category ID required'
        },
        categoryName: {
            type: String,
            default: '',
            trim: true,
            required: 'Category cannot be blank'
        },
        catSlugName: {
            type: String,
            default: '',
            trim: true,
            required: 'Category slug name cannot be blank'
        },
        subCategoryList: [{
            type: Number,
            ref: 'SubCategory'
        }],
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

mongoose.model('Category', CategorySchema);