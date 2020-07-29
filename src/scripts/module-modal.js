const validateFields = (form, fieldsArray) => {
    fieldsArray.forEach((field) => {
        field.removeClass("label__input_error");
        if (field.val().trim() === "") {
            field.addClass("label__input_error");
        }
    });

    const errorsField = form.find(".label__input_error");

    return errorsField.length === 0;
}

$('#myForm').submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name = 'name']");
    const phone = form.find("[name = 'phone']");
    const comment = form.find("[name = 'message']");
    const to = form.find("[name = 'to']");

    const modal = $('#modal');
    const content = modal.find('.overlay__text');

    modal.removeClass("error-message");

    if (validateFields(form, [name, phone, comment, to])) {
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            }
        });

        request.done(data => {
            content.text(data.message);
        });

        request.fail(data => {
            content.text(data.responseJSON.message)
            modal.addClass("error-message");
        });

        request.always(() => {
            $('body').css('overflow', 'hidden');
            $.fancybox.open({
                src: "#modal",
                type: "inline"
            })
        })
    }
});

$('.app-supmit-btn').on('click', e => {
    e.preventDefault();

    $.fancybox.close();
    $('body').css('overflow', 'auto');
})