import { gql } from "@apollo/client"

export const GET_EQUIPMENTS_IN_USE = gql`
    query {
        allEquipment(filter: {inUse: true}) {
            id
            name
            type
        }
    }
`;