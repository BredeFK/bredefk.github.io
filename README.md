# fritjof.no

![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?logo=bootstrap&logoColor=white)

<!-- Secret message goes here -->

My personal website, hosted with GitHub Pages at [www.fritjof.no](https://www.fritjof.no).

It's plain HTML, CSS and JavaScript with Bootstrap, so there's no build step. To run it locally, serve the
folder from the root, for example with

```
python3 -m http.server
```

and open http://localhost:8000.

To open it on other devices on the same network, like your phone, run

```
python3 -m http.server 8080 --bind 0.0.0.0
```

and go to `http://<your computer's local IP>:8080`.

## What's on it

- **Calculator** - convert between steps and kilometers, and do some percentage math
- **Songs** - guitar tabs I've collected. The tabs are plain text files in `tabs/`
- Links to [Er det tirsdag?](https://www.erdettirsdag.eu/) and the source code here on GitHub
