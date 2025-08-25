import axios, { Axios, AxiosResponse } from "axios";
import { ReadStream } from "fs";
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

interface CreateSectionRequest {
    title: string
    description: string
    public: boolean
    cover?: string
    labels: number[]
}

interface CreateSectionResponse {
    id: number
}

interface BaseSectionInfo {
    id: number
    title: string
    description: string
}

interface AllMySectionsResponse {
    data: BaseSectionInfo[]
}

interface NormalResponse {
    success: Boolean
    message: String
    code?: number
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
                'Api-Key': `${this.apiKey}`
            },
        });
        this.axiosInstance = axiosInstance;
    }

    public async uploadFile(file: File | ReadStream, remoteFilePath: string, contentType?: string): Promise<AxiosResponse<NormalResponse>> {
        const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
        const isNode = typeof process !== 'undefined' && process.release && process.release.name === 'node';
        if (isNode) {
            let browserFile = file as File;
            const FormData = (await import('form-data')).default;
            const formData = new FormData();
            formData.append('file', browserFile);
            formData.append('file_path', remoteFilePath);
            formData.append('content_type', contentType);
            const response = await this.axiosInstance.post(`${api.uploadFile}`, formData);
            return response
        }
        if (isBrowser) {
            let nodeJsFile = file as File;
            const formData = new FormData();
            formData.append('file', nodeJsFile);
            formData.append('file_path', remoteFilePath);
            formData.append('content_type', contentType || nodeJsFile.type || 'application/octet-stream');
            const response = await this.axiosInstance.post('/file/upload', formData);
            return response
        }
        throw new Error("Unsupported environment")
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

    public createSection(data: CreateSectionRequest): Promise<AxiosResponse<CreateSectionResponse>> {
        const res = this.axiosInstance.post(`${api.createSection}`, { ...data })
        return res
    }

    public getMineAllSection(): Promise<AxiosResponse<AllMySectionsResponse>> {
        const res = this.axiosInstance.post(`${api.getMineAllSection}`)
        return res
    }

}