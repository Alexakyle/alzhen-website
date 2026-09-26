import { defineConfig, loadEnv } from 'vite';
import { readFileSync, existsSync } from 'node:fs';
import { parseEnv } from 'node:util';
import inquiry from './api/inquiry.js';

export default defineConfig(({ mode }) => ({
  plugins: [{
    name: 'local-inquiry-api',
    configureServer(server) {
      const env = loadEnv(mode, process.cwd(), ['MAILJET_', 'INQUIRY_']);
      if (existsSync('.env.local')) {
        const local = parseEnv(readFileSync('.env.local', 'utf8'));
        for (const key of ['MAILJET_API_KEY', 'MAILJET_SECRET_KEY', 'MAILJET_FROM_EMAIL', 'INQUIRY_TO_EMAIL', 'INQUIRY_SITE_ORIGIN']) {
          if (key in local) env[key] = local[key];
        }
      }
      server.middlewares.use('/api/inquiry', async (req, res) => {
        res.status = code => { res.statusCode = code; return res; };
        res.json = data => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };
        try {
          let size = 0;
          const chunks = [];
          for await (const chunk of req) {
            size += chunk.length;
            if (size > 16000) return res.status(413).json({ error: 'Inquiry is too long.' });
            chunks.push(chunk);
          }
          req.body = Buffer.concat(chunks).toString('utf8');
          await inquiry(req, res, env);
        } catch {
          if (!res.writableEnded) res.status(500).json({ error: 'Unable to process your inquiry. Please try again later.' });
        }
      });
    },
  }],
}));
