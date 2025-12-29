import { writeFile, rm } from 'node:fs/promises';
import { env } from 'node:process';

const { WHEEL_OF_NAMES_API_KEY } = env;
if (!WHEEL_OF_NAMES_API_KEY) throw Error('WHEEL_OF_NAMES_API_KEY not set!');


export async function getSpinAnimation(texts: string[]) {
  const imageFormat = 'webp';
  const response = await globalThis.fetch(
    'https://wheelofnames.com/api/v2/wheels/animate',
    {
      method: 'POST',
      headers: {
        'x-api-key': WHEEL_OF_NAMES_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wheelConfig: {
          entries: texts.map((text) => ({ text })),
          spinTime: 3
        },
        imageFormat,
        responseFormat: 'formData',
        initialAngle: Math.random() * 2 * Math.PI
      })
    }
  );
  if (!response.headers.get('Content-Type')?.startsWith('multipart/form-data')) {
    if (response.headers.get('Content-Type') === 'application/json') {
      const data = await response.json();
      if (data && typeof data === 'object' && 'error' in data && typeof data.error === 'string') {
        throw Error(data.error);
      }
    }
    throw Error('Invalid response');
  }
  const formData = await response.formData();
  const winner = JSON.parse(formData.get('winner')?.toString() ?? 'null');
  if (!winner) throw Error('Invalid response');
  const file = formData.get('animation');
  if (!file || typeof file !== 'object') throw Error('Invalid response');
  const arrayBuffer = await file.arrayBuffer();
  const animation = Buffer.from(arrayBuffer);
  // discord.js wants a file path rather than the raw buffer, so we need to write it to file first.
  // We can then remove the file after sending it to clean up after ourselves.
  const filePath = `./output/spin-${Math.floor(Math.random() * 100)}.${imageFormat}`;
  await writeFile(filePath, animation);
  return {
    filePath,
    winner,
    cleanup: () => rm(filePath)
  };
}
