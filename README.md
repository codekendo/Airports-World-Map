# ISSUES

## Map does not show

I think I nailed this by setting specific properties in the style.css file.
I outcommented the reference to the style.css in the index.html file.

## World map cuts off

I order to prevent the world map from showing multiple times when zooming out, I added this code line to the logic.js file when creating the tile layer:

* noWrap: true,

This works, however there's white space on the left and the map seems to be cut off when you keep zooming out.
Played with SetView but no luck so far.

## Zooming in/zooming out seems to respond twice when clicking only once

When clicking once to zoom in/zoom out, the map seems to respond twice.

## Lagging while loading, lagging when zooming in/zooming out

Data/map is lagging.
Getting this error in Firefox:

* Will-change memory consumption is too high

In Google, the maps shows and stops being responsive (can't open the Inspector).
Message in Google:

* Page unresponsive, you can wait for it to become responsive oor exit the page