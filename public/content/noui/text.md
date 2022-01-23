---
title: "noui"
tags:
    - Experiment
    - Machine Learning
year:
    - 2022

stack:
    - StyleGan2 
    - Pix2Pix
    - Python
order: 1322
---
# Noui project

Noui project is a series of experiments towards my vision and definition of the future of UI/UX design in software development; First, adaptability and organic personalization of interface design of software and second Automation and the design process. 

**Experiment #1**

The first experiment was a StyleGAN2 generated web grid, an attempt to see how we can teach a GAN to draw a random grid(layout) of a website. For this experiment, I used a dataset including the top 1000 websites with the most daily views. I am not quite happy with the results but now that the model is trained, it can be used for further (continue) training and hopefully get more coherent results. 

In order to create this dataset, I had to develop the software ⇢ [http://gridr.amir.cloud/](http://gridr.amir.cloud/). The source code is open-source on Github ⇢ https://github.com/amirhouieh/grid-reveal. 

**Experiment #2**

The second experiment was a WIREFRAME to UI generator using Pix2Pix GAN. In this step, I used a dataset including 1000 random data points (webpages). The result did not look good, but promising 🤞 The next step would be to create a more cohesive and clean dataset (probably limited to one particular domain), and train the model again. 

Link to Colab project ⇢ 

[Google Colaboratory](https://colab.research.google.com/github/tensorflow/docs/blob/master/site/en/tutorials/generative/pix2pix.ipynb)