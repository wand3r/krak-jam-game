var request = require('request');
var fs = require('fs');

var results = [];

var downloaded = 0;

for (var i = 0; i < 200; i++) {
    request('https://opentdb.com/api.php?amount=50', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var _body = JSON.parse(body);
            results = [...results, ..._body.results];
            downloaded++;
            if (downloaded === 199) {
                results = results.filter(r => r.type === 'multiple');

                var flags2 = {};
                var categories = results.map(r => r.category);
                var distinctCategories = categories.filter(function(cat){
                    if (flags2[cat]) {
                        return false;
                    }
                    flags2[cat] = true;
                    return true;
                });
                distinctCategories = distinctCategories.map((dc, idx) => ({
                    name: dc,
                    id: idx
                }));

                var flags = {};
                var distinctQuestions = results.filter(function(entry) {
                    if (flags[entry.question]) {
                        return false;
                    }
                    flags[entry.question] = true;
                    return true;
                });

                distinctQuestions = distinctQuestions.map(dq => ({
                    question: dq.question,
                    categoryId: distinctCategories.find(dc => dc.name === dq.category).id,
                    correctAnswer: dq['correct_answer'],
                    incorrectAnswers: dq['incorrect_answers']
                }));

                fs.writeFileSync('./questions.json', JSON.stringify(distinctQuestions));
                fs.writeFileSync('./questions-categories.json', JSON.stringify(distinctCategories));
            }
        }
    });
}

