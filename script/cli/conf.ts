console.log(JSON.stringify({
    crossOrigin: "*",
    host: "mongodb://localhost:27017",
    database: "markus-test-2",
    imagePath: "/Users/mwang/Desktop/image",
    tempPath: "/Users/mwang/Desktop/temp",
    imagePFolder: 5,
    isDebug: true,
    maxThread: 4,
    uploadLimit: 25,
    portNumber: 8080,
    verbose: false,
    white404ImagePath: "assets/404image_white.png",
    black404ImagePath: "assets/404image_black.png",
    mode: "FILESYSTEM",
    S3: {
        bucket: "",
        accessKeyId: "",
        secretAccessKey: "",
        getPath: ""
    }
}, null, 2));
