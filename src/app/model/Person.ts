export class Person {
  public id: number;
  public name: String;
  public birthYear: String;
  public gender: String;
  public hairColor: String;
  public eyeColor: String;
  public height: String;
  public skinColor: String;
  public mass: String;
  public films: String[];
  public filmss: Film[];
  public vehicles: string[];
  public bookmarked: boolean = false;
}

export class Film {
  public episodeId: number;
  public title: string;
  public opening_crawl: String;
  public director: String;
  public producer: String;
  public release_date: String;
}

export class Vehicle {
  public id: number;
  public name: String;
  public cargo_capacity: String;
  public consumables: String;
  public cost_in_credits: String;
  public crew: String;
  public length: String;
  public manufacturer: String;
  public max_atmosphering_speed: String;
  public model: String;
  public passengers: String;
  public vehicle_class: String;
}
