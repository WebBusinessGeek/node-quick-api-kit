exports.respond = function(status, statusCode, message, data) {
    var dataObject = {message: message};
    if(data){
        var properties = Object.keys(data);
        for(var i = 0; i < properties.length; i++) {
            dataObject[properties[i]] = data[properties[i]];
        }
    }
    return {
        status: status,
        statusCode: statusCode,
        data: dataObject
    };
};