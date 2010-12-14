var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .zoomRange([12, 15])
    .add(po.interact());

map.add(po.image()
    .url(po.url("http://{S}tile.cloudmade.com"
    + "/1a1b06b230af4efdbb989ea99e9841af" // http://cloudmade.com/register
    + "/998/256/{Z}/{X}/{Y}.png")
    .hosts(["a.", "b.", "c.", ""])));

map.add(po.layer(overlay)
    .tile(false));

map.add(po.compass()
    .pan("none"));

/** A lightweight layer implementation for an image overlay. */
function overlay(tile, proj) {
    proj = proj(tile);
    var tl = proj.locationPoint({lon: -122.518, lat: 37.816}),
      br = proj.locationPoint({lon: -122.375, lat: 37.755});

    var o = tile.element = po.svg("foreignObject"),
      c = o.appendChild(document.createElement('canvas')),
      w = Math.round(br.x - tl.x),
      h = Math.round(br.y - tl.y);

    o.setAttribute("preserveAspectRatio", "none");
    o.setAttribute("x", tl.x);
    o.setAttribute("y", tl.y);
    o.setAttribute("width", w);
    o.setAttribute("height", h);

    c.setAttribute("width", w);
    c.setAttribute("height", h);

    (function loadImage() {
        var image = new Image();
        
        image.onload = function() {
            var ctx = c.getContext("2d");
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(image, 0, 0, w, h);
        };

        image.setAttribute('src', "sf1906.png");
    })();
}
