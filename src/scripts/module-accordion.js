const openItem = item => {
    const container = item.closest('.team__item');
    const content = container.find('.teammate__wrapper');
    const about = container.find('.teammate__about');
    const reqHeight = about.height();
    const triangle = container.find('.teammate__triangle');

    container.addClass('team__item_active');
    content.height(reqHeight);
    triangle.css('transform', 'rotate(-180deg)');
}

const closeEveryItem = container => {
    const itemcontainer = container.find('.team__item');
    const items = container.find('.teammate__wrapper');
    const triangles = container.find('.teammate__triangle');

    itemcontainer.removeClass('team__item_active');
    items.height(0);
    triangles.css('transform', 'rotate(0deg)');
}

$('.teammate__btn').on('click', e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team__list');
    const elemContainer = $this.closest('.team__item');

    if (elemContainer.hasClass('team__item_active')) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }
})