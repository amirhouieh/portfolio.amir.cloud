---
title: IAA (Inventory Assistant Application)
year: [2020]
tags: ["AR", "ML", "inventory management", "mobile app"]
stack: ["ARKit/ARCore", "Knowledge Recognition API", "TensorFlow", "Elasticsearch", "REST API"]
link: https://suslib.com/solution/inventory-assistant
---

IAA started as a side experiment to test what our Knowledge Recognition API could do in practice — and quickly grew into a full product. The idea was simple but powerful: point your tablet's camera at an object in a collection, and instantly know whether it's already in the inventory, check it in or out, or add it with enriched metadata generated on the fly.

We built IAA for Android and iOS tablets with a **camera-first design**. Instead of clunky forms or RFID scanners, the AR camera was the main interface. It recognized objects, suggested descriptions using ML, and made collection management as easy as taking a photo. Under the hood it leaned on our KR API — combining Word2Vec + Elasticsearch for semantic search with computer vision models to identify assets visually.

I led the product engineering and development team through multiple iterations: from concept (literally training on the combined bookcases of our team) to web-based prototypes, and finally to the beta version that people could register to try. By 2022, we launched version 1.0 for both iOS and Android, shaped heavily by user feedback.

IAA was the first time we turned our research into a **working, usable product**. It proved that our backend technology could actually make life easier for real people managing collections — librarians, archivists, or anyone dealing with physical and digital assets. For me, it was a huge milestone: going from experimental APIs to a polished, camera-driven app that people could actually use.

`with` [Martijn de Heer](https://suslib.com)
