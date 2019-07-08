const age = enterYourAge();
const permission = isAccesPermitted(age);
const extra = isExtraEnabled(permission);
const car = choiceCar(extra);

const enterYourAge = () => {
    return +prompt('Type your age');
}

const isAccesPermitted = (age) => {
    if (age < 18) {
        throw new Error('You are not permitted to enter');
    } else {
        console.log('Welcome :)');
        return true;
    }
}

const isExtraEnabled = (permission) => {
    if (permission) {
        return prompt('You want to rent a car? --> Type yes');
    }
}

const choiceCar = (extra) => {
    if (extra == 'yes') {
        let choiceCar = ['A', 'B', 'C', 'D'];
        return prompt('Choose a car: ' + choiceCar);
    }
}
