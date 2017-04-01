import * as Domain from "../../Domain";
import * as Immutable from "immutable";

export class Message implements Domain.IMessage {
    private static idCounter: number = 0;
    public id: number;
    public isHidden: boolean;
    public isPersistent: boolean;
    public type: Domain.MessageType;
    public typeAsString: string;

    constructor(
        public text: string | JSX.Element,
        type?: string,
        isPersistent?: boolean,
    ) {
        this.isPersistent = isPersistent || false;
        this.isHidden = false;
        this.type = this.resolveType(type);

        // Set the type as string
        this.typeAsString = Domain.MessageType[this.type].toLowerCase();

        // Set the id and increment
        this.id = Message.idCounter++;
    }

    public setType(type: Domain.MessageType) {
        this.type = type;
        this.typeAsString = Domain.MessageType[this.type].toLowerCase();
    }

    private resolveType(type: string): Domain.MessageType {
        if (type && type.length > 0) {
            switch (type[0].toLowerCase()) {
                case "i":
                    return Domain.MessageType.INFO;
                case "d":
                    return Domain.MessageType.DEBUG;
                case "w":
                    return Domain.MessageType.WARNING;
                case "e":
                    return Domain.MessageType.ERROR;
                case "f":
                    return Domain.MessageType.FATAL;
                default:
                    return Domain.MessageType.INFO;
            }
        }
        return Domain.MessageType.INFO;
    }
}

export interface IMessageListProperties {
    hideHandler?: (id: number) => void;
    hideAllHandler?: () => void;
    messages?: Immutable.List<Domain.IMessage>;
}

export interface IMessageProperties {
    message: Domain.IMessage;
    hideHandler: (id: number) => void;
}
