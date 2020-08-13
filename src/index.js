import './scss/app.scss';

function bxmtClear(that) {
    let clear = $(that).siblings(".bxmt-d_p-clear");

    if ($(that).val().length > 0) {
        clear.removeClass("d-none");
    } else {
        clear.addClass("d-none");
    }
}

let d = new Date(),
    date_input = $("#date"),
    min_date = ("" + d.getDate()).padStart(2, "0") + "." +
        ("" + (d.getMonth() + 1)).padStart(2, "0") + "." + d.getFullYear()
;
d.setDate(d.getDate() + 1);
date_input.val(min_date);

pickmeup.defaults.locales['ru'] = {
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
};
pickmeup("#date", {
    default_date: false,
    min: min_date,
    format: "d.m.Y",
    locale: "ru"
});
$(".pickmeup").appendTo(date_input.parent());


$(".bxmt-d_p-input").each(function () {
    bxmtClear(this);
});

$(".bxmt-d_p-select input").val($(".bxmt-d_p-option:first-child").text());

$(document)
    .on("click", "body", function (e) {
        if (e.target.className !== "bxmt-d_p-popover-body" && e.target.className !== "bxmt-d_p-summary") {
            document.querySelectorAll(".bxmt-d_p details[open]").forEach(el => {
                el.open = false;
            });
        }

        if (e.target.closest(".bxmt-d_p-select") === null) {
            $(".bxmt-d_p-options").addClass("d-none");
        }
    })

    .on("click", ".bxmt-d_p-select input", function () {
        $(".bxmt-d_p-options").toggleClass("d-none");
    })
    .on("click", ".bxmt-d_p-option", function () {
        $(".bxmt-d_p-select input").val($(this).text()).focus();
        $(".bxmt-d_p-options").addClass("d-none");
    })

    .on("click", ".bxmt-d_p-clear", function () {
        $(this).addClass("d-none").siblings(".bxmt-d_p-input").val("").focus();
    })
    .on("input", ".bxmt-d_p-input", function () {
        bxmtClear(this);
    })
;

document.getElementById("date").addEventListener('pickmeup-change', function (e) {
    bxmtClear(".bxmt--date input");
})

// Наблюдатель, который будет следить за изменением атрибута open
const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {

        // Элемент у которого измелился атрибут
        const details = mutation.target;

        // Если элемент был закрыт — ничего не делаем
        if (!details.open) {
            return false;
        }

        // Иначе, находим все открытые элементы details и перебираем их
        document.querySelectorAll(".bxmt-d_p details[open]").forEach(el => {

            // Исключаем из перебора елемент который мы только что открыли
            if (el === details) {
                return false;
            }

            // Закрываем все остальные элементы details
            el.open = false;
        });
    });
});

// Наблюдаем за изменением только одного атрибута
const config = {
    attributeFilter: ["open"]
};

// Вешаем наблюдатель на все елементы details внутри аккордеона
document.querySelectorAll(".bxmt-d_p details").forEach(el => observer.observe(el, config));