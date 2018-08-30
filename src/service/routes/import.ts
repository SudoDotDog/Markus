/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Imports
 */

import RouteCompressByTag from './image/compress_by_tag';
import RouteGetImage from './image/get_image';
import RouteGetImagesByTag from './image/get_images_by_tag';
import RouteTagList from './image/get_tag_list';
import RouteFourOFour from './system/four_o_four';
import RouteEstimateTool from './tool/estimate_tool';
import RouteExecuteTool from './tool/execute_tool';
import RouteGetTool from './tool/get_tool';
import RouteUploadByBuffer from './upload/upload_buffer';

// const exportable = {
//     RouteCompressByTag,
//     RouteFourOFour,
//     RouteGetImage,
//     RouteUploadByBuffer,
//     RouteEstimateTool,
//     RouteExecuteTool,
//     RouteGetTool,
//     RouteGetImagesByTag,
//     RouteTagList,
// }

export { RouteCompressByTag, RouteFourOFour, RouteGetImage, RouteUploadByBuffer, RouteEstimateTool, RouteExecuteTool, RouteGetTool, RouteGetImagesByTag, RouteTagList };

