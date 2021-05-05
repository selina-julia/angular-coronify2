export class User {
  constructor(
    public id: number,
    public ssn: number,
    public firstname: string,
    public lastname: string,
    public gender: string,
    public birthdate: Date,
    public phone: string,
    public email: string,
    public password: string,
    public hasVaccination: boolean,
    public isAdmin: boolean,
    public vaccination_id?: number
  ) {}
}

/*
$table->id();
            $table->unsignedBigInteger('ssn')->unique();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('gender');
            $table->date('birthdate');
            $table->string('phone');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->boolean('hasVaccination');
            $table->boolean('isAdmin');
            $table->foreignId('vaccination_id')->constrained()->onDelete('cascade');
*/
