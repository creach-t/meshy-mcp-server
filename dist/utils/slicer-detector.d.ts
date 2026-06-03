export interface SlicerInfo {
    type: string;
    displayName: string;
    detected: boolean;
    launch_command?: string;
    is_multicolor_capable: boolean;
}
export declare function detectInstalledSlicers(isMulticolor?: boolean): SlicerInfo[];
