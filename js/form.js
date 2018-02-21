$.fn.transliterate = function () {
    var a = {
        "Ё": "YO",
        "Й": "I",
        "Ц": "TS",
        "У": "U",
        "К": "K",
        "Е": "E",
        "Н": "N",
        "Г": "G",
        "Ш": "SH",
        "Щ": "SCH",
        "З": "Z",
        "Х": "H",
        "Ъ": "'",
        "ё": "yo",
        "й": "i",
        "ц": "ts",
        "у": "u",
        "к": "k",
        "е": "e",
        "н": "n",
        "г": "g",
        "ш": "sh",
        "щ": "sch",
        "з": "z",
        "х": "h",
        "ъ": "'",
        "Ф": "F",
        "Ы": "I",
        "В": "V",
        "А": "a",
        "П": "P",
        "Р": "R",
        "О": "O",
        "Л": "L",
        "Д": "D",
        "Ж": "ZH",
        "Э": "E",
        "ф": "f",
        "ы": "i",
        "в": "v",
        "а": "a",
        "п": "p",
        "р": "r",
        "о": "o",
        "л": "l",
        "д": "d",
        "ж": "zh",
        "э": "e",
        "Я": "Ya",
        "Ч": "CH",
        "С": "S",
        "М": "M",
        "И": "I",
        "Т": "T",
        "Ь": "'",
        "Б": "B",
        "Ю": "YU",
        "я": "ya",
        "ч": "ch",
        "с": "s",
        "м": "m",
        "и": "i",
        "т": "t",
        "ь": "'",
        "б": "b",
        "ю": "yu"
    };

    function transliterate(word) {
        return word.split('').map(function (char) {
            return a[char] || char;
        }).join('');
    }

    $.each(this, function (_, el) {
        var selector = $(el).data().transliterate || false;
        if (selector) {
            var inputTo = $(selector);
            var val = $(el).val();

            $(el).change(function () {
                inputTo.val(transliterate($(this).val()))
            });
        }
    });
};

$.fn.сheckAge = function () {
    function check(val) {
        if (val !== '')
            return false;

        return true;
    }

    function checkSelects() {
        var values = $selects.map(function (_, el) {
            return $(el).val();
        });

        if (check(values[0]) || check(values[1]) || check(values[2])) {
            return $this.removeClass('show-helper');
        }

        var birthDay = new Date(values[2], values[1], values[0]);
        var age = Math.floor((new Date().getTime() - birthDay.getTime()) / (24 * 3600 * 365.25 * 1000));


        if (LIMIT_AGE < age) {
            $selects[0].setCustomValidity('Какой-то текст про то, почему нельзя летать тем, кому за 90.');
            $this.addClass('show-helper');
        } else {
            $selects[0].setCustomValidity('');
            $this.removeClass('show-helper');
        }
    }

    var LIMIT_AGE = 90;
    var $selects = $(this).find('select');
    var $this = $(this);


    $selects.each(function (_, el) {
        $(el).change(checkSelects);
    });
};

$(document).ready(function () {
    $('.birth-group').сheckAge();

    var $fields = $(':input');

    $fields
        .inputmask()
        .transliterate();

    $fields.each(function (_, el) {
        $(el).change(function () {
            var status = $fields.filter(function (_, field) {
                return field.checkValidity() === false
            });

            if (status.length === 0) {
                $('#submit').removeAttr('disabled');
            } else {
                $('#submit').attr('disabled', 'disabled');
            }
        })
    });

    $(".excursion").submit(function (event) {
        var data = $(this).serialize();
        $('#submit').attr('disabled', 'disabled');

        $.ajax({
            method: "GET",
            url: 'https://script.google.com/macros/s/AKfycbyhc4wUUjtsdKgH46XvQPHc0joZNL2pj2leiirO39rwd1uxLt2k/exec',
            data: data
        })
            .done(function (msg) {
                alert("Data Saved: https://docs.google.com/spreadsheets/d/1_lAgUw2DfwNNaeFvhZVco_WhGUsTumdn7lknca1NQWo/edit?usp=sharing")
            })
            .always(function() {
                $('#submit').removeAttr('disabled')
            });
        event.preventDefault();
    });
});
