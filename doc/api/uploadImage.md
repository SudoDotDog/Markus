# Markus - Upload Image API

## Upload image

> Duplicated image will be ignored and merge it tags, return existing image id

### /m/buffer

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

### /m/base64

> Upload image with base64 encoded image

-   Method: POST
-   Path: [Domain]/m/base64
-   Request: Object (JSON)
    -   image: String, [Image base64 code, **start with base64**]
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
