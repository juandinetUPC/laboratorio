import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	categoryMutations,
	categoryQueries,
	categoryTypeDef
} from './supermarket/categories/typeDefs';

import {
	providerMutations,
	providerQueries,
	providerTypeDef
} from './supermarket/providers/typeDefs';

import {
	productMutations,
	productQueries,
	productTypeDef
} from './supermarket/products/typeDefs';

import categoryResolvers from './supermarket/categories/resolvers';
import productResolvers from './supermarket/products/resolvers';
import providerResolvers from './supermarket/providers/resolvers';
// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		productTypeDef,
		providerTypeDef
	],
	[
		categoryQueries,
		productQueries,
		providerQueries
	],
	[
		categoryMutations,
		productMutations,
		providerMutations
	]
	
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		productResolvers,
		providerResolvers
	)
});
