const escapeHtml = (unsafeString) => {
    return unsafeString
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


const escapeRegExp = (unsafeString) => {
    return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const highlightCaseInsensitive = (text, query) => {
    const safeText = escapeHtml(text);
    const queryFormatted = query.trim()

    if (queryFormatted.length === 0) {
        return safeText;
    }

    const pattern = new RegExp(escapeRegExp(queryFormatted), 'gi');

    return safeText.replace(pattern, (match) => `<mark>${match}</mark>`);
}