// import { gql } from "react-apollo";
import gql from 'graphql-tag';
import buildOpenCrudProvider, { buildQuery } from 'ra-data-opencrud';

const enhanceBuildQuery = introspection => (fetchType, resource, params) => {
    const builtQuery = buildQuery(introspection)(fetchType, resource, params);

    if (resource === 'Post' && fetchType === 'GET_LIST') {
        return {
            // Use the default query variables and parseResponse
            ...builtQuery,
            // Override the query
            query: gql`
                query posts($id: ID!) {
                    data: posts(id: $id) {
                        id
                        title
                    }
                }`,
        };
    }

    return builtQuery;
}

// export default buildOpenCrudProvider({ buildQuery: enhanceBuildQuery })
export default buildOpenCrudProvider({ buildQuery: enhanceBuildQuery })