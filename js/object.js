class Thought {
  constructor() {
    this.thoughts = 0;
    this.thoughtAutomator = 0; // Number  of thinkers, increments thoughts automatically
    this.thoughtMultiplier = 1;
    this.thoughtGainedPerSecond = 0;
    this.thoughtAutomatorPrice = 20;
  }
}

class Word {
  constructor() {
    this.words = 0;
    this.wordLogMultiplier = 10;
    this.wordAutomator = 0;
    this.wordMultiplier = 1;
    this.wordGainedPerSecond = 0;
  }
}

class Sentence {
  constructor() {
    this.sentences = 0;
    this.sentenceAutomator = 0;
    this.sentenceMultiplier = 1;
    this.sentenceGainedPerSecond = 0;
  }
}

class Paragraph {
  constructor() {
    this.paragraphs = 0;
    this.paragraphAutomator = 0;
    this.paragraphMultiplier = 1;
    this.paragraphGainedPerSecond = 0;
  }
}

class Page {
  constructor() {
    this.pages = 0;
    this.pageAutomator = 0;
    this.pageMultiplier = 1;
    this.pageGainedPerSecond = 0;
  }
}

class Chapter {
  constructor() {
    this.chapters = 0;
    this.chapterAutomator = 0;
    this.chapterMultiplier = 1;
    this.chapterGainedPerSecond = 0;
  }
}

class Novel {
  constructor() {
    this.novels = 0;
    this.novelAutomator = 0;
    this.novelMultiplier = 1;
    this.novelGainedPerSecond = 0;
  }
}

class Inventory {
  constructor() {
    this.money = 0;
  }
}

// Player class that contains all the player's attributes
// This is the class that will be used in the game and for saving/loading
class Player {
  constructor() {
    this.thought = new Thought();
    this.word = new Word();
    this.sentence = new Sentence();
    this.paragraph = new Paragraph();
    this.page = new Page();
    this.chapter = new Chapter();
    this.novel = new Novel();
    this.inventory = new Inventory();
  }
}