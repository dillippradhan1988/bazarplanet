var mongoose                    =   require('mongoose');
var Schema                      =   mongoose.Schema;

var PostPageSchema         =   new Schema(
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
        inputTypeId: {
            type: Number,
            ref: 'InputType',
            required: 'Input type cannot be blank'
        },
        labelName: {
            type: String,
            required: 'This field is required'
        },
        optionValue: {
            type: String,
            required: 'This field is required'
        },
        validationRule: {
            type: String,
            required: 'This field is required'
        },
        allowEmpty: {
            type: Boolean,
            required: 'This field is required'
        },
        fieldOrder: {
            type: Number,
            required: 'This field is required'
        },
        createdAt: {
            type: String
        },
        updatedAt: {
            type: String
        }
    }
);

mongoose.model('PostPage', PostPageSchema);