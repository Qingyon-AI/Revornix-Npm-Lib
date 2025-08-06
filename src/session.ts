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

interface Label {
    id: number
    name: string
}

interface LabelListResponse {
    data: Label[]
}

interface LabelAddRequest {
    name: string
}

interface CreateLabelResponse {
    id: number
    name: string
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

    public getMineAllDocumentLabels(): Promise<AxiosResponse<LabelListResponse>> {
        const res = this.axiosInstance.post(`${api.getMineAllDocumentLabels}`)
        return res
    }

    public createDocumentLabel(data: LabelAddRequest): Promise<AxiosResponse<CreateLabelResponse>> {
        const res = this.axiosInstance.post(`${api.createDocumentLabel}`, { ...data })
        return res
    }

    public createSectionLabel(data: LabelAddRequest): Promise<AxiosResponse<CreateLabelResponse>> {
        const res = this.axiosInstance.post(`${api.createSesionLabel}`, { ...data })
        return res
    }

}