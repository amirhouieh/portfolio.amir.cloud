---
title: Knowledge Recognition
year: [2018]
tags: ["AI", "semantic-search", "ML", "knowledge systems"]
stack: ["YOLOv3", "Mask R-CNN", "Tesseract OCR", "spaCy", "LDA", "Word2Vec", "Elasticsearch", "TensorFlow", "PyTorch", "REST API", "Streaming API"]
link: https://suslib.com/core/knowledge-recognition
---

KR was our first big experiment at [Suslib](https://suslib.com). The idea was simple: what if a collection of books, images, or files could actually understand itself? Instead of being a flat archive, it would be a network of meaning that you could search semantically and explore contextually.

This was 2018, so we didn't have transformer models or ready-made semantic search APIs. Instead, we pieced it together ourselves: YOLOv3 and Mask R-CNN for object detection, Tesseract for OCR, spaCy for entity recognition, LDA for topics, and TextRank for summarization. For semantics we trained Word2Vec embeddings and dropped them into Elasticsearch to give collections a "search by idea" capability. It felt like hacking the future together with duct tape and GPUs.

I led the team that built it — backend, ML, and MLOps engineers — and my role was to drive the product architecture, glue all the moving parts, and also get my hands dirty with model training and pipeline design. We wrapped it all into a REST and streaming API that sat neatly between a CMS and database. That made it lightweight, flexible, and fast enough to power our own AR inventory app while still being useful for outside developers.

Looking back, KR was the project that put us on the map: it got us into Dutch Design Week, helped us secure funding, and proved that we could build practical AI-driven knowledge systems before the ecosystem was ready for it.

`with` [Martijn de Heer](https://suslib.com), [Homayoun Moradi](https://suslib.com)
