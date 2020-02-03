
class Transaction {
    constructor(sender, receiver, amount) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
    }
    get sender() {
        return this._sender;
    }
    set sender (in_sender) {
        this._sender = in_sender;
    }

    get receiver() {
        return this._receiver;
    }
    set receiver(in_receiver) {
        this._receiver = in_receiver;
    }

    get amount() {
        return this._amount;
    }
    set amount(in_amount) {
        this._amount = in_amount;
    }

}

module.exports = Transaction;