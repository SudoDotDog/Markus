# Markus - Get Image API

## Get an image with imageId

### /w/:imageId

> Get an image with ImageId, if the image does not exist, return white background 404 picture  
> Normally, you can use this API within image src attribute.

-   Method: GET
-   Path: [Domain]/w/[ImageID]
-   Response: [Binary Image]

```html
<!-- Example for /w/:imageId -->
<img src="https://yourdomain.com/w/1a2b3c4d5e6f7g8h9i0j"> 
```

### /b/:imageId

> Get an image with ImageId, if the image does not exist, return black background 404 picture  
> Normally, you can use this API within image src attribute.

-   Method: GET
-   Path: [Domain]/b/[ImageID]
-   Response: [Binary Image]

```html
<!-- Example for /b/:imageId -->
<img src="https://yourdomain.com/b/1a2b3c4d5e6f7g8h9i0j"> 
```

## Get image list with a tag name

### POST /tag

> Get image list with a tag name

-   Method: POST
-   Path: [Domain]/tag
-   Request: Object (JSON)
    -   tag: String, [Target tag]
-   Succeed Response: Object (JSON)
    -   status: String, "SUCCEED"
    -   data: Object (JSON),
        -   active: Boolean, true
        -   createdAt: Date, [Image created date]
        -   id: ObjectId, [ImageId]
        -   original: String, [Image original name]
        -   size: Number, [Image size]
        -   tags: String\[], [Image tag list] 
-   Failed Response: Object (JSON)
    -   status: String, "FAILED"
    -   error: Object (JSON)
        -   code: Number: [Error code]
        -   name: String, [Error name]
        -   message: String, [Error message]

```javascript
// Example for /tag
// Use jquery
$.ajax({
    type: "POST",
    url: targetUrl + "/tag",
    data: {
        tag: 'tag'
    },
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```

### POST /original

> Get image list with tag name

-   Method: POST
-   Path: [Domain]/original
-   Request: Object (JSON)
    -   original: String, [Target original name]
-   Succeed Response: Object (JSON)
    -   status: String, "SUCCEED"
    -   data: Object (JSON),
        -   active: Boolean, true
        -   createdAt: Date, [Image created date]
        -   id: ObjectId, [ImageId]
        -   original: String, [Image original name]
        -   size: Number, [Image size]
        -   tags: String\[], [Image tag list] 
-   Failed Response: Object (JSON)
    -   status: String, "FAILED"
    -   error: Object (JSON)
        -   code: Number: [Error code]
        -   name: String, [Error name]
        -   message: String, [Error message]

```javascript
// Example for /original
// Use jquery
$.ajax({
    type: "POST",
    url: targetUrl + "/original",
    data: {
        original: 'original'
    },
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```