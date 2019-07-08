class Animal {
    constructor(age = 0) {
        this.type = 'animal';
        this.gender = 'default';
        this.age = age;
        }
        
        static isOld(age) {
        if (age > 20) {
            throw new Error("Critical age!");
        } else if (age <= 20) {
            return true;
        }
    }
}

class Dog extends Animal {
    type = 'dog';
    constructor(){
        super();        
    }
    set name (name) {
        this._name = name;
    }
    set age (age) {
        if (Animal.isOld(age)) {
            this._age = age;
        }
    }
}

class Cat extends Animal {
    type = 'cat';
    constructor(){
        super();        
    }
    set name (name) {
        this._name = name;
    }
    set age (age) {
        if (Animal.isOld(age)) {
            this._age = age;
        }
    }
}

class Parrot extends Animal {
    type = 'bird';
    constructor(){
        super();        
    }
    set name (name) {
        this._name = name;
    }
    set age (age) {
        if (Animal.isOld(age)) {
            this._age = age;
        }
    }
}

