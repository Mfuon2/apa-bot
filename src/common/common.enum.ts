enum HOME {
  BODY = '*Mambo vipi ๐๏ธ*  \nMy name is Furaha - the happiness bot\nChoose an option from the menu below \n',
  MONEY_MARKET = '\n*1. ๐ฐ Money market* ',
  MOTOR = '\n20. ๐ Motor Insurance ',
  LIFE = '\n30. ๐ช Life assurance ',
  UPENDO = '\n40. โค๏ธ Upendo ',
  HEALTH = '\n50. ๐ฅ๏ธ Health ',
  WEBSITE = '\n60. โน๏ธ Info from Website',
  EXIT = '\n*7. ๐ด Exit*',
  STEP = 'HOME'
}

enum MOTOR {
  BODY = 'Welcome to Motor Insurance pane. please proceed with following options\n',
  QUOTE = '\n*1. ๐ Get Quote*',
  // RENEW = '\n*2. ๐งป Renew Policy* ',
  // DETAILS = '\n*3. ๐๏ธ Policy Details*',
  EXIT = '\n*4. ๐ด Exit*',
  STEP = 'MOTOR'
}

enum LIFE {
  BODY = 'Welcome to Life Assurance pane. please proceed with following options\n',
  QUOTE = '\n*1. ๐ Get Quote*',
  BENEFICIARIES = '\n*2. ๐ช Manage Beneficiaries* ',
  PREVIOUS = '\n*4. โฎ๏ธ Prev*',
  EXIT_LIFE = '\n*6. ๐ด Exit*',
  STEP = 'LIFE'
}

enum CUSTOMER_SERVICE {
  BODY = 'Welcome to Customer service. please proceed with following options\n',
  CONTACT_DETAILS = '\n*1. ๐ง Customer service*',
  PREVIOUS = '\n*4. โฎ๏ธ Prev*',
  EXIT = '\n*6. ๐ด Exit*',
  STEP = 'CUSTOMER SERVICE'
}

enum INVESTMENTS {
  BODY = 'Welcome to Apollo Assets Investments. please proceed with following options\n',
  CHECK_INVESTMENT_BALANCE = '\n*1. ๐งพ Check Balance*',
  USSD = '\n*1. ๐ฐ Proceed to USSD*',
  // INVESTMENT_TOP_UP = '\n*2. ๐น Top Up Investment* ',
  // INVESTMENT_WITHDRAW = '\n*3. ๐ฐ Withdraw*',
  // PREVIOUS = '\n*4. โฎ๏ธ Prev*',
  EXIT = '\n*6. ๐ด Exit*',
  STEP = 'INVESTMENT'
}
enum WRONG_SELECTION {
  BODY = 'You have made a wrong selection. Please try with given options on the menu or Type in Hi, Hello or Hey to initiate a conversation with Furaha'
}

enum EXIT_MAIN {
  BODY = 'Thank you for using Furaha bot ๐. I am glad to have interacted with you. \nBye! ๐๏ธ'
}

enum MAINTENANCE {
  BODY = 'Oops!! something cool is coming very soon on this option ๐ฅณ'
}

export {
  MAINTENANCE,
  HOME,
  MOTOR,
  INVESTMENTS,
  LIFE,
  CUSTOMER_SERVICE,
  WRONG_SELECTION,
  EXIT_MAIN
};
