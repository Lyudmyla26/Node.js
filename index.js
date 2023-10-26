const Contacts = require("./contacts");
const { program } = require("commander");

program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      console.log(contacts);
      break;

    case "get":
      const getContact = await Contacts.getContactById(id);
      console.log(getContact);
      break;

    case "add":
      const addContacts = await Contacts.addContact(name, email, phone);
      console.log(addContacts);
      break;

    case "remove":
      const remov = await Contacts.removeContact(id);
      console.log(remov);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
