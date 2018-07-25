# Markus - Modify Image API

## Deactivate Image

### POST /deactivate/id

> Deactivate target image by imageId and release storage

-   Method: POST
-   Path: [Domain]/deactivate/id
-   Request: Object (formData)
    -   id: String, [Target imageId]
-   Succeed Response: Object (JSON)
    -   status: String, "SUCCEED"
    -   data: Object (JSON),
        -   key: string, If use default validator [Key]
        -   id: String, [ImageId]
-   Failed Response: Object (JSON)
    -   status: String, "FAILED"
    -   error: Object (JSON)
        -   code: Number: [Error code]
        -   name: String, [Error name]
        -   message: String, [Error message]

```javascript
// Example for /deactivate/id
// Use jquery
$.ajax({
    type: "POST",
    url: targetUrl + "/deactivate/id",
    data: {
        key: 'test',
        id: 'id'
    },
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```

### POST /deactivate/tag

> Deactivate target image by tag and release storage

-   Method: POST
-   Path: [Domain]/deactivate/tag
-   Request: Object (formData)
    -   id: String, [Target imageId]
-   Succeed Response: Object (JSON)
    -   status: String, "SUCCEED"
    -   data: Object (JSON),
        -   key: string, If use default validator [Key]
        -   tag: String, [Target tag]
-   Failed Response: Object (JSON)
    -   status: String, "FAILED"
    -   error: Object (JSON)
        -   code: Number: [Error code]
        -   name: String, [Error name]
        -   message: String, [Error message]

```javascript
// Example for /deactivate/tag
// Use jquery
$.ajax({
    type: "POST",
    url: targetUrl + "/deactivate/tag",
    data: {
        key: 'test',
        tag: 'tag'
    },
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```