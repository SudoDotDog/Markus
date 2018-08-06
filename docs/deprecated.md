# Markus - Deprecated API

## Get image list

### POST /original

> Get image list with tag name  
> DELETED! No longer supported

- Method: POST
- Path: [Domain]/original
- Request: Object (JSON)
  - original: String, [Target original name]
- Succeed Response: Object (JSON)
  - status: String, "SUCCEED"
  - data: Object (JSON),
    - active: Boolean, true
    - createdAt: Date, [Image created date]
    - id: ObjectId, [ImageId]
    - original: String, [Image original name]
    - size: Number, [Image size]
    - tags: String\[], [Image tag list]
- Failed Response: Object (JSON)
  - status: String, "FAILED"
  - error: Object (JSON)
    - code: Number: [Error code]
    - name: String, [Error name]
    - message: String, [Error message]

```javascript
// Example for /original
// Use jquery
$.ajax({
  type: "POST",
  url: targetUrl + "/original",
  data: {
    original: "original"
  }
})
  .then(function(msg) {
    // Do something
  })
  .catch(function(msg) {
    // Handle something
  });
```
