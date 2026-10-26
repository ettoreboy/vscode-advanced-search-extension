/**
 * Object to HashMap.
 * Missing configuration objects resolve to an empty map instead of throwing.
 * @param obj
 */
export function obj_to_map(obj: Record<string, string> | undefined | null): Map<string, string> {
    const mp = new Map<string, string>();

    if (!obj) {
        return mp;
    }

    Object.keys(obj).forEach(k => { mp.set(k, obj[k]); });
    return mp;
}
