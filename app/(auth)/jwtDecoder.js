// jwtDecoder.js

function base64UrlDecode(str) {
    // Replace URL-safe characters
    str = str.replace(/-/g, '+').replace(/_/g, '/');

    // Pad with '=' to make the string a multiple of 4
    const padding = str.length % 4 === 0 ? 0 : 4 - (str.length % 4);
    str += '='.repeat(padding);

    return decodeURIComponent(escape(atob(str)));
}

function decodeJwt(token) {
    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error('Invalid JWT');
    }

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    return { header, payload };
}

function getUserRoleFromToken(token) {
    try {
        const { payload } = decodeJwt(token);
        return payload.role; // Change 'role' to match your token's structure
    } catch (error) {
        console.error('Error decoding token:', error);
        return null; // Return null or handle the error as necessary
    }
}

// Export the function to be used in other files
export { getUserRoleFromToken };
