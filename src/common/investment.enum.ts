enum INVESTMENT_AUTH {
  BODY = 'Welcome to Apollo Assets Investments. please proceed with following options\n',
  CHECK_INVESTMENT_BALANCE = '\n*1. 🧾 Check Balance*',
  INVESTMENT_TOP_UP = '\n*2. 💹 Top Up Investment* ',
  INVESTMENT_WITHDRAW = '\n*3. 💰 Withdraw*',
  PREVIOUS = '\n*4. ⏮️ Prev*',
  EXIT = '\n*6. 🔴 Exit*',
  STEP = 'INVESTMENT_AUTH'
}

enum INVESTMENT_BALANCE {
  BODY = '',
  INVESTMENT_TOP_UP = '\n*1. 💹 Top Up Investment* ',
  INVESTMENT_WITHDRAW = '\n*2. 💰 Withdraw*',
  PREVIOUS = '\n*4. ⏮️ Prev*',
  EXIT = '\n*6. 🔴 Exit*',
  STEP = 'INVESTMENT_BALANCE'
}

export { INVESTMENT_AUTH, INVESTMENT_BALANCE };
