/**
 * Simple wait handler to hold on for a given number of milliseconds. Use this
 */
export default (millis: number) => {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, millis);
    });
};
