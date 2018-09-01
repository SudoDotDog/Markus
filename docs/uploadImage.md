# Markus - Upload Image API

## Upload image

> Duplicated image will be ignored and merge it tags, return existing image id

### POST /m/buffer

> Upload image with image binary buffer

- Method: POST
- Path: [Domain]/m/buffer
- Header:
  - Authorization: 'Basic <key>'
- Request: Object (formData)
  - image: Binary, [Image]
  - tags: string[], [Image tag list]
- Succeed Response: Object (JSON)
  - status: String, "SUCCEED"
  - data: Object (JSON),
    - id: String, [ImageId]
- Failed Response: Object (JSON)
  - status: String, "FAILED"
  - error: Object (JSON)
    - code: Number: [Error code]
    - name: String, [Error name]
    - message: String, [Error message]

```javascript
// Example for /m/buffer
// Use jquery
let formData = new FormData();
let image = $("#file").prop("files")[0];
formData.append("image", image);
formData.append("tags", ["tag"]);

$.ajax({
  type: "POST",
  url: targetUrl + "/m/buffer",
  header: {
    'authorization': 'Basic <key>'
  },
  processData: false,
  contentType: false,
  data: formData
})
  .then(function(msg) {
    // Do something
  })
  .catch(function(msg) {
    // Handle something
  });
```

### POST /m/base64

> Upload image with base64 encoded image

- Method: POST
- Path: [Domain]/m/base64
- Header:
  - Authorization: 'Basic <key>'
- Request: Object (JSON)
  - image: String, [Image base64 code, **start with base64**]
  - tags: string[], [Image tag list]
  - original: string? Optional [Upload file original name]
    - If original name not given, Markus will use "Not-Provided" instead
- Succeed Response: Object (JSON)
  - status: String, "SUCCEED"
  - data: Object (JSON),
    - id: String, [ImageId]
- Failed Response: Object (JSON)
  - status: String, "FAILED"
  - error: Object (JSON)
    - code: Number: [Error code]
    - name: String, [Error name]
    - message: String, [Error message]

```javascript
// Example for /m/base64
// Use jquery
$.ajax({
    type: "POST",
    url: targetUrl + "/m/base64",
    header: {
      'authorization': 'Basic <key>'
    },
    data: {
        image: 'base64....',
        tags: ['tags'],
        original?: 'some.jpg',
    },
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```
