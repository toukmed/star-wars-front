import {Injectable} from '@angular/core';
import {createPerson, deletePerson, person} from "../graphql/graphql.operations";
import {Apollo} from "apollo-angular";
import {Person} from "../model/Person";

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  BASE_URL = 'http://localhost:8080/graphql';

  constructor(private apollo: Apollo) {
  }

  createPerson(person: Person) {
    return this.apollo.mutate({
      mutation: createPerson,
      variables: {
        person: {
          name: person.name,
          birthYear: person.birthYear,
          films: person.films.join(','),
          vehicles: person.vehicles.join(',')
        }
      }
    })
  }

  deletePerson(id: number) {
    return this.apollo.mutate({
      mutation: deletePerson,
      variables: {id: id}
    })
  }

  searchPerson(name: string) {
    return this.apollo.query({
      query: person,
      fetchPolicy: 'network-only',
      variables: {name: name !== undefined ? name : ''}
    })
  }
}
