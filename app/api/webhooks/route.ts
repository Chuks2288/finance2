import axios from 'axios';

interface WebhookAttributes {
    url: string;
    events: string[];
    secret?: string;
    last_sent_at?: string;
    created_at?: string;
    updated_at?: string;
    test_mode?: boolean;
}

interface StoreData {
    type: string;
    id: string;
}

interface WebhookRelationships {
    store: {
        data: StoreData;
    };
}

interface WebhookData {
    type: string;
    id?: string;
    attributes: WebhookAttributes;
    relationships?: WebhookRelationships;
}

interface WebhookRequest {
    data: WebhookData;
}

interface WebhookResponse {
    data: WebhookData;
    links?: {
        self: string;
    };
}

interface PaginatedResponse {
    meta: {
        page: {
            currentPage: number;
            from: number;
            lastPage: number;
            perPage: number;
            to: number;
            total: number;
        };
    };
    links: {
        first: string;
        last: string;
    };
    data: WebhookData[];
}




const apiClient = axios.create({
    baseURL: 'https://api.lemonsqueezy.com/v1',
    headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer YOUR_API_KEY`, // Replace YOUR_API_KEY with your actual API key
    },
});


export const createWebhook = async (webhookData: WebhookRequest): Promise<WebhookResponse> => {
    try {
        const response = await apiClient.post<WebhookResponse>('/webhooks', webhookData);
        console.log('Webhook created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating webhook:', error);
        throw error;
    }
};

// // Example usage
// export const newWebhook: WebhookRequest = {
//     data: {
//         type: 'webhooks',
//         attributes: {
//             url: 'https://mysite.com/webhooks/',
//             events: [
//                 'order_created',
//                 'subscription_created',
//                 'subscription_updated',
//                 'subscription_expired',
//             ],
//             secret: 'SIGNING_SECRET', // Replace SIGNING_SECRET with your actual secret
//         },
//         relationships: {
//             store: {
//                 data: {
//                     type: 'stores',
//                     id: '1',
//                 },
//             },
//         },
//     },
// };

// createWebhook(newWebhook);

// export const getWebhook = async (id: string): Promise<WebhookResponse> => {
//     try {
//         const response = await apiClient.get<WebhookResponse>(`/webhooks/${id}`);
//         console.log('Webhook retrieved successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error retrieving webhook:', error);
//         throw error;
//     }
// };

// // Example usage
// getWebhook('1');

// const updateWebhook = async (id: string, webhookData: WebhookRequest): Promise<WebhookResponse> => {
//     try {
//         const response = await apiClient.patch<WebhookResponse>(`/webhooks/${id}`, webhookData);
//         console.log('Webhook updated successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error updating webhook:', error);
//         throw error;
//     }
// };

// // Example usage
// export const updatedWebhook: WebhookRequest = {
//     data: {
//         type: 'webhooks',
//         id: '1',
//         attributes: {
//             events: [
//                 'order_created',
//                 'order_refunded',
//                 'subscription_created',
//                 'subscription_updated',
//                 'subscription_expired',
//             ],
//         },
//     },
// };

// updateWebhook('1', updatedWebhook);


// export const deleteWebhook = async (id: string): Promise<void> => {
//     try {
//         await apiClient.delete(`/webhooks/${id}`);
//         console.log('Webhook deleted successfully');
//     } catch (error) {
//         console.error('Error deleting webhook:', error);
//         throw error;
//     }
// };

// // Example usage
// deleteWebhook('1');

// export const listWebhooks = async (storeId?: string): Promise<PaginatedResponse> => {
//     try {
//         const response = await apiClient.get<PaginatedResponse>('/webhooks', {
//             params: storeId ? { 'filter[store_id]': storeId } : {},
//         });
//         console.log('Webhooks retrieved successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error listing webhooks:', error);
//         throw error;
//     }
// };

// // Example usage
// listWebhooks('1'); // Optional: Pass storeId to filter by store


