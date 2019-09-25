// Api call was successful, handle response
export async function handleResponse(response: Response): Promise<any> {
    if (response.ok) {
        return response.json();
    }
    if (response.status === 400) {
        const error = await response.text();
        throw new Error(error);
    }
    throw new Error('Network response was not ok.');
}

// An error occured during api call
export function handleError(error: string) {
    throw error;
}
