/**
 * Constants for Meshy MCP Server
 */
// API Configuration
export const API_BASE_URL = process.env.MESHY_API_HOST || "https://api.meshy.ai";
export const CHARACTER_LIMIT = parseInt(process.env.CHARACTER_LIMIT || "25000", 10);
// Response Formats
export var ResponseFormat;
(function (ResponseFormat) {
    ResponseFormat["MARKDOWN"] = "markdown";
    ResponseFormat["JSON"] = "json";
})(ResponseFormat || (ResponseFormat = {}));
// Task Status
export var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "PENDING";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["SUCCEEDED"] = "SUCCEEDED";
    TaskStatus["FAILED"] = "FAILED";
    TaskStatus["CANCELED"] = "CANCELED";
})(TaskStatus || (TaskStatus = {}));
// Task Phases
export var TaskPhase;
(function (TaskPhase) {
    TaskPhase["DRAFT"] = "draft";
    TaskPhase["GENERATE"] = "generate";
    TaskPhase["TEXTURE"] = "texture";
    TaskPhase["STYLIZE"] = "stylize";
    TaskPhase["ANIMATE"] = "animate";
})(TaskPhase || (TaskPhase = {}));
// Topology Types
export var Topology;
(function (Topology) {
    Topology["QUAD"] = "quad";
    Topology["TRIANGLE"] = "triangle";
})(Topology || (Topology = {}));
// Model Formats
export var ModelFormat;
(function (ModelFormat) {
    ModelFormat["GLB"] = "glb";
    ModelFormat["FBX"] = "fbx";
    ModelFormat["USDZ"] = "usdz";
    ModelFormat["THREE_MF"] = "3mf";
})(ModelFormat || (ModelFormat = {}));
// AI Models
export var AIModel;
(function (AIModel) {
    AIModel["MESHY_5"] = "meshy-5";
    AIModel["MESHY_6"] = "meshy-6";
    AIModel["LATEST"] = "latest";
})(AIModel || (AIModel = {}));
// Model Types
export var ModelType;
(function (ModelType) {
    ModelType["STANDARD"] = "standard";
    ModelType["LOWPOLY"] = "lowpoly";
})(ModelType || (ModelType = {}));
// Symmetry Modes
export var SymmetryMode;
(function (SymmetryMode) {
    SymmetryMode["OFF"] = "off";
    SymmetryMode["AUTO"] = "auto";
    SymmetryMode["ON"] = "on";
})(SymmetryMode || (SymmetryMode = {}));
// Pose Modes
export var PoseMode;
(function (PoseMode) {
    PoseMode["A_POSE"] = "a-pose";
    PoseMode["T_POSE"] = "t-pose";
})(PoseMode || (PoseMode = {}));
// Task Types
//
// Note on multi-color naming: the input string we accept ("multi-color-print")
// is the convention used by this server's tools. The Meshy API itself returns
// `type: "print-multi-color"` on the GET response. Auto-inference matches by
// endpoint URL, not by the response `type` field, so the asymmetry is harmless.
export var TaskType;
(function (TaskType) {
    TaskType["TEXT_TO_3D"] = "text-to-3d";
    TaskType["IMAGE_TO_3D"] = "image-to-3d";
    TaskType["MULTI_IMAGE_TO_3D"] = "multi-image-to-3d";
    TaskType["REMESH"] = "remesh";
    TaskType["RETEXTURE"] = "retexture";
    TaskType["RIGGING"] = "rigging";
    TaskType["ANIMATION"] = "animation";
    TaskType["TEXT_TO_IMAGE"] = "text-to-image";
    TaskType["IMAGE_TO_IMAGE"] = "image-to-image";
    TaskType["MULTI_COLOR_PRINT"] = "multi-color-print";
    TaskType["PRINT_ANALYZE"] = "print-analyze";
    TaskType["PRINT_REPAIR"] = "print-repair";
})(TaskType || (TaskType = {}));
// Remesh Output Formats
export var RemeshFormat;
(function (RemeshFormat) {
    RemeshFormat["GLB"] = "glb";
    RemeshFormat["FBX"] = "fbx";
    RemeshFormat["OBJ"] = "obj";
    RemeshFormat["USDZ"] = "usdz";
    RemeshFormat["BLEND"] = "blend";
    RemeshFormat["STL"] = "stl";
})(RemeshFormat || (RemeshFormat = {}));
// Origin At (for remesh)
export var OriginAt;
(function (OriginAt) {
    OriginAt["BOTTOM"] = "bottom";
    OriginAt["CENTER"] = "center";
})(OriginAt || (OriginAt = {}));
// Text-to-Image Models
export var TextToImageModel;
(function (TextToImageModel) {
    TextToImageModel["NANO_BANANA"] = "nano-banana";
    TextToImageModel["NANO_BANANA_PRO"] = "nano-banana-pro";
})(TextToImageModel || (TextToImageModel = {}));
// Aspect Ratios
export var AspectRatio;
(function (AspectRatio) {
    AspectRatio["SQUARE"] = "1:1";
    AspectRatio["WIDESCREEN"] = "16:9";
    AspectRatio["PORTRAIT"] = "9:16";
    AspectRatio["STANDARD"] = "4:3";
    AspectRatio["PORTRAIT_STANDARD"] = "3:4";
})(AspectRatio || (AspectRatio = {}));
// Slicer Types
export var SlicerType;
(function (SlicerType) {
    SlicerType["AUTO"] = "auto";
    SlicerType["BAMBU"] = "bambu";
    SlicerType["ORCASLICER"] = "orcaslicer";
    SlicerType["CREALITY_PRINT"] = "creality_print";
    SlicerType["ELEGOO_SLICER"] = "elegoo_slicer";
    SlicerType["ANYCUBIC_SLICER"] = "anycubic_slicer";
    SlicerType["PRUSASLICER"] = "prusaslicer";
    SlicerType["CURA"] = "cura";
})(SlicerType || (SlicerType = {}));
// Slicers that support multi-color printing (AMS/MMU)
export const MULTICOLOR_CAPABLE_SLICERS = [
    SlicerType.ORCASLICER,
    SlicerType.BAMBU,
    SlicerType.CREALITY_PRINT,
    SlicerType.ELEGOO_SLICER,
    SlicerType.ANYCUBIC_SLICER
];
// Multi-color processing credit cost
export const MULTI_COLOR_CREDITS = 10;
export const PRINT_REPAIR_CREDITS = 10;
export const PRINT_ANALYZE_CREDITS = 0;
// Animation Post Process Operations
export var AnimationPostProcessOp;
(function (AnimationPostProcessOp) {
    AnimationPostProcessOp["CHANGE_FPS"] = "change_fps";
    AnimationPostProcessOp["FBX2USDZ"] = "fbx2usdz";
    AnimationPostProcessOp["EXTRACT_ARMATURE"] = "extract_armature";
})(AnimationPostProcessOp || (AnimationPostProcessOp = {}));
// Error Codes
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["INSUFFICIENT_CREDITS"] = "InsufficientCredits";
    ErrorCode["TOO_MANY_PENDING_TASKS"] = "TooManyPendingTasks";
    ErrorCode["INVALID_MODEL_NOT_SUPPORTED"] = "InvalidModel:NotSupported";
    ErrorCode["INVALID_MODEL_INVALID_FORMAT"] = "InvalidModel:InvalidFormat";
    ErrorCode["LIMIT_EXCEEDED"] = "LimitExceeded";
    ErrorCode["FORBIDDEN"] = "Forbidden";
    ErrorCode["NOT_FOUND"] = "NotFound";
    ErrorCode["INTERNAL_ERROR"] = "InternalError";
})(ErrorCode || (ErrorCode = {}));
// Timeouts
export const API_TIMEOUT = 30000; // 30 seconds
export const RETRY_DELAYS = [2000, 4000, 8000]; // Exponential backoff
export const MAX_RETRIES = 3;
// Polling Configuration (for meshy_get_task_status wait mode)
export const POLL_INITIAL_DELAY = 5000; // 5 seconds
export const POLL_MAX_DELAY = 30000; // 30 seconds
export const POLL_BACKOFF_FACTOR = 1.5;
export const POLL_FINALIZATION_DELAY = 15000; // 15s when progress >= 95%
export const POLL_DEFAULT_TIMEOUT = 300000; // 5 minutes
export const POLL_MAX_TIMEOUT = 300000; // 5 minutes
// Rigging Constraints
export const RIGGING_MAX_FACES = 300000;
