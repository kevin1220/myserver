var MongoDB = function() {
    var m = this;
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    m.getSchema = function(schema) {
        if (m.schema !== undefined) {
            return m.schema;
        }
        m.schema = new Schema(schema);
        return m.schema;
    }
    m.getModel = function(modelName, schema, collection) {
        m.model = mongoose.model(modelName, schema, collection);
        return m.model;
    }
}

module.exports = MongoDB;
