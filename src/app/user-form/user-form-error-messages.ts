export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const UserFormErrorMessages = [
  new ErrorMessage(
    'firstname',
    'required',
    'Es muss ein Vorname eingegeben werden'
  ),
  new ErrorMessage(
    'lastname',
    'required',
    'Es muss ein Nachname eingegeben werden'
  ),
  new ErrorMessage(
    'gender',
    'required',
    'Es muss ein Geschlecht ausgewählt werden'
  ),
  new ErrorMessage(
    'ssn',
    'required',
    'Es muss eine Sozialversicherungsnummer eingegeben werden'
  ),
  new ErrorMessage(
    'email',
    'required',
    'Es muss eine E-Mail-Adresse eingegeben werden'
  ),
  new ErrorMessage(
    'phone',
    'required',
    'Es muss eine Telefonnummer eingegeben werden'
  ),
  new ErrorMessage(
    'birthdate',
    'required',
    'Es muss ein Geburtsdatum eingegeben werden'
  )
];
