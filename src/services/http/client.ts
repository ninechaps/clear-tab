import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class HttpClient {
    private instance: AxiosInstance;

    constructor() {
        // In development, requests to zenquotes.io will be proxied via Vite
        // In production (Chrome extension), requests will use full URL with host_permissions
        this.instance = axios.create({
            timeout: 10000,
        });

        // Request interceptor to rewrite URLs in development
        this.instance.interceptors.request.use((config) => {
            const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

            // In non-extension environment (development), rewrite zenquotes.io URLs to use proxy
            if (!isExtension && config.url?.includes('zenquotes.io')) {
                config.url = config.url.replace('https://zenquotes.io', '');
            }

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
