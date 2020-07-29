let myMap;

const init = () => {
    myMap = new ymaps.Map('map', {
        center: [53.595226, 25.826361],
        zoom: 14.22,
        controls: []
    });

    const coords = [
        [53.600362, 25.819863],
        [53.600111, 25.824076],
        [53.588274, 25.805768],
        [53.592624, 25.829493]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./img/icons/map-marker.svg",
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
    })

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    })

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);