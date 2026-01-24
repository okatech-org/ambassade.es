import { defineSchema } from "convex/server";
import {
  usersTable,
  servicesTable,
  postsTable,
  announcementsTable,
} from "./schemas";

export default defineSchema({
  users: usersTable,
  services: servicesTable,
  posts: postsTable,
  announcements: announcementsTable,
});
