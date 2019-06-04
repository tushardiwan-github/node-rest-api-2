const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
    assetNo: {type: Number,required: true},
    assetType: {type: String,required: true},
    status: {type: String,required: true},
    odcType: {type: String,required: true},
    odcReceivedDate: {type: String,required: true},
    consignmentReceivedDate:{type: String,required:true},
    enteredBy: {type: String,required: true},
    approvedBy: {type: String,required: true},
    orgName: {type: String,required: true},
    assetModel:{type:String,required: true},
    assetSerialNo:{type: String,required: true},
    deskNo:{type: Number,required:true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Asset', AssetSchema);