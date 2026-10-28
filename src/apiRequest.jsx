
const apiRequest = async (url = '', optionsObj = null) => {
    try {
        const response = await fetch(url, optionsObj);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (optionsObj?.method === 'DELETE') {
            return null;
        }

        return await response.json();

    } catch (err) {
        return { error: err.message || 'Request failed' };
    }
};

export default apiRequest;
