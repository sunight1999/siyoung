const port = 4833;

let map;
let geo;

function initMap(){
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 33.450701, lng: 126.570667 },
        zoom: 16,
    });
    geo = new google.maps.Geocoder();

    onEndLoadMap();
}

function onEndLoadMap(){
    loadAnimalHeatmap();
}

function loadAnimalHeatmap(){
    $.ajax({
        url: 'http://localhost:' + port + '/query/getAllAnimalAddress',
        async: true,
        type: 'POST',
        success: res => {
            var heatmapData = [];
            res.forEach(row => {
                heatmapData.push({
                    location: new google.maps.LatLng(row.coord_x, row.coord_y)
                });
            });

            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData
            });

            heatmap.set("radius", 40);
            heatmap.setMap(map);
        }
    })
}

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  }

function setCoordinatesByAddress(table, addr_col){
    $.ajax({
        url: 'http://localhost:' + port + '/query/getAllAddress',
        async: true,
        type: 'POST',
        data: {
            table: table,
            addr_col: addr_col
        },
        dataType: 'json',
        success: res => {
            console.log(res.length);
            res.forEach(row => {
                console.log(row.address_road);
                geo.geocode({address: row.address_road}, (results, status) => {
                    if (status != 'OK')
                        return;

                    position = results[0].geometry.location;
                    setCoordinates(table, addr_col, row.address_road, position);
                });
                sleep(300);
            });
        },
        error: err => {
            console.log(err);
        }
    });
}

function setCoordinates(table, addr_col, addr, coords){
    $.ajax({
        url: 'http://localhost:' + port + '/query/setCoordinates',
        async: true,
        type: 'POST',
        data: {
            table: table,
            addr_col: addr_col,
            addr: addr,
            x: coords.lat(),
            y: coords.lng()
        },
        dataType: 'json',
        error: err => {
            console.log(err);
        }
    })
}