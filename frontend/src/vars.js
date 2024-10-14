const backend_root = "https://net-archer-api.vercel.app"
const frontend_root = "https://netarcher.vercel.app"

// saves according to load screen size (maybe width and height should be dynamic)
const export_options = {
    imageWidth:  window.innerWidth,
    imageHeight: window.innerHeight,
    backgroundColor: "#FFFFFF",
    pixelRatio: 2
}

export {backend_root, frontend_root, export_options};