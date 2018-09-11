# Markus - Modify Image API

## Deactivate Image

### POST /deactivate/id

> Deactivate target image by imageId and release storage

- Method: POST
- Path: [Domain]/deactivate/id
- Request: Object (formData)
  - id: String, [Target imageId]
- Header:
  - Authorization: 'Basic <key>'
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
// Example for /deactivate/id
// Use jquery
$.ajax({
  type: "POST",
  url: targetUrl + "/deactivate/id",
  header: {
      'authorization': 'Basic <key>'
  },
  data: {
    id: "id"
  }
})
  .then(function(msg) {
    // Do something
  })
  .catch(function(msg) {
    // Handle something
  });
```

### POST /deactivate/tag

> Deactivate target image by tag and release storage

- Method: POST
- Path: [Domain]/deactivate/tag
- Request: Object (formData)
  - id: String, [Target imageId]
- Header:
  - Authorization: 'Basic <key>'
- Succeed Response: Object (JSON)
  - status: String, "SUCCEED"
  - data: Object (JSON),
    - tag: String, [Target tag]
- Failed Response: Object (JSON)
  - status: String, "FAILED"
  - error: Object (JSON)
    - code: Number: [Error code]
    - name: String, [Error name]
    - message: String, [Error message]

```javascript
// Example for /deactivate/tag
// Use jquery
$.ajax({
  type: "POST",
  url: targetUrl + "/deactivate/tag",
  header: {
      'authorization': 'Basic <key>'
  },
  data: {
    tag: "tag"
  }
})
  .then(function(msg) {
    // Do something
  })
  .catch(function(msg) {
    // Handle something
  });
```
