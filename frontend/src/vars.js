const backend_root = "http://127.0.0.1:8000"
const frontend_root = "http://127.0.0.1:3000"

// saves according to load screen size (maybe width and height should be dynamic)
const export_options = {
    imageWidth:  window.innerWidth,
    imageHeight: window.innerHeight,
    backgroundColor: "#FFFFFF",
    pixelRatio: 2
}

export {backend_root, frontend_root, export_options};