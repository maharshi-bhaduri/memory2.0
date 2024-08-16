import axios from 'axios';
import * as cheerio from 'cheerio';
import pineconePkg from '@pinecone-database/pinecone';
const { Pinecone: PineconeClient } = pineconePkg;
import { allowCors } from '../utils/utils.js';

const storeData = async function (req, res) {
    if (req.method !== 'POST') {
        res.status(405).send('Only POST requests are allowed');
        return;
    }

    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).send('URL parameter is missing');
        }

        // Step 1: Extract text and title from the provided URL
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const text = $('body').text().trim();
        const title = $('title').text().trim();

        if (!text) {
            return res.status(400).send('No text content found in the provided URL');
        }

        // Step 2: Send extracted text to the embedding API
        const embeddingResponse = await axios.post('https://embedgen.postcloud.workers.dev', {
            text: text
        });

        const embedding = embeddingResponse.data.response.data[0];

        if (!embedding) {
            return res.status(500).send('Failed to generate embedding');
        }

        // Step 3: Initialize Pinecone client and store the embedding with metadata
        const pinecone = new PineconeClient({
            apiKey: process.env.PINECONE_API_KEY
        });

        const index = pinecone.Index('memory');

        await index.upsert([
            {
                id: url,
                values: embedding,
                metadata: {
                    title: title,
                    url: url
                }
            }
        ]);

        res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
};

export default allowCors(storeData);
