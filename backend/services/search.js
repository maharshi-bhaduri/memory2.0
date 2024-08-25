import axios from 'axios';
import { Pinecone } from '@pinecone-database/pinecone';
import { allowCors } from '../utils/utils.js';

const search = async function (req, res) {
    if (req.method !== 'GET') {
        res.status(405).send('Only GET requests are allowed');
        return;
    }

    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).send('Query parameter is missing');
        }

        const embeddingResponse = await axios.post(process.env.CF_EMBED_GEN, {
            text: query
        });

        const embedding = embeddingResponse.data.response.data[0];

        if (!embedding) {
            return res.status(500).send('Failed to generate embedding');
        }

        const pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY
        });

        const index = pinecone.Index('memory');

        const queryResponse = await index.query({
            topK: 5,
            vector: embedding,
            includeMetadata: true
        });

        if (!queryResponse || !queryResponse.matches) {
            return res.status(404).send('No matching results found');
        }

        res.status(200).json(queryResponse.matches);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
};

export default allowCors(search);
