/**
 * Cross-platform slicer detection utilities.
 * Detects installed 3D printing slicer software and returns launch commands.
 * Does NOT execute launches — returns commands for the agent to run.
 */
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { SlicerType, MULTICOLOR_CAPABLE_SLICERS } from "../constants.js";
const SLICER_REGISTRY = [
    {
        type: SlicerType.ORCASLICER,
        displayName: "OrcaSlicer",
        macApp: "OrcaSlicer",
        winExe: "orca-slicer.exe",
        winDir: "OrcaSlicer",
        linuxExe: "orca-slicer",
        urlScheme: {
            mac: "orcasliceropen://",
            windows: "orcaslicer://",
            linux: "orcaslicer://"
        }
    },
    {
        type: SlicerType.BAMBU,
        displayName: "Bambu Studio",
        macApp: "BambuStudio",
        winExe: "bambu-studio.exe",
        winDir: "BambuStudio",
        linuxExe: "bambu-studio",
        urlScheme: {
            mac: "bambustudioopen://",
            windows: "bambustudio://open?file=",
            linux: "bambustudio://open?file="
        }
    },
    {
        type: SlicerType.CREALITY_PRINT,
        displayName: "Creality Print",
        macApp: "Creality Print",
        winExe: "CrealityPrint.exe",
        winDir: "Creality Print*", // Version number in dir name
        linuxExe: null,
        urlScheme: { mac: "CrealityPrintLink://" }
    },
    {
        type: SlicerType.ELEGOO_SLICER,
        displayName: "Elegoo Slicer",
        macApp: "ElegooSlicer",
        winExe: "elegoo-slicer.exe",
        winDir: "ElegooSlicer",
        linuxExe: null,
        urlScheme: { mac: "elegooslicer://", windows: "elegooslicer://", linux: "elegooslicer://" }
    },
    {
        type: SlicerType.ANYCUBIC_SLICER,
        displayName: "Anycubic Slicer Next",
        macApp: "AnycubicSlicerNext",
        winExe: "AnycubicSlicerNext.exe",
        winDir: "AnycubicSlicerNext",
        linuxExe: null,
        urlScheme: { mac: "acnext://" }
    },
    {
        type: SlicerType.PRUSASLICER,
        displayName: "PrusaSlicer",
        macApp: "PrusaSlicer",
        winExe: "prusa-slicer.exe",
        winDir: "PrusaSlicer",
        linuxExe: "prusa-slicer"
    },
    {
        type: SlicerType.CURA,
        displayName: "UltiMaker Cura",
        macApp: "UltiMaker Cura",
        winExe: "UltiMaker-Cura.exe",
        winDir: "UltiMaker Cura*", // Version number in dir name
        linuxExe: null
    }
];
// ---------- Platform Detection Helpers ----------
function detectOnMac(entry) {
    const appPath = `/Applications/${entry.macApp}.app`;
    if (fs.existsSync(appPath)) {
        return appPath;
    }
    return null;
}
function detectOnWindows(entry) {
    const programFilesDirs = [
        process.env.ProgramFiles || "C:\\Program Files",
        process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)"
    ];
    for (const base of programFilesDirs) {
        if (entry.winDir.includes("*")) {
            // Glob match: directory name contains version number
            const pattern = entry.winDir.replace("*", "");
            try {
                const entries = fs.readdirSync(base);
                for (const dirName of entries) {
                    if (dirName.startsWith(pattern)) {
                        const exePath = path.join(base, dirName, entry.winExe);
                        if (fs.existsSync(exePath)) {
                            return exePath;
                        }
                    }
                }
            }
            catch {
                // Directory not readable
            }
        }
        else {
            const exePath = path.join(base, entry.winDir, entry.winExe);
            if (fs.existsSync(exePath)) {
                return exePath;
            }
        }
    }
    return null;
}
function detectOnLinux(entry) {
    if (!entry.linuxExe)
        return null;
    try {
        const result = execSync(`which ${entry.linuxExe}`, { timeout: 2000, encoding: "utf-8" }).trim();
        if (result)
            return result;
    }
    catch {
        // Not found or timeout
    }
    return null;
}
// ---------- Launch Command Builders ----------
function buildLaunchCommand(entry, detectedPath, filePlaceholder) {
    const platform = process.platform;
    if (platform === "darwin") {
        return `open -a "${entry.macApp}" "${filePlaceholder}"`;
    }
    else if (platform === "win32") {
        return `"${detectedPath}" "${filePlaceholder}"`;
    }
    else {
        // Linux
        if (entry.linuxExe) {
            return `${entry.linuxExe} "${filePlaceholder}"`;
        }
        return `xdg-open "${filePlaceholder}"`;
    }
}
function getUrlSchemeForPlatform(entry) {
    const platform = process.platform;
    if (platform === "darwin")
        return entry.urlScheme?.mac;
    if (platform === "win32")
        return entry.urlScheme?.windows;
    return entry.urlScheme?.linux;
}
// ---------- Exported Functions ----------
/**
 * Detect all installed slicer software on the current system.
 * Returns an array sorted with multicolor-capable slicers first.
 */
export function detectInstalledSlicers() {
    const platform = process.platform;
    const found = [];
    for (const entry of SLICER_REGISTRY) {
        let detectedPath = null;
        if (platform === "darwin") {
            detectedPath = detectOnMac(entry);
        }
        else if (platform === "win32") {
            detectedPath = detectOnWindows(entry);
        }
        else {
            detectedPath = detectOnLinux(entry);
        }
        if (detectedPath) {
            const supportsMulticolor = MULTICOLOR_CAPABLE_SLICERS.includes(entry.type);
            found.push({
                type: entry.type,
                displayName: entry.displayName,
                supportsMulticolor,
                path: detectedPath,
                launchCommand: buildLaunchCommand(entry, detectedPath, "{file}"),
                urlScheme: getUrlSchemeForPlatform(entry)
            });
        }
    }
    // Sort: multicolor-capable first
    found.sort((a, b) => {
        if (a.supportsMulticolor && !b.supportsMulticolor)
            return -1;
        if (!a.supportsMulticolor && b.supportsMulticolor)
            return 1;
        return 0;
    });
    return found;
}
/**
 * Detect a specific slicer by type.
 * Returns null if not installed.
 */
export function detectSlicer(type) {
    const entry = SLICER_REGISTRY.find(e => e.type === type);
    if (!entry)
        return null;
    const platform = process.platform;
    let detectedPath = null;
    if (platform === "darwin") {
        detectedPath = detectOnMac(entry);
    }
    else if (platform === "win32") {
        detectedPath = detectOnWindows(entry);
    }
    else {
        detectedPath = detectOnLinux(entry);
    }
    if (!detectedPath)
        return null;
    return {
        type: entry.type,
        displayName: entry.displayName,
        supportsMulticolor: MULTICOLOR_CAPABLE_SLICERS.includes(entry.type),
        path: detectedPath,
        launchCommand: buildLaunchCommand(entry, detectedPath, "{file}"),
        urlScheme: getUrlSchemeForPlatform(entry)
    };
}
/**
 * Get the best slicer for multicolor printing from a list of installed slicers.
 * Returns null if no multicolor-capable slicer is installed.
 */
export function getBestMulticolorSlicer(installed) {
    return installed.find(s => s.supportsMulticolor) || null;
}
