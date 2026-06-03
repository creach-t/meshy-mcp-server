/**
 * TypeScript type definitions for Meshy API
 */

import {
  TaskStatus,
  TaskPhase,
  Topology,
  AIModel,
  ModelType,
  SymmetryMode,
  PoseMode
} from "./constants.js";

export interface TextureUrlsObject {
  base_color?: string;
  metallic?: string;
  roughness?: string;
  normal?: string;
  ao?: string;
}

export interface TaskError {
  code?: string;
  message: string;
}

export interface CreateTaskApiResponse {
  result: string;
}

export interface TextTo3DApiRequest {
  mode: string;
  prompt: string;
  ai_model: string;
  moderation: boolean;
  model_type?: string;
  target_polycount?: number;
  topology?: string;
  symmetry_mode?: string;
  should_remesh?: boolean;
  pose_mode?: string;
  target_formats?: string[];
  auto_size?: boolean;
  origin_at?: string;
}

export interface ImageTo3DApiRequest {
  image_url: string;
  enable_pbr: boolean;
  moderation: boolean;
  ai_model?: string;
  model_type?: string;
  pose_mode?: string;
  topology?: string;
  target_polycount?: number;
  should_remesh?: boolean;
  symmetry_mode?: string;
  should_texture?: boolean;
  texture_prompt?: string;
  texture_image_url?: string;
  image_enhancement?: boolean;
  remove_lighting?: boolean;
  save_pre_remeshed_model?: boolean;
  target_formats?: string[];
  auto_size?: boolean;
  origin_at?: string;
}

export interface TextTo3DRefineApiRequest {
  mode: string;
  preview_task_id: string;
  enable_pbr: boolean;
  ai_model: string;
  texture_prompt?: string;
  texture_image_url?: string;
  remove_lighting?: boolean;
  target_formats?: string[];
  auto_size?: boolean;
  origin_at?: string;
}

export interface MultiImageTo3DApiRequest {
  image_urls: string[];
  enable_pbr: boolean;
  moderation: boolean;
  ai_model?: string;
  model_type?: string;
  pose_mode?: string;
  topology?: string;
  target_polycount?: number;
  should_remesh?: boolean;
  symmetry_mode?: string;
  should_texture?: boolean;
  texture_prompt?: string;
  texture_image_url?: string;
  image_enhancement?: boolean;
  remove_lighting?: boolean;
  save_pre_remeshed_model?: boolean;
  target_formats?: string[];
  auto_size?: boolean;
  origin_at?: string;
}

export interface RemeshApiRequest {
  target_formats: string[];
  resize_height: number;
  convert_format_only: boolean;
  input_task_id?: string;
  model_url?: string;
  topology?: string;
  target_polycount?: number;
  auto_size?: boolean;
  origin_at?: string;
}

export interface RetextureApiRequest {
  enable_original_uv: boolean;
  enable_pbr: boolean;
  input_task_id?: string;
  model_url?: string;
  text_style_prompt?: string;
  image_style_url?: string;
  ai_model?: string;
  remove_lighting?: boolean;
  target_formats?: string[];
}

export interface RigApiRequest {
  height_meters: number;
  input_task_id?: string;
  model_url?: string;
  texture_image_url?: string;
}

export interface AnimateApiRequest {
  rig_task_id: string;
  action_id: number;
  post_process?: {
    operation_type: string;
    fps?: number;
  };
}

export interface MultiColorPrintApiRequest {
  input_task_id?: string;
  model_url?: string;
  max_colors?: number;
  max_depth?: number;
}

export interface AnalyzePrintabilityApiRequest {
  input_task_id?: string;
  model_url?: string;
}

export interface RepairPrintabilityApiRequest {
  input_task_id?: string;
  model_url?: string;
}

