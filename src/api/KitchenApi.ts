import { handleResponse } from './ApiUtilities';
import { IPlannerState } from '../utilities/Interfaces';
const baseUrl = process.env.API_URL + '/kitchens/';

// Load kitchen fetch/promise
export async function loadKitchen(id: number): Promise<any> {
    try {
        const handleRes = await fetch(baseUrl + id);
        return handleResponse(handleRes);
    } catch (handleError) {
        return handleError(handleError);
    }
}

// Save kitchen fetch/promise
export async function saveKitchen(kitchen: IPlannerState): Promise<any> {
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

// Delete kitchen fetch/promise
export async function deleteKitchen(id: number): Promise<any> {
    try {
        const handleRes = await fetch(baseUrl + id, { method: 'DELETE' });
        return handleResponse(handleRes);
    } catch (handleError) {
        return handleError(handleError);
    }
}

// Get the list of kitchens fetch
export async function getKitchensList(): Promise<any> {
    try {
        const handleRes = await fetch(baseUrl);
        return handleResponse(handleRes);
    } catch (handleError) {
        return handleError(handleError);
    }
}
