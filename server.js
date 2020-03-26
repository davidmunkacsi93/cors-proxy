
var express = require('express'),
app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Server listening on port ' + app.get('port'));
});