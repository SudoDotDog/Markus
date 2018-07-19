# Markus - Admin Testing API

> These API only can be called while config.isDebug == true

## Admin

### /list

> List **ALL** image in database

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

### /empty

> Delete **ALL** image in database

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
