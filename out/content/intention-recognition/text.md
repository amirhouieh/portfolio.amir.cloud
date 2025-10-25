---
title: Intention Recognition
blurb: "AI system for gesture and object interaction using computer vision to control digital systems through natural hand movements and gestures."
year: [2019]
tags: ["AI", "computer-vision", "gesture recognition", "HCI"]
stack: ["OpenPose", "dlib", "YOLOv3", "LSTM", "TensorFlow", "TensorRT", "WebRTC", "Jetson Nano", "Raspberry Pi"]
link: https://suslib.com/core/intention-recognition
---

If my KR project was about making collections smart, Intention Recognition was about making them playful. We wanted people to control digital systems with nothing more than gestures and the way they handled objects. Pick up a book, wave your hand, flip through pages — and the system responds.

Technically, it was a fun mess. We used OpenPose for skeleton tracking, dlib for facial gestures, YOLOv3 for object detection, and LSTMs in TensorFlow to capture sequences of movement. I helped design the system and API, while our ML engineer went deep into dataset training — over 100k labeled clips. I jumped in on dataset curation too, which was both painful and weirdly satisfying.

What made IR special was combining gestures with object interactions. It wasn't just about waving at a camera — it was about how you handled things in the real world. We even built an "observer mode" where the system could notice new gestures and adapt over time. In demos, people loved teaching it something on the spot and seeing it respond.

We made it work on cheap hardware: regular webcams streaming over WebRTC, models optimized with TensorRT to run on Jetson Nanos and Raspberry Pis. No special sensors, no Kinect-style setup — just software magic.

IR ended up being showcased in libraries, exhibitions, and design festivals. It was the project that made people literally laugh and smile in front of our booth, waving their hands around like kids. For me, it was proof that futuristic interaction doesn't need futuristic hardware — just the right mix of vision, scrappiness, and teamwork.

`with` [Martijn de Heer](https://suslib.com), [Homayoun Moradi](https://suslib.com)