export interface PrintabilityResult {
  _version: string;
  status: "healthy" | "warning" | "error" | "unknown";
  issue_count: number;
  error_count: number;
  warning_count: number;
  metrics: {
    is_watertight: boolean;
    volume: number;
    non_manifold_edges: number;
    degenerate_faces: number;
    holes: number;
  };
  evaluated_at: number;
}

export interface TextToImageApiRequest {
  ai_model: string;
  prompt: string;
  generate_multi_view: boolean;
  aspect_ratio: string;
  pose_mode?: string;
}

export interface ImageToImageApiRequest {
  ai_model: string;
  prompt: string;
  reference_image_urls: string[];
  generate_multi_view: boolean;
}

// Task Model — matches the flat structure returned by Meshy API
export interface Task {
  id: string;
  name?: string;
  type?: string;
  status: TaskStatus;
  phase: TaskPhase;
  progress: number;
  created_at: string | number;
  started_at?: string | number;
  updated_at?: string;
  finished_at?: string | number;

  model_urls?: {
    glb?: string;
    fbx?: string;
    usdz?: string;
    obj?: string;
    mtl?: string;
    blend?: string;
    stl?: string;
    "3mf"?: string;
  };

  // Populated only on print-analyze tasks once SUCCEEDED
  printability?: PrintabilityResult;
  thumbnail_url?: string;
  // text-to-image / image-to-image: array of generated image URLs
  image_urls?: string[];
  texture_urls?: TextureUrlsObject[] | TextureUrlsObject;
  video_url?: string;
  vertex_count?: number;
  face_count?: number;
  aabb?: {
    min: [number, number, number];
    max: [number, number, number];
  };

  prompt?: string;
  preceding_tasks?: number;
  task_error?: TaskError;
  is_published?: boolean;

  // Rigging tasks use a nested "result" with different URL fields
  result?: {
    rigged_character_glb_url?: string;
    rigged_character_fbx_url?: string;
    basic_animations?: {
      walking_glb_url?: string;
      walking_fbx_url?: string;
      walking_armature_glb_url?: string;
      running_glb_url?: string;
      running_fbx_url?: string;
      running_armature_glb_url?: string;
    };
    animation_glb_url?: string;
    animation_fbx_url?: string;
    processed_usdz_url?: string;
    processed_armature_fbx_url?: string;
    processed_animation_fps_fbx_url?: string;
  };
}

export interface TextTo3DArgs {
  prompt: string;
  ai_model: AIModel;
  model_type?: ModelType;
  topology?: Topology;
  target_polycount?: number;
  symmetry_mode?: SymmetryMode;
  should_remesh?: boolean;
  pose_mode?: PoseMode;
}

export interface ImageTo3DArgs {
  image_url: string;
  ai_model?: AIModel;
  model_type?: ModelType;
  pose_mode?: PoseMode;
  enable_pbr: boolean;
  topology?: Topology;
  target_polycount?: number;
  should_remesh?: boolean;
  symmetry_mode?: SymmetryMode;
  should_texture?: boolean;
  texture_prompt?: string;
  texture_image_url?: string;
  image_enhancement?: boolean;
  remove_lighting?: boolean;
  save_pre_remeshed_model?: boolean;
}

export interface CreateTaskRequest {
  mode: string;
  args: TextTo3DArgs | ImageTo3DArgs;
}

export interface CreateTaskResponse {
  id: string;
  status: TaskStatus;
  created_at: string;
}

export interface GetTaskResponse extends Task {}

export interface ListTasksResponse {
  tasks: Task[];
  total: number;
  limit: number;
  offset: number;
}

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface BalanceResponse {
  balance: number;
}

export interface PaginatedResponse<T> {
  total: number;
  count: number;
  offset: number;
  items: T[];
  has_more: boolean;
  next_offset?: number;
}

export interface ModelSummary {
  id: string;
  name: string;
  thumbnail_url: string;
  created_at: string | number;
  vertex_count?: number;
  face_count?: number;
  is_published: boolean;
}
