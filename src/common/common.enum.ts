enum HOME {
  BODY = '*Mambo vipi 🖐️*  \nMy name is Furaha - the happiness bot 🤖\nChoose an option from the menu below \n',
  MOTOR_INSURANCE = '\n*1. 🚘 Motor Insurance*',
  MONEY_MARKET = '\n*2. 💹 Money Market* ',
  LIFE_ASSURANCE = '\n*3. 👨‍ Life Assurance*',
  TERMS_CONDITION = '\n*4. 🗒️ Terms & Condition*',
  WEBSITE = '\n*5. ℹ️ Info from Website*',
  EXIT = '\n*6. 🔴 Exit*',
  STEP = 'HOME'
}

enum MOTOR {
  BODY = 'Welcome to Motor Insurance pane. please proceed with following options\n',
  QUOTE = '\n*1. 📋 Get Quote*',
  RENEW = '\n*2. 🧻 Renew Policy* ',
  DETAILS = '\n*3. 📚️ Policy Details*',
  PREVIOUS = '\n*4. ⏮️ Prev*',
  EXIT = '\n*6. 🔴 Exit*',
  STEP = 'MOTOR'
}

enum LIFE {
  BODY = 'Welcome to Life Assurance pane. please proceed with following options\n',
  QUOTE = '\n*1. 📋 Get Quote*',
  BENEFICIARIES = '\n*2. 👪 Manage Beneficiaries* ',
  PREVIOUS = '\n*4. ⏮️ Prev*',
  EXIT = '\n*6. 🔴 Exit*',
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
  INVESTMENT_TOP_UP = '\n*2. 💹 Top Up Investment* ',
  INVESTMENT_WITHDRAW = '\n*3. 💰 Withdraw*',
  PREVIOUS = '\n*4. ⏮️ Prev*',
  EXIT = '\n*6. 🔴 Exit*',
  STEP = 'INVESTMENT'
}
enum WRONG_SELECTION {
  BODY = 'You have made a wrong selection. Please try with given options on the menu'
}

enum EXIT {
  BODY = 'Thank you for using Furaha bot. I am glad to have interacted with you. \nBye!'
}

export {
  HOME,
  MOTOR,
  INVESTMENTS,
  LIFE,
  CUSTOMER_SERVICE,
  WRONG_SELECTION,
  EXIT
};
