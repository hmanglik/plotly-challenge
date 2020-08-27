# plotly-challenge
In this assignment we built an interactive dashboard on the Belly Button Biodiversity dataset. Our goal was to find the kinds of OTUs present in each sample (ie. a person), as well as the demographic information for that specific person. Once we had an interactive dashboard, we were supposed to deploy it on [GitHub Pages](https://hmanglik.github.io/plotly-challenge/).

# App.js file
In the app.js file, we first read .json data through by using promises. Plotly.js functionality was used to plot a bar chart of OTUs, a bubble chart of OTUs, and a gauge of washing frequency. We also were able to append to the demographic table in the index.html file. 

# Index.html file 
The index.html file has a general outline of where all the charts are positioned based on bootstrap. It also has div id's where we can push plots into from app.js. 

# Samples.json file
The samples.json file can be found both under `<data>` folder or alongside the index.html file. 