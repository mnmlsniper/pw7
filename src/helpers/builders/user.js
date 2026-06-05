import { faker } from '@faker-js/faker';
export class UserBuilder {
    withEmail() {
        this.email = faker.internet.email({ lastName: 'BIN', provider: 'robot.dev' });
        return this;
    }
     withPassword(length = 10) {
        this.password = faker.internet.password({length: length});
        return this;
    }

     withUsername(name) {
       this.username = name ?? faker.person.fullName();
        return this;
    }
    build() {
        const result = structuredClone(this);
        return result;
    
    }
}
// иммутабельность объект

/* const user = new UserBuilder().withEmail().withPassword().withUsername().build();
-1 { этот объект } - this.
-2 { email = '1@robot.dev'}
... build
4 {красота}
*/


/*

    let username = faker.person.fullName();
    let email = faker.internet.email({ lastName: 'BIN', provider: 'robot.dev' });
    let password = faker.internet.password() // '89G1wJuBLbGziIs'
*/


/*
const obj = {
isTrue () {
console.log('0')
}
}

obj.isTrue();


*/