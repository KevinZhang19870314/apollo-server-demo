import { ApolloServer } from 'apollo-server';

import { environment } from './environment';
import { resolvers } from './resolvers';
import * as typeDefs from './type-defs.graphql';
import { DateTimeMock, EmailAddressMock, UnsignedIntMock } from 'graphql-scalars';

const server = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: environment.apollo.introspection,
    mocks: {
        DateTime: DateTimeMock,
        EmailAddress: EmailAddressMock,
        UnsignedInt: UnsignedIntMock
    },    // TODO: Remove in PROD.
    mockEntireSchema: false,    // TODO: Remove in PROD.
    playground: environment.apollo.playground
});

server.listen(environment.port)
    .then(({ url }) => console.log(`Server ready at ${url}. `));

// Hot Module Replacement
declare var module: any
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
}