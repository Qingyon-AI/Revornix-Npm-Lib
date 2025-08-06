# Revornix-Npm-Lib

The nodejs package for Revornix API.

📕 API Document: [revornix/api](https://revornix.com/en/docs/features/api)

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/Qingyon-AI/Revornix)

## Full Docker App

https://github.com/Qingyon-AI/Revornix

## Introduction

🚀 RoadMap: [RoadMap](https://huaqinda.notion.site/RoadMap-224bbdbfa03380fabd7beda0b0337ea3)

🖥️ Official Website: [https://revornix.com](https://revornix.com)

❤️ Join our community: [Discord](https://discord.com/invite/3XZfz84aPN) | [WeChat](https://github.com/Qingyon-AI/Revornix/discussions/1#discussioncomment-13638435) | [QQ](https://github.com/Qingyon-AI/Revornix/discussions/1#discussioncomment-13638435)

## Installation

```shell
pnpm add revornix
```

## Usage

### Create Document Label

```ts
import { Session } from 'revornix';

const revornixSession = new Session('YOUR_API_PREFIX', 'YOUR_API_KEY');
const response = await session.createDocumentLabel({
    name: "test"
})

console.log(response);
```

### Create Section Label

```ts
const revornixSession = new Session('YOUR_API_PREFIX', 'YOUR_API_KEY');
const response = await revornixSession.createSectionLabel({
    name: "test"
})

console.log(response);
```

### Get Mine All Document Labels

```ts
const revornixSession = new Session('YOUR_API_PREFIX', 'YOUR_API_KEY');
const response = await session.getMineAllDocumentLabels()

console.log(response);
```

### Create Quick Note Document

```ts
import { Session } from 'revornix';

const revornixSession = new Session('YOUR_API_PREFIX', 'YOUR_API_KEY');
const response = await session.createQuickNoteDocument({
    content: "Hello World",
    sections: [],
    auto_summary: false
});

console.log(response);
```

### Create Website Document

```ts
import { Session } from 'revornix';

const revornixSession = new Session('YOUR_API_PREFIX', 'YOUR_API_KEY');
const response = await session.createWebsiteDocument({
    url: "https://www.google.com",
    auto_summary: false,
    sections: []
});

console.log(response);
```

### Create File Document

```ts
import { Session } from 'revornix';

const revornixSession = new Session('YOUR_API_PREFIX', 'YOUR_API_KEY');
const response = await session.createFileDocument({
    file_name: "test.txt",
    auto_summary: false,
    sections: []
});

console.log(response);
```

## Contributors

<a href="https://github.com/Qingyon-AI/Revornx/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Qingyon-AI/Revornix" />
</a>