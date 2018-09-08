/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Imports
 */

export { default as RouteCompressByTag } from './image/compress_by_tag';
export { default as RouteDeactivateImageById } from './image/deactivate_id';
export { default as RouteDeactivateImagesByTag } from './image/deactivate_tag';
export { default as RouteGetAvatar } from './image/get_avatar';
export { default as RouteGetImage } from './image/get_image';
export { default as RouteGetImagesByTag } from './image/get_images_by_tag';
export { default as RouteTagList } from './image/get_tag_list';
export { default as RouteTagAdvancedList } from './image/get_advanced_tag_list';
export { default as RouteRenameTag } from './image/tag_change_name';
export { default as RouteAuth } from './system/auth';
export { default as RouteRiskyEmptyDatabase } from './system/empty_database';
export { default as RouteFourOFour } from './system/four_o_four';
export { default as RouteRiskyGetList } from './system/get_list';
export { default as RouteRoot } from './system/root';
export { default as RouteUploadByBase64 } from './upload/upload_base64';
export { default as RouteUploadByBuffer } from './upload/upload_buffer';

