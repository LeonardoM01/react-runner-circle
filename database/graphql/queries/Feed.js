import { gql } from "@apollo/client"

export const GET_FEED = gql`
  query GetFeed {
    allFeeds {
      id
      user
      time
      stats
      description
    }
  }
`;

export const GET_FEED_BY_CATEGORY = gql`
  query GetFeedByCategory($category: String) {
    allFeeds(filter: {category: $category}) {
      id
      user
      time
      stats
      description
    }
  }
`;