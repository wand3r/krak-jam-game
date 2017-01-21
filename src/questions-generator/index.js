var request = require('request');
var fs = require('fs');

var results = [];

var downloaded = 0;

for (var i = 0; i < 100; i++) {
    request('https://opentdb.com/api.php?amount=50', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var _body = JSON.parse(body);
            results = [...results, ..._body.results];
            downloaded++;
            if (downloaded === 99) {
                results = results.filter(r => r.type === 'multiple');

                var flags = {};
                var newResults = results.filter(function(entry) {
                    if (flags[entry.question]) {
                        return false;
                    }
                    flags[entry.question] = true;
                    return true;
                });

                fs.writeFileSync('./questions.json', JSON.stringify(newResults));
            }
        }
    });
}

