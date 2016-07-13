var MongoDB = function() {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    return function(modelName, schema, collection){
        function getSchema(){
            return new Schema(schema);
        }
        this.model = mongoose.model(modelName, getSchema(), collection);
        return this;
    }
}
module.exports = new MongoDB();
