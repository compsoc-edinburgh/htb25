import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    console.log("in trpc", ctx.auth.userId); 
    return ctx.db.user.findUnique({
      where: { id: ctx.auth.userId },
      include: {
        team: {
          include: {
            members: true,
          },
        },
      },
    });
  }),
  checkExisting: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input },
      });

      return !!user;
    }),
  create: publicProcedure
    .input(
      z.object({
        clerkId: z.string().min(1),
        email: z.string().min(1).email(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          id: input.clerkId,
          email: input.email,
          first_name: input.firstName,
          last_name: input.lastName,
        },
        include: {
          team: {
            include: {
              members: true,
            },
          },
        },
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        pronouns: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        universityEmail: z.string().email().optional(),
        cv: z.string().optional(),
        country: z.string().optional(),
        university: z.string().optional(),
        universityYear: z.string().optional(),
        placementsCount: z.string().optional(),
        hackathonsCount: z.string().optional(),
        projectDescription: z.string().optional(),
        needsReimbursement: z.boolean().optional(),
        travellingFrom: z.string().optional(),
        dietaryRestrictions: z.string().optional(),
        portfolioUrl: z.string().optional(),
        calendarEmail: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const client = await clerkClient();

      // Beware of the naming, only the database fields are snake_case
      if (input.firstName || input.lastName) {
        await client.users.updateUser(ctx.auth.userId, {
          firstName: input.firstName,
          lastName: input.lastName,
        });
      }

      console.log(input.pronouns);

      const metadata = {
        pronouns: input.pronouns,
        country: input.country,
        university_name: input.university,
        university_year: input.universityYear,
        university_email: input.universityEmail,
        cv_url: input.cv,
        portfolio_url: input.portfolioUrl,
        placements_count: input.placementsCount,
        hackathons_count: input.hackathonsCount,
        project_description: input.projectDescription,
        needs_reimbursement: input.needsReimbursement,
        travelling_from: input.travellingFrom,
        dietary_restrictions: input.dietaryRestrictions,
        calendar_email: input.calendarEmail,
      };

      // Save other information in clerk metadata
      await client.users.updateUserMetadata(ctx.auth.userId, {
        publicMetadata: metadata,
      });

      return ctx.db.user.update({
        where: { id: ctx.auth.userId },
        data: {
          first_name: input.firstName,
          last_name: input.lastName,
          ...metadata,
        },
      });
    }),
  completeChallenge: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.challengeCompletion.create({
      data: {
        userId: ctx.auth.userId,
      },
    });
  }),
  getChallengeCompletion: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.challengeCompletion.findUnique({
      where: {
        userId: ctx.auth.userId,
      },
    });
  }),
});
