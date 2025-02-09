export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const truncateText = (text, limit = 20) =>
    text.length > limit ? text.substring(0, limit) + "..." : text;
