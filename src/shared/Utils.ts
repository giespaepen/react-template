/**
 * Map enumeration to an array of strings
 */
export function mapEnum(e: any): Array<{ key: string, value: number }> {
    return Object.keys(e)
        .map((key) => e[key])
        .filter((key) => typeof key === "string")
        .map((key) => {
            return {
                key,
                value: e[key],
            };
        });
}
