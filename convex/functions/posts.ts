import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireModule } from "../lib/auth";
const paginationOptsValidator = v.object({
  numItems: v.number(),
  cursor: v.union(v.string(), v.null()),
});

// Public: Get published post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!post || post.status !== "published") {
      return null;
    }
    
    // Resolve storage URLs
    let coverImage = post.coverImage;
    if (post.coverImageStorageId) {
      coverImage = (await ctx.storage.getUrl(post.coverImageStorageId)) ?? undefined;
    }
    
    let documentUrl = post.documentUrl;
    if (post.documentStorageId) {
      documentUrl = (await ctx.storage.getUrl(post.documentStorageId)) ?? undefined;
    }

    return {
      ...post,
      coverImage,
      documentUrl,
    };
  },
});

// Admin: Get any post by slug
export const adminGetBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    await requireModule(ctx, "posts");
    const post = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
      
    if (!post) return null;

    // Resolve storage URLs
    let coverImage = post.coverImage;
    if (post.coverImageStorageId) {
      coverImage = (await ctx.storage.getUrl(post.coverImageStorageId)) ?? undefined;
    }
    
    let documentUrl = post.documentUrl;
    if (post.documentStorageId) {
      documentUrl = (await ctx.storage.getUrl(post.documentStorageId)) ?? undefined;
    }

    return {
      ...post,
      coverImage,
      documentUrl,
    };
  },
});

// Public: List published posts
export const list = query({
  args: {
    category: v.optional(
      v.union(v.literal("actualite"), v.literal("evenement"), v.literal("communique"))
    ),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("posts").withIndex("by_status_date", (q) => 
      q.eq("status", "published")
    );

    if (args.category) {
      q = q.filter((q) => q.eq(q.field("category"), args.category));
    }

    const posts = await q.order("desc").paginate(args.paginationOpts);
    
    // Map over page to resolve URLs
    const pageWithUrls = await Promise.all(posts.page.map(async (post) => {
      let coverImage = post.coverImage;
      if (post.coverImageStorageId) {
        coverImage = (await ctx.storage.getUrl(post.coverImageStorageId)) ?? undefined;
      }
      return { ...post, coverImage };
    }));

    return { ...posts, page: pageWithUrls };
  },
});

// Admin: List all posts (including drafts)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    await requireModule(ctx, "posts");
    const posts = await ctx.db.query("posts").order("desc").collect();
    
    // Resolve URLs
    return await Promise.all(posts.map(async (post) => {
      let coverImage = post.coverImage;
      if (post.coverImageStorageId) {
        coverImage = (await ctx.storage.getUrl(post.coverImageStorageId)) ?? undefined;
      }
      let documentUrl = post.documentUrl;
      if (post.documentStorageId) {
        documentUrl = (await ctx.storage.getUrl(post.documentStorageId)) ?? undefined;
      }
      return { ...post, coverImage, documentUrl };
    }));
  },
});

// Admin: Create Post
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    coverImageStorageId: v.optional(v.id("_storage")),
    category: v.union(v.literal("actualite"), v.literal("evenement"), v.literal("communique")),
    status: v.union(v.literal("draft"), v.literal("published")),
    publishedAt: v.optional(v.number()),
    // Event fields
    eventDate: v.optional(v.number()),
    eventEndDate: v.optional(v.number()),
    eventTime: v.optional(v.string()),
    eventLocation: v.optional(v.string()),
    eventAddress: v.optional(v.string()),
    eventMapLink: v.optional(v.string()),
    ticketLink: v.optional(v.string()),
    ticketPrice: v.optional(v.string()),
    // Communiqué fields
    documentUrl: v.optional(v.string()),
    documentStorageId: v.optional(v.id("_storage")),
    documentName: v.optional(v.string()),
    referenceNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "posts");
    
    // Check slug uniqueness
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    
    if (existing) {
      throw new Error("Slug already exists");
    }

    const { publishedAt, ...rest } = args;
    return await ctx.db.insert("posts", {
      ...rest,
      publishedAt: publishedAt ?? Date.now(),
    });
  },
});

// Admin: Update Post
export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: v.optional(v.string()),
    coverImageStorageId: v.optional(v.id("_storage")),
    category: v.union(v.literal("actualite"), v.literal("evenement"), v.literal("communique")),
    status: v.union(v.literal("draft"), v.literal("published")),
    publishedAt: v.optional(v.number()),
    // Event fields
    eventDate: v.optional(v.number()),
    eventEndDate: v.optional(v.number()),
    eventTime: v.optional(v.string()),
    eventLocation: v.optional(v.string()),
    eventAddress: v.optional(v.string()),
    eventMapLink: v.optional(v.string()),
    ticketLink: v.optional(v.string()),
    ticketPrice: v.optional(v.string()),
    // Communiqué fields
    documentUrl: v.optional(v.string()),
    documentStorageId: v.optional(v.id("_storage")),
    documentName: v.optional(v.string()),
    referenceNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "posts");
    const { id, ...fields } = args;
    
    // Check slug uniqueness if changed
    const post = await ctx.db.get(id);
    if (!post) throw new Error("Post not found");

    if (fields.slug !== post.slug) {
       const existing = await ctx.db
        .query("posts")
        .withIndex("by_slug", (q) => q.eq("slug", fields.slug))
        .unique();
      if (existing) throw new Error("Slug taken");
    }

    await ctx.db.patch(id, fields);
  },
});

// Admin: Delete Post
export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await requireModule(ctx, "posts");
    await ctx.db.delete(args.id);
  },
});

// Admin: Update only the cover image of a post (for inline editing)
export const updateCoverImage = mutation({
  args: {
    id: v.id("posts"),
    coverImageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "posts");
    const post = await ctx.db.get(args.id);
    if (!post) throw new Error("Post not found");
    await ctx.db.patch(args.id, {
      coverImageStorageId: args.coverImageStorageId,
      coverImagePosition: undefined, // Reset position when image changes
    });
  },
});

// Admin: Update the cover image position (object-position CSS)
export const updateCoverImagePosition = mutation({
  args: {
    id: v.id("posts"),
    position: v.string(), // e.g. "50% 30%"
  },
  handler: async (ctx, args) => {
    await requireModule(ctx, "posts");
    const post = await ctx.db.get(args.id);
    if (!post) throw new Error("Post not found");
    await ctx.db.patch(args.id, {
      coverImagePosition: args.position,
    });
  },
});

// Public: Get related posts by category (for "Voir aussi" section)
export const getRelated = query({
  args: { 
    currentSlug: v.string(),
    category: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 3;
    
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_status_date", (q) => q.eq("status", "published"))
      .filter((q) => 
        q.and(
          q.eq(q.field("category"), args.category),
          q.neq(q.field("slug"), args.currentSlug)
        )
      )
      .order("desc")
      .take(limit);
    
    return await Promise.all(posts.map(async (post) => {
      let coverImage = post.coverImage;
      if (post.coverImageStorageId) {
        coverImage = (await ctx.storage.getUrl(post.coverImageStorageId)) ?? undefined;
      }
      return { ...post, coverImage };
    }));
  },
});

