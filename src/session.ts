import axios, { Axios, AxiosResponse } from "axios";
import api from "./api";

interface FileDocumentParameters {
    title?: string;
    description?: string;
    sections: number[];
    auto_summary: boolean;
    labels?: number[];
    cover?: string;
    file_name?: string
}

interface WebsiteDocumentParameters {
    title?: string;
    description?: string;
    sections: number[];
    auto_summary: boolean;
    labels?: number[];
    cover?: string;
    url?: string
}

interface QuickNoteDocumentParameters {
    title?: string
    description?: string
    sections: number[]
    auto_summary: boolean
    labels?: number[]
    cover?: string
    content?: string
}

interface DocumentCreateResponse {
    document_id: number
}

export class Session {

    private apiKey: string;
    private baseUrl: string;
    private axiosInstance: Axios;
    private fromPlat: string = "revornix npm package"

    public constructor(baseUrl: string, apiKey: string) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        const axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Api-Key': `${this.apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        this.axiosInstance = axiosInstance;
    }

    public async createFileDocument(data: FileDocumentParameters): Promise<AxiosResponse<DocumentCreateResponse>> {
        let category = 0
        const res = await this.axiosInstance.post(`${api.createDocument}`, { ...data, category, from_plat: this.fromPlat })
        return res
    }

    public createWebsiteDocument(data: WebsiteDocumentParameters): Promise<AxiosResponse<DocumentCreateResponse>> {
        let category = 1
        const res = this.axiosInstance.post(`${api.createDocument}`, { ...data, category, from_plat: this.fromPlat })
        return res
    }

    public createQuickNoteDocument(data: QuickNoteDocumentParameters): Promise<AxiosResponse<DocumentCreateResponse>> {
        let category = 2
        const res = this.axiosInstance.post(`${api.createDocument}`, { ...data, category, from_plat: this.fromPlat })
        return res
    }

}