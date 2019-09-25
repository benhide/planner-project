import { IKitchen } from '../utilities/Interfaces';
import { handleResponse } from './apiUtils';
const baseUrl = process.env.API_URL + '/kitchens/';

// TODO
export async function loadKitchens(): Promise<any> {
    try {
        const handleRes = await fetch(baseUrl);
        return handleResponse(handleRes);
    } catch (handleError) {
        return handleError(handleError);
    }
}

// TODO
export async function saveKitchen(kitchen: IKitchen): Promise<any> {
    try {
        const handleRes = await fetch(baseUrl + (kitchen.id || ''), {
            method: kitchen.id ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(kitchen),
        });
        return handleResponse(handleRes);
    } catch (handleError) {
        return handleError(handleError);
    }
}

// TODO
export async function deleteKitchen(id: number): Promise<any> {
    try {
        const handleRes = await fetch(baseUrl + id, { method: 'DELETE' });
        return handleResponse(handleRes);
    } catch (handleError) {
        return handleError(handleError);
    }
}
