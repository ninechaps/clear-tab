import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpClient {
    private instance: AxiosInstance;

    constructor() {
        // In development, requests to zenquotes.io will be proxied via Vite
        // In production (Chrome extension), requests will use full URL with host_permissions
        this.instance = axios.create({
            timeout: 10000,
        });

        // Request interceptor to handle URLs across environments
        this.instance.interceptors.request.use((config) => {
            config.url = this.normalizeUrl(config.url || '');
            return config;
        });

        // Response interceptor
        this.instance.interceptors.response.use(
            (response) => response,
            (error) => Promise.reject(error)
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.instance.get(url, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.instance.post(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.instance.put(url, data, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.instance.delete(url, config);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    /**
     * Normalize URL based on execution environment
     * - In Chrome extension: convert relative /api/* paths to absolute URLs
     * - In development: keep relative paths for Vite proxy to intercept
     */
    private normalizeUrl(url: string): string {
        const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

        if (isExtension && url.startsWith('/api/')) {
            // Chrome extension environment: add domain prefix for CORS and host_permissions
            return `https://zenquotes.io${url}`;
        }

        if (!isExtension && url.includes('zenquotes.io')) {
            // Development environment: strip domain for Vite proxy
            return url.replace('https://zenquotes.io', '');
        }

        return url;
    }

    private handleError(error: unknown): Error {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message || 'Network request failed';
            return new Error(message);
        }
        if (error instanceof Error) {
            return error;
        }
        return new Error('Unknown error occurred');
    }
}

export const httpClient = new HttpClient();
