/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { NetworthController } from './controllers/NetworthController.js';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Calculation": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"soulbound":{"dataType":"boolean"},"star":{"dataType":"double"},"shards":{"dataType":"double"},"count":{"dataType":"double","required":true},"price":{"dataType":"double","required":true},"type":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Item": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"petData":{"dataType":"object"},"item":{"dataType":"object"},"cosmetic":{"dataType":"boolean","required":true},"soulbound":{"dataType":"boolean","required":true},"count":{"dataType":"double","required":true},"calculation":{"dataType":"array","array":{"dataType":"refAlias","ref":"Calculation"},"required":true},"soulboundPortion":{"dataType":"double"},"price":{"dataType":"double","required":true},"basePrice":{"dataType":"double","required":true},"id":{"dataType":"string","required":true},"loreName":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Inventory": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"items":{"dataType":"array","array":{"dataType":"refAlias","ref":"Item"}},"unsoulboundTotal":{"dataType":"double","required":true},"total":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_Inventories.Inventory_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"armor":{"ref":"Inventory","required":true},"equipment":{"ref":"Inventory","required":true},"wardrobe":{"ref":"Inventory","required":true},"inventory":{"ref":"Inventory","required":true},"enderchest":{"ref":"Inventory","required":true},"accessories":{"ref":"Inventory","required":true},"personal_vault":{"ref":"Inventory","required":true},"fishing_bag":{"ref":"Inventory","required":true},"potion_bag":{"ref":"Inventory","required":true},"sacks_bag":{"ref":"Inventory","required":true},"candy_inventory":{"ref":"Inventory","required":true},"carnival_mask_inventory":{"ref":"Inventory","required":true},"storage":{"ref":"Inventory","required":true},"museum":{"ref":"Inventory","required":true},"sacks":{"ref":"Inventory","required":true},"essence":{"ref":"Inventory","required":true},"pets":{"ref":"Inventory","required":true},"quiver":{"ref":"Inventory","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NetworthResult": {
        "dataType": "refObject",
        "properties": {
            "networth": {"dataType":"double","required":true},
            "unsoulboundNetworth": {"dataType":"double","required":true},
            "noInventory": {"dataType":"boolean","required":true},
            "isNonCosmetic": {"dataType":"boolean","required":true},
            "purse": {"dataType":"double","required":true},
            "bank": {"dataType":"double","required":true},
            "personalBank": {"dataType":"double","required":true},
            "types": {"ref":"Record_Inventories.Inventory_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProfileNetworthResponse": {
        "dataType": "refObject",
        "properties": {
            "networth": {"ref":"NetworthResult","required":true},
            "nonCosmeticNetworth": {"ref":"NetworthResult","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.unknown_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidationErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "details": {"ref":"Record_string.unknown_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NetworthOptions": {
        "dataType": "refObject",
        "properties": {
            "prices": {"dataType":"object"},
            "cachePrices": {"dataType":"boolean"},
            "pricesRetries": {"dataType":"double"},
            "onlyNetworth": {"dataType":"boolean"},
            "includeItemData": {"dataType":"boolean"},
            "sortItems": {"dataType":"boolean"},
            "stackItems": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProfileRequestBody": {
        "dataType": "refObject",
        "properties": {
            "profile": {"dataType":"object","required":true},
            "museum": {"dataType":"object"},
            "bankBalance": {"dataType":"double"},
            "options": {"ref":"NetworthOptions"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ItemNetworthResponse": {
        "dataType": "refObject",
        "properties": {
            "networth": {"ref":"Item","required":true},
            "nonCosmeticNetworth": {"ref":"Item","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ItemRequestBody": {
        "dataType": "refObject",
        "properties": {
            "item": {"dataType":"object","required":true},
            "options": {"ref":"NetworthOptions"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsNetworthController_calculateProfile: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"ProfileRequestBody"},
        };
        app.post('/v1/profile',
            ...(fetchMiddlewares<RequestHandler>(NetworthController)),
            ...(fetchMiddlewares<RequestHandler>(NetworthController.prototype.calculateProfile)),

            async function NetworthController_calculateProfile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNetworthController_calculateProfile, request, response });

                const controller = new NetworthController();

              await templateService.apiHandler({
                methodName: 'calculateProfile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsNetworthController_calculateItem: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"ref":"ItemRequestBody"},
        };
        app.post('/v1/item',
            ...(fetchMiddlewares<RequestHandler>(NetworthController)),
            ...(fetchMiddlewares<RequestHandler>(NetworthController.prototype.calculateItem)),

            async function NetworthController_calculateItem(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsNetworthController_calculateItem, request, response });

                const controller = new NetworthController();

              await templateService.apiHandler({
                methodName: 'calculateItem',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
