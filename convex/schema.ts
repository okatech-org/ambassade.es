import { defineSchema } from "convex/server";
import {
  usersTable,
  servicesTable,
  postsTable,
  announcementsTable,
  teamMembersTable,
  pageViewsTable,
  editableContentTable,
  auditLogTable,
  siteSettingsTable,
  sectionVisibilityTable,
} from "./schemas";

export default defineSchema({
  users: usersTable,
  services: servicesTable,
  posts: postsTable,
  announcements: announcementsTable,
  teamMembers: teamMembersTable,
  pageViews: pageViewsTable,
  editableContent: editableContentTable,
  auditLog: auditLogTable,
  siteSettings: siteSettingsTable,
  sectionVisibility: sectionVisibilityTable,
});
