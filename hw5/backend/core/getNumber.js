let number;

const genNumber = () => {
    number = Math.floor(Math.random() * 100) + 1;
}

const getNumber = () => number;

export {getNumber, genNumber}