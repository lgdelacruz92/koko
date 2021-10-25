export const assert = (bool, msg) => {
    if (!bool) {
        return { success: bool, message: msg };
    } else {
        return { success: bool, message: null };
    }
}