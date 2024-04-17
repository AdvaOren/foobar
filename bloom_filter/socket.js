const net = require('net');


class BloomFilter {
    constructor() {
        this.port = 5555;
        this.host = '127.0.0.1';
        this.client = new net.Socket();
        this.connected = false;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(this.port, this.host, () => {
                console.log('Connected to Bloom filter server');
                this.connected = true;
                resolve(); // Resolve the Promise when connected
            });

            this.client.on('error', (error) => {
                console.error('Error:', error);
                reject(error); // Reject the Promise on error
            });
        });
    }

    sendData(data) {
        return new Promise((resolve, reject) => {
            if (!this.connected) {
                reject('Not connected to Bloom filter server');
            } else {
                this.client.write(data);
                // Listen for data from the server
                this.client.once('data', (data) => {
                    console.log('Received data from Bloom filter server:', data.toString());
                    resolve(data.toString());
                });
            }
        });
    }

    async checkBlackListed(content) {
        if (!this.connected) {
            await this.connect();
            ///TODO: add init function
            ///TODO: add blocked sites
        }
        const domainRegex = /(?:https?:\/\/)?(?:www\.)?([\w-]+(?:\.[\w-]+)+){2,}/g;
        const domains = content.match(domainRegex);
        let valid = true;
        if (domains) {
            for (const index in domains) {
                const responseData = await this.sendData("2 "+domains[index]);
                valid = responseData.toString().includes("false");
                if (valid === false)
                    break;
            }
        }
        return valid;
    }
}



module.exports = BloomFilter;