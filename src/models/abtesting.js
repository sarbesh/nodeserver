const mongoose = require("mongoose");

const abTesting_schema = mongoose.Schema(
    {
        endpoint: {
            type: String,
            required: true
        },
        method: {
            type: String,
            required: false
        },
        host: {
            type: String,
            required: true
        },
        enable: {
            type: Boolean,
            required: true, 
            default: true
        },
        name: {
            type: String,
            required: false
        },
        condition: {
            type: Object,
            required: true
        },
        remarks: {
            type: String, 
            default: null
        },
        comments: {
            type: String, 
            default: null
        },
        message: {
            type: String, 
            default: null
        },
    }, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

/**
 * Do not use arrow function here
 */
abTesting_schema.set('toJSON', {
    transform: (doc, result) => {
        return {
            ...result,
            id: result._id
        };
    }
});

module.exports = mongoose.model("ab_testing_config", abTesting_schema);
