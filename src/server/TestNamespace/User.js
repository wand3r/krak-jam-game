export class User {
    name;
    age;

    constructor() {
        this.name = 'Foo';
        this.age = Math.floor(Math.random() * 55);
    }
}