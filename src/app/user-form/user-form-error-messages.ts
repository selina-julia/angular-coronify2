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
];
