import { gql } from "@apollo/client"

export const GET_FEED = gql`
  query GetFeed {
    allFeeds {
      id
      user
      time
      stats
      description
      workout
    }
  }
`