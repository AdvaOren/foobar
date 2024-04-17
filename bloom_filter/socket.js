const net = require('net');



let client = new net.Socket();
let connected = false;

function connect() {
    const port = process.env.PORT;
    const host = process.env.CONNECTION_STRING;
    return new Promise((resolve, reject) => {
        client.connect(port, host, () => {
            console.log('Connected to Bloom filter server');
            connected = true;
            resolve(); // Resolve the Promise when connected
        });

        client.on('error', (error) => {
            console.error('Error:', error);
            reject(error); // Reject the Promise on error
        });
    });
}

function sendData(data) {
    return new Promise((resolve, reject) => {
        if (!connected) {
            reject('Not connected to Bloom filter server');
        } else {
            client.write(data);
            // Listen for data from the server
            client.once('data', (data) => {
                console.log('Received data from Bloom filter server:', data.toString());
                resolve(data.toString());
            });
        }
    });
}

async function init() {
    await connect();
    const blackList = process.env.BLACKLIST.toString().split(",");
    await sendData(process.env.BLOOM_INIT);
    for (const url in blackList) {
         await sendData("1 " + blackList[url]);
    }
}

async function checkBlackListed(content) {
    if (!connected) {
        await connect();
    }
    const domainRegex = /(?:https?:\/\/)?(?:www\.)?([\w-]+(?:\.[\w-]+)+){2,}/g;
    const domains = content.match(domainRegex);
    let valid = true;
    if (domains) {
        for (const index in domains) {
            const responseData = await sendData("2 " + domains[index]);
            valid = responseData.toString().includes("false");
            if (valid === false)
                break;
        }
    }
    return valid;
}



module.exports = {init, checkBlackListed}