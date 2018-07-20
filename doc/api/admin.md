# Markus - Admin Testing API

> These API only can be called while config.isDebug == true

## Admin

### POST /list

> List **ALL** image in the database

-   Method: POST
-   Path: [Domain]/list
-   Request: Object (JSON) Empty
-   Succeed Response: Object (JSON)
    -   status: String, "SUCCEED"
    -   data: Object (JSON) Empty
-   Failed Response: Object (JSON)
    -   status: String, "FAILED"
    -   error: Object (JSON)
        -   code: Number: [Error code]
        -   name: String, [Error name]
        -   message: String, [Error message]

```javascript
// Example for /list
// Use jquery
$.ajax({
    type: "POST",
    url: targetUrl + "/list",
    data: {},
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```


### DELETE /empty

> Delete **ALL** image in the database

-   Method: DELETE
-   Path: [Domain]/empty
-   Succeed Response: Object (JSON)
    -   status: String, "SUCCEED"
    -   data: Object (JSON) Empty
-   Failed Response: Object (JSON)
    -   status: String, "FAILED"
    -   error: Object (JSON)
        -   code: Number: [Error code]
        -   name: String, [Error name]
        -   message: String, [Error message]

```javascript
// Example for /empty
// Use jquery
$.ajax({
    type: "DELETE",
    url: targetUrl + "/empty",
}).then(function (msg) {
    // Do something
}).catch(function (msg) {
    // Handle something
});
```
