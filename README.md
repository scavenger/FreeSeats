# FreeSeats

Small html5 tool to find and display cinema seats collisions

Written in vanilla JavaScript, it renders as text & visually bookings' topology for a rectangular cinema theater.
You just have to drag'n'drop an input file in the dedicated area.

The Map is a Singleton, all handlers ( process, validate, render, write ) are following a Chain of Resposability, raising events by a minimal Pub/Sub pattern system. Module pattern is used to separate all entities by namespaces and files. Nothing fancy. :)
