# Markus - Modify Image API

## Deactivate Image

### POST /deactive

> Upload image with image binary buffer

-   Method: POST
-   Path: [Domain]/deactive
-   Request: Object (formData)
    -   id: String, [Target imageId]
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
// Example for /deactive
// Use jquery
$.ajax({
    type: "POST",
    url: targetUrl + "/deactive",
    data: {
        id: 'id'
    },
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```