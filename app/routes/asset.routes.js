module.exports = (app) => {
    const asset = require('../controller/asset.controller.js');

    // Create a new Asset Details
    app.post('/api/assetlist', asset.createAsset);

    // Retrieve all Asset Details
    app.get('/api/assetlist', asset.findAllAsset);

    // Retrieve a single Asset with Asset No
    app.get('/api/assetlist/asset/:assetNo', asset.findOneAsset);

    // Update a Asset Details with Asset No
    app.put('/api/assetlist/asset/:assetNo', asset.updateAsset);

    // Delete a Asset with Asset No
    app.delete('/api/assetlist/asset/:assetNo', asset.deleteAsset);
    
    //GET Asset list by Status
    app.get('/api/assetlist/asset', asset.getAssetDetailsByStatus);

    //Get Asset List by ODC Type
    app.get('/api/assetlist/odc', asset.getAssetDetailsByODCType);

    //Authenticate User
    app.post('/api/assetLogin', asset.loginAssetUser);
}