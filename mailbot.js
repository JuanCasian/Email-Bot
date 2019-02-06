"use strict";
// nodemailer to send mails
const nodemailer = require("nodemailer");
// fs to read text from file
const fs = require("fs");
// yargs to get the options
const argv = require("yargs").usage(`Usage: $0 Command --Subject [Mail Subject] --Ganancias [percentage] --ComisionHF [money] --ComisionJP [money] --Group [mails group]`).demandOption(['Subject']).argv;

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(mail, body, subject, token){
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: token.host,
		port: token.port,
		secure: true, // true for 465, false for other ports
		auth: {
			user: token.email,
			pass: token.password
		},
		tls:{
			rejectUnauthorized:false
		}
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: token.from, // sender address
		to: `${mail}`, // list of receivers
		subject: subject, // Subject line
		text: "", // plain text body
		html: body // html body
	};

	// send mail with defined transport object
	let info = await transporter.sendMail(mailOptions)

	console.log("Message sent: %s", info.messageId);
}

var get_people = (group) => {
	if (group == "Pruebas"){
		try {
			var peopleString = fs.readFileSync('./MailsGroups/Pruebas.json');
			return JSON.parse(peopleString)
		} catch (e) {
			console.log("ERROR GETTING MAILS");
			process.exit(1)
		}
	} else if (group == 'Clientes'){
		try {
			var peopleString = fs.readFileSync('./MailsGroups/Clientes.json');
			return JSON.parse(peopleString)
		} catch (e) {
			console.log("ERROR GETTING MAILS");
			process.exit(1)
		}
	} else {
		console.log("People group not found");
		process.exit();
	}

}

var	get_body = (command) => {
	if (command === "Resumen") {
		try {
			var body = fs.readFileSync('./MailsBodies/MailResumen.html', 'utf8');
			return body;
		} catch (e) {
			console.log("ERROR GETTING THE MAIL BODY");
			process.exit(2);
		}
	} else if (command === "Recordatorio") {
		try {
			var body = fs.readFileSync('./MailsBodies/MailRecordatorio.html', 'utf8');
			return body;
		} catch (e) {
			console.log("ERROR GETTING THE MAIL BODY");
			process.exit(2);
		}
	} else if (command === "Alta"){
		try {
			var body = fs.readFileSync('./MailsBodies/MailAlta.html', 'utf8');
			return body;
		} catch (e) {
			console.log("ERROR GETTING THE MAIL BODY");
			process.exit(2);
		}
	} else {
		console.log("Command of mail was not understood");
		process.exit(3);
	}
}

var parse_body = (body, command, argv, name)=> {
	if (command === "Resumen") {
		if (!argv.Ganancias || !argv.ComisionHF || !argv.ComisionJP) {
			console.log("All data for Resumen Email was not included");
			process.exit(4);
		}
		body = body.replace('{}',`${name}`);
		body = body.replace('{}', `${argv.Ganancias}`);
		body = body.replace('{}', `${argv.ComisionJP}`);
		body = body.replace('{}', `${argv.ComisionHF}`);
	} else if (command === "Alta") {
		body = body.replace('{}',`${name}`);
	} else if (command === "Recordatorio") {
		body = body.replace('{}',`${name}`);
	}
	return body;
}

function main(){
	try {
		var token = fs.readFileSync('./token.json');
		token = JSON.parse(token)
	} catch (e) {
		console.log("Failure in getting password");
		process.exit(2);
	}
	let people = get_people(argv.Group);
 	let body = get_body(argv._[0]);
 	let subject = argv.Subject;
	for (let i = 0; i < people.length ; i++) {
		var emailbody = parse_body(body, argv._[0], argv, people[i].name);
 		sendMail(people[i].email, emailbody, subject, token).catch(console.error);
	}
}
main();
