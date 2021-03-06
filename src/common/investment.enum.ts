enum INVESTMENT_AUTH {
  BODY = 'Welcome to Apollo Assets Investments. please proceed with following options\n',
  CHECK_INVESTMENT_BALANCE = '\n*1. ๐งพ Check Balance*',
  INVESTMENT_TOP_UP = '\n*2. ๐น Top Up Investment* ',
  INVESTMENT_WITHDRAW = '\n*3. ๐ฐ Withdraw*',
  PREVIOUS = '\n*4. โฎ๏ธ Prev*',
  EXIT = '\n*6. ๐ด Exit*',
  STEP = 'INVESTMENT_AUTH'
}

enum INVESTMENT_BALANCE {
  BODY = '',
  INVESTMENT_TOP_UP = '\n*1. ๐น Top Up Investment* ',
  INVESTMENT_WITHDRAW = '\n*2. ๐ฐ Withdraw*',
  PREVIOUS = '\n*4. โฎ๏ธ Prev*',
  EXIT = '\n*6. ๐ด Exit*',
  STEP = 'INVESTMENT_BALANCE'
}

export { INVESTMENT_AUTH, INVESTMENT_BALANCE };
