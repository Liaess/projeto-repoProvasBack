import faker from "faker";

export function professorsBody(){
    return (faker.random.word())
}

export function disciplineBody(){
    return(faker.random.word())
}

export function completeBody(){
    return{
        name: faker.random.word(),
        discipline: faker.random.word()
    }
}

export function examInformation(){
    return{
        name: faker.random.word(),
        examLink: faker.internet.url(),
    }
}