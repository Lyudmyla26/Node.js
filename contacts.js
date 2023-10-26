const { nanoid } = require("nanoid");
const fs = require("node:fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });
  return JSON.parse(data);
}
async function writeContacts(contacts) {
  return await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, undefined, 2)
  );
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const data = await readContacts();
  const contact = data.find((item) => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const data = await readContacts();
  const index = data.findIndex((item) => item.id === contactId);
  //   const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const removedContacts = [...data.slice(0, index), ...data.slice(index + 1)];
  await writeContacts(removedContacts);
  return data[index] || null;
}
// async function removeContact(contactId) {
//   const data = await readContacts();
//   const index = data.findIndex((item) => item.id === contactId);

//   if (index === -1) {
//     return null;
//   }

//   const removedContact = data.splice(index, 1)[0];
//   await writeContacts(data);

//   return removedContact;
// }

async function addContact(name, email, phone) {
  const data = await readContacts();
  const newContact = { id: nanoid(), name, email, phone };
  data.push(newContact);
  await writeContacts(data);
  return newContact;
}
module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
