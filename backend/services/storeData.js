import axios from 'axios';
import * as cheerio from 'cheerio';
import { Pinecone } from '@pinecone-database/pinecone';
import { allowCors } from '../utils/utils.js';

const storeData = async function (req, res) {
    if (req.method !== 'POST') {
        res.status(405).send('Only POST requests are allowed');
        return;
    }

    try {
        console.log('entered function')
        const { url } = req.body;
        console.log('url ', url)
        if (!url) {
            return res.status(400).send('URL parameter is missing');
        }

        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const text = $('body').text().trim();
        const title = $('title').text().trim();

        if (!text) {
            return res.status(400).send('No text content found in the provided URL');
        }

        const embeddingResponse = await axios.post(process.env.CF_EMBED_GEN, {
            text: text
        });

        const embedding = embeddingResponse.data.response.data[0];

        if (!embedding) {
            return res.status(500).send('Failed to generate embedding');
        }

        const pinecone = new Pinecone({
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
        console.error('Error: ', error.message)
        res.status(500).send(`Error: ${error.message}`);
    }
};

export default allowCors(storeData);
