/**
 * Object to HashMap
 * @param obj
 */
export function obj_to_map(obj: any): Map<string, string> {
    const mp = new Map<string, string>();
    Object.keys(obj).forEach(k => { mp.set(k, obj[k]); });
    return mp;
}
