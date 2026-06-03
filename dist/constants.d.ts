/**
 * Constants for Meshy MCP Server
 */
export declare const API_BASE_URL: string;
export declare const CHARACTER_LIMIT: number;
export declare enum ResponseFormat {
    MARKDOWN = "markdown",
    JSON = "json"
}
export declare enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
    CANCELED = "CANCELED"
}
export declare enum TaskPhase {
    DRAFT = "draft",
    GENERATE = "generate",
    TEXTURE = "texture",
    STYLIZE = "stylize",
    ANIMATE = "animate"
}
export declare enum Topology {
    QUAD = "quad",
    TRIANGLE = "triangle"
}
export declare enum ModelFormat {
    GLB = "glb",
    FBX = "fbx",
    USDZ = "usdz",
    THREE_MF = "3mf"
}
export declare enum AIModel {
    MESHY_5 = "meshy-5",
    MESHY_6 = "meshy-6",
    LATEST = "latest"
}
export declare enum ModelType {
    STANDARD = "standard",
    LOWPOLY = "lowpoly"
}
export declare enum SymmetryMode {
    OFF = "off",
    AUTO = "auto",
    ON = "on"
}
export declare enum PoseMode {
    A_POSE = "a-pose",
    T_POSE = "t-pose"
}
export declare enum TaskType {
    TEXT_TO_3D = "text-to-3d",
    IMAGE_TO_3D = "image-to-3d",
    MULTI_IMAGE_TO_3D = "multi-image-to-3d",
    REMESH = "remesh",
    RETEXTURE = "retexture",
    RIGGING = "rigging",
    ANIMATION = "animation",
    TEXT_TO_IMAGE = "text-to-image",
    IMAGE_TO_IMAGE = "image-to-image",
    MULTI_COLOR_PRINT = "multi-color-print",
    PRINT_ANALYZE = "print-analyze",
    PRINT_REPAIR = "print-repair"
}
export declare enum RemeshFormat {
    GLB = "glb",
    FBX = "fbx",
    OBJ = "obj",
    USDZ = "usdz",
    BLEND = "blend",
    STL = "stl"
}
export declare enum OriginAt {
    BOTTOM = "bottom",
    CENTER = "center"
}
export declare enum TextToImageModel {
    NANO_BANANA = "nano-banana",
    NANO_BANANA_PRO = "nano-banana-pro"
}
export declare enum AspectRatio {
    SQUARE = "1:1",
    WIDESCREEN = "16:9",
    PORTRAIT = "9:16",
    STANDARD = "4:3",
    PORTRAIT_STANDARD = "3:4"
}
export declare enum SlicerType {
    AUTO = "auto",
    BAMBU = "bambu",
    ORCASLICER = "orcaslicer",
    CREALITY_PRINT = "creality_print",
    ELEGOO_SLICER = "elegoo_slicer",
    ANYCUBIC_SLICER = "anycubic_slicer",
    PRUSASLICER = "prusaslicer",
    CURA = "cura"
}
export declare const MULTICOLOR_CAPABLE_SLICERS: SlicerType[];
export declare const MULTI_COLOR_CREDITS = 10;
export declare const PRINT_REPAIR_CREDITS = 10;
export declare const PRINT_ANALYZE_CREDITS = 0;
export declare enum AnimationPostProcessOp {
    CHANGE_FPS = "change_fps",
    FBX2USDZ = "fbx2usdz",
    EXTRACT_ARMATURE = "extract_armature"
}
export declare enum ErrorCode {
    INSUFFICIENT_CREDITS = "InsufficientCredits",
    TOO_MANY_PENDING_TASKS = "TooManyPendingTasks",
    INVALID_MODEL_NOT_SUPPORTED = "InvalidModel:NotSupported",
    INVALID_MODEL_INVALID_FORMAT = "InvalidModel:InvalidFormat",
    LIMIT_EXCEEDED = "LimitExceeded",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "NotFound",
    INTERNAL_ERROR = "InternalError"
}
export declare const API_TIMEOUT = 30000;
export declare const RETRY_DELAYS: number[];
export declare const MAX_RETRIES = 3;
export declare const POLL_INITIAL_DELAY = 5000;
export declare const POLL_MAX_DELAY = 30000;
export declare const POLL_BACKOFF_FACTOR = 1.5;
export declare const POLL_FINALIZATION_DELAY = 15000;
export declare const POLL_DEFAULT_TIMEOUT = 300000;
export declare const POLL_MAX_TIMEOUT = 300000;
export declare const RIGGING_MAX_FACES = 300000;
