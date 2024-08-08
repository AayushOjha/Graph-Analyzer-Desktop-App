# Armory Desktop App

This application id build using tauri framework with Next.js as Frontend.

This app helps user to visualize and explore time Series data from CSV
files, Specifically, tailored for analog Signal data sampled at high frequencies.

## App Features

- User and import a large csv file (tested on till ~300 mb) to app to visualize and analyze it.
- Time Granularity Control: Added controls to adjust time granularity from 10s to 1ms, with the chart auto-scaling based on selection.
- Time Navigation: Implemented a slider for navigating through the data's time axis, with dynamic chart updates.
- Added Zoom Functionality, user can select area to zoom in to graph and also added reset button to restore original state of graph
- Responsive layout the graph and other ui elements adopts with different width and height
- handled error like empty csv or invalid format

## Application flow
- User can click on Brows File to import csv file into app
- once the file is loaded to app, the user can see the graph from where x-axis represent time (assumed 10s sampling at 4Mhz) and y-axis represent the value
- user can switch time Granularity level between 10s, 1s and 100ms with help of dropdown
- user can use Navigation Slider to see the full graph at different time Granularity level
- to zoom into the chart user can select the area in chart with help of mouse, the graph will be auto scaled automatically 
- and to restore the orignal state of graph user can click onreset button  

### Todos

- ask user to enter frequency before importing file
- Keep UI interactive while loading file:
  figure out which part is blocking ui,
  - rust file reading part (less chances)
  - data transfer from rust to frontend (in v2 this issue is addressed,, read tauri v2 docs)
- globally store loaded file data on rust and when ever user zooms in on that particular data can be loaded on fronted end
