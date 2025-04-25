const { writeFile, readFile } = require("fs").promises;

async function writer() {
    try {
        await writeFile('temp.txt', 'Firest line\n');

        await writeFile('temp.txt', 'Second line\n', { flag: 'a' });

        await writeFile('temp.txt', 'Third line\n', { flag: 'a' });

        console.log('File writing completed');
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

async function reader() {
    try {
        const content = await readFile('temp.txt', 'utf8');
        console.log('File content:\n', content);

    } catch (error) {
        console.error('Error reading file:', error);
    }
}

async function readWrite() {
    await writer(); //waits for writer asyn function to finished 
    await reader(); //Then waits for reader async function to finish
}

readWrite(); // Start the program since readWrite calls writer and reader function