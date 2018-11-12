
export class Student {

    private htlid: string;
    private surname: string;
    private firstname: string;

    constructor (htlid: string, surname: string, firstname: string) {
        this.htlid = htlid;
        this.surname = surname;
        this.firstname = firstname;
    }
    public getHtlid (): string {
        return this.htlid;
    }
    public getSurname (): string {
        return this.surname;
    }
    public getFirstname (): string {
        return this.firstname;
    }
}
// gleich wie in Java alle Objekte erstellen und danach constructor übergeben und getter Methoden
