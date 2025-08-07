import * as dotenv from 'dotenv';
dotenv.config();

import { expect, test } from 'vitest'
import { Session } from '../src/session';

const urlPrefix = process.env.REVORNIX_URL_PREFIX
const apiKey = process.env.API_KEY

// 判断是否跳过测试
const shouldSkip = !urlPrefix || !apiKey;

// 可选封装一下
const conditionalTest = shouldSkip ? test.skip : test;

conditionalTest('createQuickNoteDocument', async () => {
    const session = new Session(urlPrefix!, apiKey!)
    const res = await session.createQuickNoteDocument({
        content: "Hello World",
        sections: [],
        auto_summary: false
    })
    expect(res.status).toBe(200)
})

conditionalTest('createWebsiteDocument', async () => {
    const session = new Session(urlPrefix!, apiKey!)
    const res = await session.createWebsiteDocument({
        url: "https://www.google.com",
        auto_summary: false,
        sections: []
    })
    expect(res.status).toBe(200)
})

conditionalTest('createFileDocument', async () => {
    const session = new Session(urlPrefix!, apiKey!)
    const res = await session.createFileDocument({
        file_name: "test.txt",
        auto_summary: false,
        sections: []
    })
    expect(res.status).toBe(200)
})

conditionalTest('createDocumentLabel', async () => {
    const session = new Session(urlPrefix!, apiKey!)
    const res = await session.createDocumentLabel({
        name: "test"
    })
    expect(res.status).toBe(200)
})

conditionalTest('createSectionLabel', async () => {
    const session = new Session(urlPrefix!, apiKey!)
    const res = await session.createSectionLabel({
        name: "test"
    })
    expect(res.status).toBe(200)
})

conditionalTest('getMineAllDocumentLabels', async () => {
    const session = new Session(urlPrefix!, apiKey!)
    const res = await session.getMineAllDocumentLabels()
    expect(res.status).toBe(200)
})

conditionalTest('createSection', async () => {
    const session = new Session(urlPrefix!, apiKey!)
    const res = await session.createSection({
        title: "test",
        description: "test",
        labels: [],
        public: false
    })
    expect(res.status).toBe(200)
})