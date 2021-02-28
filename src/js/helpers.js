export function getSplitChar (text) {
    if (text.indexOf("\n") > -1) {
        return "\n";
    } else if (text.indexOf(",") > -1) {
        return ",";
    } else {
        return "";
    }
}
