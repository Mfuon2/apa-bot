enum HOME {
  BODY = '*Mambo vipi 🖐️*  \nMy name is Furaha - the happiness bot\nChoose an option from the menu below \n',
  MONEY_MARKET = '\n*1. 💰 Money market* ',
  MOTOR = '\n20. 🚘 Motor Insurance ',
  LIFE = '\n30. 👪 Life assurance ',
  UPENDO = '\n40. ❤️ Upendo ',
  HEALTH = '\n50. 🏥️ Health ',
  WEBSITE = '\n60. ℹ️ Info from Website',
  EXIT = '\n*7. 🔴 Exit*',
  STEP = 'HOME'
}

enum MOTOR {
  BODY = 'Welcome to Motor Insurance pane. please proceed with following options\n',
  QUOTE = '\n*1. 📋 Get Quote*',
  // RENEW = '\n*2. 🧻 Renew Policy* ',
  // DETAILS = '\n*3. 📚️ Policy Details*',
  EXIT = '\n*4. 🔴 Exit*',
  STEP = 'MOTOR'
}

enum LIFE {
  BODY = 'Welcome to Life Assurance pane. please proceed with following options\n',
  QUOTE = '\n*1. 📋 Get Quote*',
  BENEFICIARIES = '\n*2. 👪 Manage Beneficiaries* ',
  PREVIOUS = '\n*4. ⏮️ Prev*',
  EXIT_LIFE = '\n*6. 🔴 Exit*',
  STEP = 'LIFE'
}

enum CUSTOMER_SERVICE {
  BODY = 'Welcome to Customer service. please proceed with following options\n',
  CONTACT_DETAILS = '\n*1. 🎧 Customer service*',
  PREVIOUS = '\n*4. ⏮️ Prev*',
  EXIT = '\n*6. 🔴 Exit*',
  STEP = 'CUSTOMER SERVICE'
}

enum INVESTMENTS {
  BODY = 'Welcome to Apollo Assets Investments. please proceed with following options\n',
  CHECK_INVESTMENT_BALANCE = '\n*1. 🧾 Check Balance*',
  USSD = '\n*1. 💰 Proceed to USSD*',
  // INVESTMENT_TOP_UP = '\n*2. 💹 Top Up Investment* ',
  // INVESTMENT_WITHDRAW = '\n*3. 💰 Withdraw*',
  // PREVIOUS = '\n*4. ⏮️ Prev*',
  EXIT = '\n*6. 🔴 Exit*',
  STEP = 'INVESTMENT'
}
enum WRONG_SELECTION {
  BODY = 'You have made a wrong selection. Please try with given options on the menu or Type in Hi, Hello or Hey to initiate a conversation with Furaha'
}

enum EXIT_MAIN {
  BODY = 'Thank you for using Furaha bot 🙂. I am glad to have interacted with you. \nBye! 🖐️'
}

enum MAINTENANCE {
  BODY = 'Oops!! something cool is coming very soon on this option 🥳'
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
