export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {}
}
export const VaccinationFormErrorMessages = [
  new ErrorMessage(
    'maxParticipants',
    'required',
    'Es muss eine maximale Anzahl der Teilnehmer:innen angegeben werden'
  ),
  new ErrorMessage(
    'maxParticipants',
    'min',
    'Die Anzahl der Teilnehmer:innen muss positiv sein'
  ),
  new ErrorMessage('date', 'required', 'Es muss ein Datum angegeben werden'),
  new ErrorMessage(
    'starttime',
    'required',
    'Es muss eine Zeit angegeben werden'
  )
];
