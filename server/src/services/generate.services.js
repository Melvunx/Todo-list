class Generator {
  constructor(
    loop,
    lowerCharacter = "azertyuiopmlkjhgfdsqwxcvbn",
    symbolsCharacter = ",?;./:!§£*µù%^\"'éèàç([)@){=}]#~&",
    numbers = "0473291586"
  ) {
    this.loop = loop;
    this.lowerCharacter = lowerCharacter;
    this.symbolsCharacter = symbolsCharacter;
    this.numbers = numbers;
  }

  generateIds() {
    let idSelector = [
      ...this.lowerCharacter,
      ...this.numbers,
      ...this.lowerCharacter.toUpperCase(),
    ];

    let id = "";

    for (let i = 0; i < this.loop; i++) {
      id += idSelector[Math.floor(Math.random() * idSelector.length)];
    }

    console.log(`generated id : _${id}`);

    return `_${id}`;
  }

  generatePassword() {
    let passportSelector = [
      ...this.numbers,
      ...this.lowerCharacter.toUpperCase(),
      ...this.symbolsCharacter,
      ...this.lowerCharacter,
    ];
    let password = "";

    for (let i = 0; i < this.loop; i++) {
      password +=
        passportSelector[Math.floor(Math.random() * passportSelector.length)];
    }

    return password;
  }
}

module.exports = { Generator };
