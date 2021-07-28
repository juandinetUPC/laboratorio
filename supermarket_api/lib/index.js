'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const categoryTypeDef = `
  type Category {
      id: Int!
      name: String!
      description: String!
  }
  input CategoryInput {
      name: String!
      description: String!
  }`;

const categoryQueries = `
      allCategories: [Category]!
      categoryById(id: Int!): Category!
  `;

const categoryMutations = `
    createCategory(category: CategoryInput!): Category!
    updateCategory(id: Int!, category: CategoryInput!): Category!
    deleteCategory(id: Int!): Int
`;

const providerTypeDef = `
  type Provider {
      id: Int!
      nit: Int!
      name: String!
      description: String!
  }
  input ProviderInput {
      nit: Int!
      name: String!
      description: String!
  }`;

const providerQueries = `
      allProviders: [Provider]!
      providerById(id: Int!): Provider!
  `;

const providerMutations = `
    createProvider(provider: ProviderInput!): Provider!
    updateProvider(id: Int!, provider: ProviderInput!): Provider!
    deleteProvider(id: Int!): Int
`;

const productTypeDef = `
  type Product {
      id: Int!
      name: String!
      description: String!
      unit_measurement:String!
      quantity: Int!
      category: Category!
      provider: Provider!
      
  }
  input ProductInput {
      name: String!
      description: String!
      unit_measurement:String!
      quantity: Int!
      category: Int!
      provider: Int!
  }`;

const productQueries = `
      allProducts: [Product]!
      productById(id: Int!): Product!
  `;

const productMutations = `
    createProduct(product: ProductInput!): Product!
    updateProduct(id: Int!, product: ProductInput!): Product!
    deleteProduct(id: Int!): Int
`;

const userTypeDef = `
  type User {
      id: Int!
      user_name: String!
      user_password: String!
      user_email: String!
      user_real_name: String!
  }
  input UserInput {
    user_name: String!
    user_password: String!
    user_email: String!
    user_real_name: String!
  }`;

const userQueries = `
      allUsers: [User]!
      userById(id: Int!): User!
  `;

const userMutations = `
    createUser(user: UserInput!): User!
    updateUser(id: Int!, user: UserInput!): User!
    deleteUser(id: Int!): Int
`;

//export const url = 'host.docker.internal'
const url = 'supermarket.ms';
const port = '4000';
const entryPoint = 'categories';

const URL = `http://${url}:${port}/${entryPoint}`;

const resolvers = {
	Query: {
		allCategories: (_) =>
			getRequest(URL, ''),
		    categoryById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createCategory: (_, { category }) =>
			generalRequest(`${URL}/`, 'POST', category),
		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

//export const url = 'host.docker.internal'
const url$1 = 'supermarket.ms';
const port$1 = '4000';
const entryPoint$1 = 'products';

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const resolvers$1 = {
	Query: {
		allProducts: (_) =>
			getRequest(URL$1, ''),
		    productById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),
	},
	Mutation: {
		createProduct: (_, { product }) =>
			generalRequest(`${URL$1}/`, 'POST', product),
		updateProduct: (_, { id, product }) =>
			generalRequest(`${URL$1}/${id}`, 'PUT', product),
		deleteProduct: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'DELETE')
	}
};

//export const url = 'host.docker.internal'
const url$2 = 'supermarket.ms';
const port$2 = '4000';
const entryPoint$2 = 'providers';

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const resolvers$2 = {
	Query: {
		allProviders: (_) =>
			getRequest(URL$2, ''),
		    providerById: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'GET'),
	},
	Mutation: {
		createProvider: (_, { provider }) =>
			generalRequest(`${URL$2}/`, 'POST', provider),
		updateProvider: (_, { id, provider }) =>
			generalRequest(`${URL$2}/${id}`, 'PUT', provider),
		deleteProvider: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'DELETE')
	}
};

//export const url = 'host.docker.internal'
const url$3 = 'users.ms';
const port$3 = '4001';
const entryPoint$3 = 'users';

const URL$3 = `http://${url$3}:${port$3}/${entryPoint$3}`;

const resolvers$3 = {
	Query: {
		allUsers: (_) =>
			getRequest(URL$3, ''),
		    userById: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'GET'),
		    userByAuth: (_, { user_name, user_password }) =>
			generalRequest(`${URL$3}/${user_password}`, 'GET'),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL$3}/`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL$3}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'DELETE')
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		categoryTypeDef,
		productTypeDef,
		providerTypeDef,
		userTypeDef
	],
	[
		categoryQueries,
		productQueries,
		providerQueries,
		userQueries
	],
	[
		categoryMutations,
		productMutations,
		providerMutations,
		userMutations
	]
	
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2,
		resolvers$3
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
