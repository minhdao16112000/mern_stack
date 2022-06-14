async function generatePassword(length) {
    if (!length || length == undefined) {
        length = 8;
    }

    const rules = [
        { chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', min: 2 }, // At least 2 uppercase letters
        { chars: '0123456789', min: 2 }, // At least 2 digits/ At least 1 special char
    ];

    var allChars = '',
        allMin = 0;
    rules.forEach(function (rule) {
        allChars += rule.chars;
        allMin += rule.min;
    });
    if (length < allMin) {
        length = allMin;
    }
    rules.push({ chars: allChars, min: length - allMin });

    var pswd = '';
    rules.forEach(function (rule) {
        if (rule.min > 0) {
            pswd += shuffleString(rule.chars, rule.min);
        }
    });

    return shuffleString(pswd);
}

function shuffleString(str, maxlength) {
    var shuffledString = str
        .split('')
        .sort(function () {
            return 0.5 - Math.random();
        })
        .join('');
    if (maxlength > 0) {
        shuffledString = shuffledString.substr(0, maxlength);
    }
    return shuffledString;
}

module.exports = {
    generatePassword,
};
