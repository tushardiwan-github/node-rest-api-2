const Asset = require('../models/asset.model.js');
const mongoose = require('mongoose');
const request = require('request');

// Create and Save a new Asset
exports.createAsset = async (req, res) => {
    // Validate request
    if (!req.body.assetNo) {
        return res.status(400).send({
            message: "Asset Number can not be empty"
        });
    }

    //Check whether asset already in Database
    const assetExists = await Asset.findOne({
        assetSerialNo: req.body.assetSerialNo
    });

    if (assetExists) return res.status(400).send({
        message: 'Asset already exists'
    });
    const asset = new Asset({
        assetNo: req.body.assetNo,
        assetType: req.body.assetType,
        status: req.body.status,
        odcType: req.body.odcType,
        odcReceivedDate: req.body.odcReceivedDate,
        consignmentReceivedDate: req.body.consignmentReceivedDate,
        enteredBy: req.body.enteredBy,
        approvedBy: req.body.approvedBy,
        orgName: req.body.orgName,
        assetModel: req.body.assetModel,
        assetSerialNo: req.body.assetSerialNo,
        deskNo: req.body.deskNo
    });
    asset
        .save()
        .then(result => {
            res.status(201).json({
                message: "Asset Successfully Created"
            });
            console.log(asset);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the Asset."
            })
        });
};

// Retrieve and return all Assets from the database.
exports.findAllAsset = (req, res) => {
    Asset.find()
        .then(asset => {
            res.send(asset);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving assets."
            });
        });
};

// Find a single Asset with a AssetId
exports.findOneAsset = (req, res) => {
    Asset.find({ assetNo: req.params.assetNo })
        .then(asset => {
            if (!asset) {
                return res.status(404).send({
                    message: "Asset Details not found with assetNo " + req.params.assetNo
                });
            }
            res.send(asset);
        }).catch(err => {
            if (err.kind === req.params.assetNo) {
                return res.status(404).send({
                    message: "Asset Details not found with assetNo " + req.params.assetNo
                });
            }
            return res.status(500).send({
                message: "Error retrieving Asset Details with assetNo " + req.params.assetNo
            });
        });

};

// Update a Asset identified by the Asset No in the request
exports.updateAsset = (req, res) => {
    // Validate Request
    if (!req.body.assetNo) {
        return res.status(400).send({
            message: "Asset No can not be empty"
        });
    }

    Asset.updateOne({ assetNo: req.params.assetNo }, {
        assetNo: req.body.assetNo,
        assetType: req.body.assetType,
        status: req.body.status,
        odcType: req.body.odcType,
        odcReceivedDate: req.body.odcReceivedDate,
        consignmentReceivedDate: req.body.consignmentReceivedDate,
        enteredBy: req.body.enteredBy,
        approvedBy: req.body.approvedBy,
        orgName: req.body.orgName,
        assetModel: req.body.assetModel,
        assetSerialNo: req.body.assetSerialNo,
        deskNo: req.body.deskNo
    }, { new: true })
        .then(asset => {
            if (!asset) {
                return res.status(404).send({
                    message: "Asset not found with assetNo " + req.params.assetNo
                });
            }
            res.send(asset);
        }).catch(err => {
            if (err.kind === 'assetNo') {
                return res.status(404).send({
                    message: "Asset not found with assetNo " + req.params.assetNo
                });
            }
            return res.status(500).send({
                message: "Error updating Asset with assetNo " + req.params.assetNo
            });
        });
}

// Delete a Asset with the specified Asset No in the request
exports.deleteAsset = (req, res) => {
    Asset.remove({ assetNo: req.params.assetNo })
        .then(asset => {
            if (!asset) {
                return res.status(404).send({
                    message: "Asset not found with assetNo " + req.params.assetNo
                });
            }
            res.send({ message: "Asset Details deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'assetNo' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Asset not found with assetNo " + req.params.assetNo
                });
            }
            return res.status(500).send({
                message: "Could not delete Asset with assetNo " + req.params.assetNo
            });
        });

};

// Find all Asset Details with a status
exports.getAssetDetailsByStatus = (req, res) => {
    Asset.find({ status: req.query.status })
        .then(asset => {
            if (!req.query) {
                return res.status(404).send({
                    message: "Asset Details not found without status "
                });
            }
            res.send(asset);
        }).catch(err => {
            if (err.kind === req.query.status) {
                return res.status(404).send({
                    message: "Asset Details not found without status"
                });
            }
            return res.status(500).send({
                message: "Error retrieving Asset Details with status "
            });
        });
};

// Find all Asset Details with a odc type
exports.getAssetDetailsByODCType = (req, res) => {
    Asset.find({odcType: req.query.odcType })
        .then(asset => {
            if (!req.query) {
                return res.status(404).send({
                    message: "Asset Details not found without status "
                });
            }
            res.send(asset);
        }).catch(err => {
            if (err.kind === req.query.status) {
                return res.status(404).send({
                    message: "Asset Details not found without status"
                });
            }
            return res.status(500).send({
                message: "Error retrieving Asset Details with status "
            });
        });
};

// Authentication using EagleAccess Auth REST API
exports.loginAssetUser = (req, res) => {
    request.post({ url: 'http://localhost:3000/api/login', json: req.body }, (err, httpResponse, body) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(body);
    });
};