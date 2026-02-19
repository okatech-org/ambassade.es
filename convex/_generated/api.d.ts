/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as crons from "../crons.js";
import type * as crons_expiration from "../crons/expiration.js";
import type * as functions_admin from "../functions/admin.js";
import type * as functions_analytics from "../functions/analytics.js";
import type * as functions_announcements from "../functions/announcements.js";
import type * as functions_chatbot from "../functions/chatbot.js";
import type * as functions_files from "../functions/files.js";
import type * as functions_inlineContent from "../functions/inlineContent.js";
import type * as functions_migrateRoles from "../functions/migrateRoles.js";
import type * as functions_permissions from "../functions/permissions.js";
import type * as functions_posts from "../functions/posts.js";
import type * as functions_seed from "../functions/seed.js";
import type * as functions_services from "../functions/services.js";
import type * as functions_teamMembers from "../functions/teamMembers.js";
import type * as functions_users from "../functions/users.js";
import type * as http from "../http.js";
import type * as lib_adminPermissions from "../lib/adminPermissions.js";
import type * as lib_audit from "../lib/audit.js";
import type * as lib_auth from "../lib/auth.js";
import type * as lib_constants from "../lib/constants.js";
import type * as lib_customFunctions from "../lib/customFunctions.js";
import type * as lib_errors from "../lib/errors.js";
import type * as lib_users from "../lib/users.js";
import type * as lib_utils from "../lib/utils.js";
import type * as lib_validators from "../lib/validators.js";
import type * as schemas_announcements from "../schemas/announcements.js";
import type * as schemas_auditLog from "../schemas/auditLog.js";
import type * as schemas_editableContent from "../schemas/editableContent.js";
import type * as schemas_index from "../schemas/index.js";
import type * as schemas_pageViews from "../schemas/pageViews.js";
import type * as schemas_posts from "../schemas/posts.js";
import type * as schemas_services from "../schemas/services.js";
import type * as schemas_teamMembers from "../schemas/teamMembers.js";
import type * as schemas_users from "../schemas/users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  crons: typeof crons;
  "crons/expiration": typeof crons_expiration;
  "functions/admin": typeof functions_admin;
  "functions/analytics": typeof functions_analytics;
  "functions/announcements": typeof functions_announcements;
  "functions/chatbot": typeof functions_chatbot;
  "functions/files": typeof functions_files;
  "functions/inlineContent": typeof functions_inlineContent;
  "functions/migrateRoles": typeof functions_migrateRoles;
  "functions/permissions": typeof functions_permissions;
  "functions/posts": typeof functions_posts;
  "functions/seed": typeof functions_seed;
  "functions/services": typeof functions_services;
  "functions/teamMembers": typeof functions_teamMembers;
  "functions/users": typeof functions_users;
  http: typeof http;
  "lib/adminPermissions": typeof lib_adminPermissions;
  "lib/audit": typeof lib_audit;
  "lib/auth": typeof lib_auth;
  "lib/constants": typeof lib_constants;
  "lib/customFunctions": typeof lib_customFunctions;
  "lib/errors": typeof lib_errors;
  "lib/users": typeof lib_users;
  "lib/utils": typeof lib_utils;
  "lib/validators": typeof lib_validators;
  "schemas/announcements": typeof schemas_announcements;
  "schemas/auditLog": typeof schemas_auditLog;
  "schemas/editableContent": typeof schemas_editableContent;
  "schemas/index": typeof schemas_index;
  "schemas/pageViews": typeof schemas_pageViews;
  "schemas/posts": typeof schemas_posts;
  "schemas/services": typeof schemas_services;
  "schemas/teamMembers": typeof schemas_teamMembers;
  "schemas/users": typeof schemas_users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
