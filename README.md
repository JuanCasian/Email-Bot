# Email Bot
This bot was simply created to dismiss the pain of sending the same email to  different email addresses. This email bot can be integrated later to an electron app which will keep the balance and percentages of an investment fund.

### Getting started
#### Prerequisites
This things need to be set up before the bot can work.
- Have node js installed
- Have a file with you emails credentials (JSON format)
	- emails
	- password
	- port
	- host
	- from data Ex: '"emailname" <email@adress.com>'
- Have email bodies in html
- Have email addresses (JSON format)

#### Installing
To work with these bot you just need to download it and then tweak the bodies and mails groups in the mailbot.js file.

### Usage
```
Usage: mailbot.js Command --Subject [Mail Subject] --Ganancias [percentage]
--ComisionHF [money] --ComisionJP [money] --Group [mails group]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --Subject                                                           [required]


Missing required argument: Subject
```

### Built With
- [Node js](https://nodejs.org/en/) - Javascript framework used to code
- [Nodemailer](https://nodemailer.com/about/) - npm package used to send the emails

### Author
Juan Pedro Casian - Github: [@JuanCasian](https://github.com/JuanCasian) - Email: juanpedrocasian@gmail.com
