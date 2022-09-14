import swaggerJsdoc from "swagger-jsdoc";

export default function configSwagger() {
    const option: swaggerJsdoc.Options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Pachinko back',
                version: '1.0.0',
            },
        },
        server: [{ url: "http://localhost:8080" }],
        apis: [
            './build/routes/*.js',
            './build/models/errors/*.js',
            './build/models/responses/*.js',
            './build/models/requests/*.js'
        ],
    };

    const openApiSpecs = swaggerJsdoc(option);

    return openApiSpecs;
}
