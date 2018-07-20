# Markus - Upload Image API

## Upload image

> Duplicated image will be ignored and merge it tags, return existing image id

### POST /m/buffer

> Upload image with image binary buffer

-   Method: POST
-   Path: [Domain]/m/buffer
-   Request: Object (formData)
    -   image: Binary, [Image]
    -   tags: string[], [Image tag list]
    -   key: string, [Upload key]
-   Succeed Response: Object (JSON)
    -   status: String, "SUCCEED"
    -   data: Object (JSON),
        -   id: String, [ImageId]
-   Failed Response: Object (JSON)
    -   status: String, "FAILED"
    -   error: Object (JSON)
        -   code: Number: [Error code]
        -   name: String, [Error name]
        -   message: String, [Error message]

```javascript
// Example for /m/buffer
// Use jquery
let formData = new FormData();
let image = $("#file").prop("files")[0];
formData.append("image", image);
formData.append("tags", ['tag']);
formData.append("key", 'key');

$.ajax({
    type: "POST",
    url: targetUrl + "/m/buffer",
    processData: false,
    contentType: false,
    data: formData,
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```

### POST /m/base64

> Upload image with base64 encoded image

-   Method: POST
-   Path: [Domain]/m/base64
-   Request: Object (JSON)
    -   image: String, [Image base64 code, **start with base64**]
    -   tags: string[], [Image tag list]
    -   key: string, [Upload key]
    -   original: string? Optional [Upload file original name]
        -   If original name not given, Markus will use "N/A" instead
-   Succeed Response: Object (JSON)
    -   status: String, "SUCCEED"
    -   data: Object (JSON),
        -   id: String, [ImageId]
-   Failed Response: Object (JSON)
    -   status: String, "FAILED"
    -   error: Object (JSON)
        -   code: Number: [Error code]
        -   name: String, [Error name]
        -   message: String, [Error message]

```javascript
// Example for /m/base64
// Use jquery
$.ajax({
    type: "POST",
    url: targetUrl + "/m/base64",
    data: {
        image: 'base64....',
        tags: ['tags'],
        key: 'key',
    },
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```