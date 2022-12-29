class Service {
    port = process.env.PORT;
    host = process.env.HOST;

    getPort() {
        return parseInt(this.port)
    }

    getHost(){
        return this.host
    }
}

module.exports = {
    ServiceUtils: new Service()
}