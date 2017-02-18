var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var SubCategoryModelSchema         =   new Schema(
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
        subCatModelName: {
            type: String,
            required: 'State name cannot be blank'
        },
        subCatTableName: {
            type: String,
            required: 'State name cannot be blank'
        },
        modelPrimaryKey: {
            type: String,
            required: 'State name cannot be blank'
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

mongoose.model('SubCategoryModel', SubCategoryModelSchema);