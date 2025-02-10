import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { Resend } from "resend";

export const applicationRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        team_id: z.string().optional(),
        type: z.enum(["individual", "team"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.auth.userId,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      resend.emails.send({
        from: "applications@hacktheburgh.com",
        to: user.email,
        subject: "We received your application",
        html: `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Application Confirmation</title>
                      <style>
                          :root {
                              --accent-yellow: hsl(68, 100%, 51%);
                              --accent-lilac: hsl(282, 81%, 81%);
                              --accent-blue: hsl(221, 100%, 60%);
                              --accent-red: hsl(9, 86%, 59%);
                              --accent-orange: hsl(16, 82%, 61%);
                          }
                          body {
                              width: 100%;
                              max-width: 768px;
                              font-family: Arial, sans-serif;
                              display: flex;
                              flex-direction: column;
                              align-items: center;
                              justify-content: center;
                              gap: 2rem;
                              height: 100vh;
                              margin: 0;
                              background: #000;
                              background: url("https://hacktheburgh.com/screenshot.png") no-repeat fixed center;
                          }
                          .container {
                              background-color: var(--accent-yellow);
                              padding: 2rem;
                              border-radius: 1rem;
                              text-align: center;
                              max-width: 400px;
                              margin: 0 auto;
                          }
                          h1 {
                              color: hsl(var(--accent-blue));
                              margin-bottom: 1rem;
                          }
                          p {
                              color: #333;
                              line-height: 1.6;
                          }
                          .highlight {
                              color: hsl(var(--accent-red));
                              font-weight: bold;
                          }

                          #header-image-container {
                              width: 100%;
                              display: flex;
                              justify-content: center;
                          }

                          #header-image {
                              width: 100%;
                              max-width: 400px;   
                              margin: 0 auto;
                          }
                          
                          footer {
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              flex-direction: column;
                              color: white;
                              font-size: 0.8rem;
                          }
                          
                          footer p {
                              color: white;
                          }
                          
                          footer a {
                              color: white;
                              text-decoration: underline;
                          }
                          
                      </style>
                  </head>

                  <body style="padding:3rem;background-color:hsl(234,59%,7%);">
                      <div id="header-image-container" style="justify-content:center">
                          <a href="https://hacktheburgh.com/" target="_blank" style="margin: 0 auto;">
                          <img src="https://hacktheburgh.com/HTB-logo.png" id="header-image" />
                          </a>
                      </div>
                      <div class="container" style="background-color: hsl(68, 100%, 51%);">
                          <h1>Application Received!</h1>
                          <p>We've received your application to <span class="highlight">Hack The Burgh 2025</span>.</p>
                          <p>You can keep updating your profile until the deadline.</p>
                          <p>Thank you for your interest in our event, best of luck!</p>
                      </div>
                      <footer style="text-align:center;">
                          <p style="color:white; text-align:center;">
                              Please don't reply to this email, to contact us, email 
                              <a href="mailto:hello@hacktheburgh.com">hello@hacktheburgh.com</a>
                          </p>
                          <a style="color:white;" href="https://www.hacktheburgh.com/documents/HTB-Privacy-Policy.pdf" target="_blank">
                              Privacy Policy
                          </a>
                      </footer>
                  </body>

                  </html>
          `,
      });
      try {
        return ctx.db.application.create({
          data: {
            user_id: ctx.auth.userId,
            team_id: input.team_id,
          },
        });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create application");
      }
    }),
  getUserApplication: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.auth.userId) {
      return null;
    }

    return ctx.db.application.findFirst({
      where: {
        user_id: ctx.auth.userId,
      },
      include: {
        team: {
          include: {
            members: {
              select: {
                first_name: true,
                last_name: true,
              }
            },
          },
        },
      },
    });
  }),
  getApplications: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.auth.sessionClaims.metadata.role !== "admin") {
      throw new Error("Unauthorized");
    }

    return ctx.db.application.findMany({
      include: {
        user: true,
        team: true,
      },
    });
  }),
});
