// swagger.js - OpenAPI document for the ApiNews project
const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Noticias',
    version: '1.0.0',
    description: 'Documentación OpenAPI (Swagger) de la API de Noticias.'
  },
  servers: [
    { url: 'http://localhost:3000/api', description: 'Servidor local' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    }
  },
  paths: {
    '/profiles': {
      get: { tags: ['profiles'], summary: 'Obtener todos los perfiles', responses: { '200': { description: 'OK' } } },
      post: { tags: ['profiles'], summary: 'Crear perfil', requestBody: { required: true }, responses: { '201': { description: 'Creado' } } }
    },
    '/profiles/{id}': {
      get: { tags: ['profiles'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['profiles'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Actualizado' } } },
      delete: { tags: ['profiles'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Eliminado' } } }
    },
    '/states': {
      get: { tags: ['states'], responses: { '200': { description: 'OK' } } },
      post: { tags: ['states'], requestBody: { required: true }, responses: { '201': { description: 'Creado' } } }
    },
    '/states/{id}': {
      get: { tags: ['states'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['states'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Actualizado' } } },
      delete: { tags: ['states'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Eliminado' } } }
    },
    '/categories': {
      get: { tags: ['categories'], responses: { '200': { description: 'OK' } } },
      post: { tags: ['categories'], security: [{ bearerAuth: [] }], requestBody: { required: true }, responses: { '201': { description: 'Creado' } } }
    },
    '/categories/{id}': {
      get: { tags: ['categories'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['categories'], security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Actualizado' } } },
      delete: { tags: ['categories'], security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Eliminado' } } }
    },
    '/users': {
      get: { tags: ['users'], responses: { '200': { description: 'OK' } } },
      post: { tags: ['users'], requestBody: { required: true }, responses: { '201': { description: 'Creado' } } }
    },
    '/users/{id}': {
      get: { tags: ['users'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['users'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Actualizado' } } },
      delete: { tags: ['users'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Eliminado' } } }
    },
    '/users/email/{email}': {
      get: { tags: ['users'], parameters: [{ name: 'email', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'OK' } } }
    },
    '/news': {
      get: { tags: ['news'], responses: { '200': { description: 'OK' } } },
      post: { tags: ['news'], security: [{ bearerAuth: [] }], requestBody: { required: true }, responses: { '201': { description: 'Creado' } } }
    },
    '/news/{id}': {
      get: { tags: ['news'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } },
      put: { tags: ['news'], security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Actualizado' } } },
      delete: { tags: ['news'], security: [{ bearerAuth: [] }], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Eliminado' } } }
    },
    '/news/category/{categoryId}': {
      get: { tags: ['news'], parameters: [{ name: 'categoryId', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } }
    },
    '/news/state/{stateId}': {
      get: { tags: ['news'], parameters: [{ name: 'stateId', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'OK' } } }
    },
    '/auth/login': {
      post: { tags: ['auth'], requestBody: { required: true }, responses: { '201': { description: 'Login exitoso, devuelve token' }, '401': { description: 'Credenciales inválidas' } } }
    },
    '/auth/register': {
      post: { tags: ['auth'], requestBody: { required: true }, responses: { '201': { description: 'Usuario creado' }, '400': { description: 'Error al crear' } } }
    }
  }
};

module.exports = { swaggerDocument };
