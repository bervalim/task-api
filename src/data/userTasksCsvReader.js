import { parse } from 'csv-parse';
import fs from 'node:fs'

const csvPath = new URL('./task.csv', import.meta.url);

const readStream = fs.createReadStream(csvPath);

const csvParse = parse({
    delimiter: ',',
    skipEmptyLines: true,
    fromLine: 2
  });

 const readCsvTaskFile = async () => {
    const linesParse = readStream.pipe(csvParse)

    for await (const line of linesParse) {
        const [title, description] = line

        await fetch('http://localhost:3000/tasks',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description
            })
        })
    }
}

readCsvTaskFile()
