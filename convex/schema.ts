import { defineSchema } from "convex/server";
import {
  usersTable,
  servicesTable,
  postsTable,
  announcementsTable,
  teamMembersTable,
} from "./schemas";

export default defineSchema({
  users: usersTable,
  services: servicesTable,
  posts: postsTable,
  announcements: announcementsTable,
  teamMembers: teamMembersTable,
});
