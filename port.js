class Port {
    get id() {
        return this._port;
    }
    set id(in_port) {
        this._port = in_port;
    }
}

exports.gPort = new Port();

