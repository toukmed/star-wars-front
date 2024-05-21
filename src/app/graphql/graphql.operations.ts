import { gql } from 'apollo-angular';
import {constants} from "../utils/constants";

export const createPerson = gql`
    mutation createPerson($person: PersonInput) {
        createPerson(person: $person) {
            name
            birthYear
            films
            vehicles
        }
    }`

export const person = gql`
  query person($name: String) {
    person(name: $name) {
      id
      name
      birthYear
      films
      vehicles
    }
  }`

export const deletePerson = gql`
  mutation deletePerson($id: ID!) {
    deletePerson(id: $id)
  }`

