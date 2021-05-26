import { User } from './user';
export { User } from './user';
import { Location } from './location';
export { Location } from './location';

export class Vaccination {
  constructor(
    public id: number,
    public maxParticipants: number,
    public date: Date,
    public starttime: Date,
    public endtime: Date,
    public location_id: number,
    public location: Location,
    public users?: User[]
  ) {}
}

/*
            $table->id();
            $table->integer('maxParticipants')->default('100');
            $table->date('date')->default("2021-05-05");
            $table->time('time')->default("12:12:12");
            $table->foreignId('location_id')->nullable()->constrained()->onDelete('cascade');

*/
