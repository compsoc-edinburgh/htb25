import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  getUserTeam: protectedProcedure.query(async ({ ctx }) => {
    var user = await ctx.db.user.findUnique({
      where: {
        id: ctx.auth.userId,
      },
    });

    if (!user?.team_id) {
      return null;
    }

    return ctx.db.team.findFirst({
      where: {
        id: user.team_id,
      },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        teamName: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const team = await ctx.db.team.create({
          data: {
            name: input.teamName,
            code: Math.random().toString(36).substring(2, 7).toUpperCase(),
            created_by: ctx.auth.userId,
          },
        });

        const client = await clerkClient();

        await client.users.updateUserMetadata(ctx.auth.userId, {
          publicMetadata: {
            team_id: team.id,
          },
        });

        await ctx.db.user.update({
          where: {
            id: ctx.auth.userId,
          },
          data: {
            team_id: team.id,
          },
        });

        return await ctx.db.team.findFirst({
          where: {
            id: team.id,
          },

          include: {
            members: {
              select: {
                first_name: true,
                last_name: true,
              }
            },
          },
        });
      } catch (err) {
        console.error(err);
        throw new Error("ERROR");
      }
    }),
  join: protectedProcedure
    .input(
      z.object({
        team_code: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          code: input.team_code,
        },
      });

      if (!team) {
        throw new Error("NOTFOUND");
      }

      const client = await clerkClient();

      await client.users.updateUserMetadata(ctx.auth.userId, {
        publicMetadata: {
          team_id: team.id,
        },
      });

      await ctx.db.user.update({
        where: {
          id: ctx.auth.userId,
        },
        data: {
          team_id: team?.id,
        },
      });

      return await ctx.db.team.findFirst({
        where: {
          id: team.id,
        },

        include: {
          members: {
            select: {
              first_name: true,
              last_name: true,
            }
          },
        },
      });;
    }),
  leave: protectedProcedure
    .input(
      z.object({
        team_id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          id: input.team_id,
        },
      });

      if (!team) {
        throw new Error("NOTFOUND");
      }

      const client = await clerkClient();

      await client.users.updateUserMetadata(ctx.auth.userId, {
        publicMetadata: {
          team_id: null,
        },
      });

      await ctx.db.user.update({
        where: {
          id: ctx.auth.userId,
        },
        data: {
          team_id: null,
        },
      });

      return team;
    }),
  rename: protectedProcedure
    .input(
      z.object({
        team_id: z.string().min(1),
        name: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.db.team.findFirst({
        where: {
          id: input.team_id,
        },
      });

      if (!team) {
        throw new Error("NOTFOUND");
      }

      await ctx.db.team.update({
        where: {
          id: input.team_id,
        },
        data: {
          name: input.name,
        },
      });

      return team;
    }),
});
